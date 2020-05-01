import * as str from "string-to-stream";
import * as JSONStream from "JSONStream";
import {ObjectTransformStream} from "./";

const o = [
    {"id":0,"name":"object 0","value":2}
    ,{"id":1,"name":"object 1","value":7}
    ,{"id":2,"name":"object 2","value":4}
    ,{"id":3,"name":"object 3","value":5}
    ,{"id":4,"name":"object 4","value":6}
];

const ts = new ObjectTransformStream<any, any>(async (data: any) => {
    const ret = Object.assign({}, data);
    ret["age"] = 5;
    return ret;
}, async (data: any, index: number) => (index !== 4));

ts.on("data", (data: any) => {
    console.log("<DATA>: " + JSON.stringify(data));
}).on("finish", () => {
    console.log("<<FINISH>>");
}).on("end", () => {
    console.log("<<END>>");
    console.log("Transformed=" + ts.Transformed);
})

str(JSON.stringify(o)).pipe(JSONStream.parse("*")).pipe(ts);