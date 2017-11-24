/// <reference types="node" />
import { Transform } from "stream";
export declare type Transformer<I, O> = (input: I, index?: number) => Promise<O>;
export declare type Filter<I> = (input: I, index?: number) => Promise<boolean>;
export declare class ObjectTransformStream<I, O> extends Transform {
    private transformer;
    private _index;
    private _count;
    private _filter;
    constructor(transformer: Transformer<I, O>, filter?: Filter<I>);
    _transform(chunk: any, encoding: string, callback: Function): void;
    readonly Transformed: number;
}
