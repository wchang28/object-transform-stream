/// <reference types="node" />
import { Transform } from "stream";
export declare type Transformer<I, O> = (input: I) => Promise<O>;
export declare class ObjectTransformStream<I, O> extends Transform {
    private transformer;
    constructor(transformer: Transformer<I, O>);
    _transform(chunk: any, encoding: string, callback: Function): void;
}
