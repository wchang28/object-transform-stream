import {Transform} from "stream";

export type Transformer<I, O> = (input: I, index?: number) => Promise<O>;
export type Filter<I> = (input: I, index?: number) => Promise<boolean>;

export class ObjectTransformStream<I, O> extends Transform {
    private _index: number;
    private _count: number;
    private _filter: Filter<I>;
    constructor(private transformer : Transformer<I, O>, filter?: Filter<I>) {
        super({objectMode: true});
        this._index = 0;
        this._count = 0;
        this._filter = (filter ? filter : (input: I, index: number) => Promise.resolve(true));
    }
    _transform(chunk: any, encoding: string, callback: Function) {
        let i = this._index;
        this._index++;
        let push: boolean = true;
        this._filter(chunk, i)
        .then((value: boolean) => {
            push = value;
            return push ? this.transformer(chunk, i) : Promise.resolve<O>(null);
        }).then((output: O) => {
            if (push) {
                this._count++;
                this.push(output);
            }
            callback();
        }).catch((err: any) => {
            this.emit("error", err);
        });
    }
    get Transformed() : number {return this._count;}
}