import * as str from "string-to-stream";
import * as JSONStream from "JSONStream";
import {ObjectTransformStream} from "./";
import * as _ from "lodash";

let o = [
    {"id":0,"name":"object 0","value":2}
    ,{"id":1,"name":"object 1","value":0}
    ,{"id":2,"name":"object 2","value":4}
    ,{"id":3,"name":"object 3","value":0}
    ,{"id":4,"name":"object 4","value":2}
];

let ts = new ObjectTransformStream<any, any>((data: any) => {
    let ret = _.assignIn({}, data);
    ret["age"] = 5;
    return Promise.resolve(ret);
});

ts.on("data", (data: any) => {
    console.log("<DATA>: " + JSON.stringify(data));
}).on("finish", () => {
    console.log("<<FINISH>>");
}).on("end", () => {
    console.log("<<END>>");
})

str(JSON.stringify(o)).pipe(JSONStream.parse("*")).pipe(ts);