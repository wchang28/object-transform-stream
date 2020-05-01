"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
    function ObjectTransformStream(transformer, filter) {
        var _this = _super.call(this, { objectMode: true }) || this;
        _this.transformer = transformer;
        _this._index = 0;
        _this._count = 0;
        _this._filter = (filter ? filter : function (input, index) { return Promise.resolve(true); });
        return _this;
    }
    ObjectTransformStream.prototype._transform = function (chunk, encoding, callback) {
        var _this = this;
        var i = this._index;
        this._index++;
        var push = true;
        this._filter(chunk, i)
            .then(function (value) {
            push = value;
            return push ? _this.transformer(chunk, i) : Promise.resolve(null);
        }).then(function (output) {
            if (push) {
                _this._count++;
                _this.push(output);
            }
            callback();
        }).catch(function (err) {
            _this.emit("error", err);
        });
    };
    Object.defineProperty(ObjectTransformStream.prototype, "Transformed", {
        get: function () { return this._count; },
        enumerable: true,
        configurable: true
    });
    return ObjectTransformStream;
}(stream_1.Transform));
exports.ObjectTransformStream = ObjectTransformStream;
//# sourceMappingURL=index.js.map