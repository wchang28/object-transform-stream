import {Transform} from "stream";

export type Transformer<I, O> = (input: I) => Promise<O>;

export class ObjectTransformStream<I, O> extends Transform {
    constructor(private transformer: Transformer<I, O>) {
        super({objectMode: true});
    }
    _transform(chunk: any, encoding: string, callback: Function) {
        this.transformer(chunk)
        .then((value: O) => {
            this.push(value);
            callback();
        }).catch((err: any) => {
            this.emit("error", err);
        })
    }
}