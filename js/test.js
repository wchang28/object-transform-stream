"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var str = require("string-to-stream");
var JSONStream = require("JSONStream");
var _1 = require("./");
var _ = require("lodash");
var o = [
    { "id": 0, "name": "object 0", "value": 2 },
    { "id": 1, "name": "object 1", "value": 0 },
    { "id": 2, "name": "object 2", "value": 4 },
    { "id": 3, "name": "object 3", "value": 0 },
    { "id": 4, "name": "object 4", "value": 2 }
];
var ts = new _1.ObjectTransformStream(function (data) {
    var ret = _.assignIn({}, data);
    ret["age"] = 5;
    return Promise.resolve(ret);
});
ts.on("data", function (data) {
    console.log("<DATA>: " + JSON.stringify(data));
}).on("finish", function () {
    console.log("<<FINISH>>");
}).on("end", function () {
    console.log("<<END>>");
});
str(JSON.stringify(o)).pipe(JSONStream.parse("*")).pipe(ts);
//# sourceMappingURL=test.js.map