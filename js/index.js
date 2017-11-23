"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = require("stream");
var ObjectTransformStream = /** @class */ (function (_super) {
    __extends(ObjectTransformStream, _super);
    function ObjectTransformStream(transformer) {
        var _this = _super.call(this, { objectMode: true }) || this;
        _this.transformer = transformer;
        return _this;
    }
    ObjectTransformStream.prototype._transform = function (chunk, encoding, callback) {
        var _this = this;
        this.transformer(chunk)
            .then(function (value) {
            _this.push(value);
            callback();
        }).catch(function (err) {
            _this.emit("error", err);
        });
    };
    return ObjectTransformStream;
}(stream_1.Transform));
exports.ObjectTransformStream = ObjectTransformStream;
//# sourceMappingURL=index.js.map