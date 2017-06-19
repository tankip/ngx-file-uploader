import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var noop = function () {
};
var FileUploderComponent = (function () {
    function FileUploderComponent() {
        this.fileChanged = new EventEmitter();
        this.uploading = false;
        // The internal data model
        this.innerValue = '';
        // Placeholders for the callbacks which are later providesd
        // by the Control Value Accessor
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    Object.defineProperty(FileUploderComponent.prototype, "value", {
        // get accessor
        get: function () {
            return this.innerValue;
        },
        // set accessor including call the onchange callback
        set: function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    // Current time string.
    FileUploderComponent.prototype.writeValue = function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    };
    // From ControlValueAccessor interface
    FileUploderComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    FileUploderComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    FileUploderComponent.prototype.onBlur = function () {
        this.onTouchedCallback();
    };
    FileUploderComponent.prototype.onChange = function (event) {
        var _this = this;
        var files = event.srcElement.files;
        this.uploading = true;
        var fileToLoad = files[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            var data = fileReader.result;
            var fileType = data.substring('data:image/'.length, data.indexOf(';base64'));
            var payload = {
                data: data,
                extension: fileType
            };
            _this.fileChanged.emit(payload);
        };
        fileReader.readAsDataURL(fileToLoad);
    };
    FileUploderComponent.prototype.clear = function () {
        this.value = null;
    };
    return FileUploderComponent;
}());
export { FileUploderComponent };
FileUploderComponent.decorators = [
    { type: Component, args: [{
                selector: 'file-uploader',
                styles: ["\n    @import url(\"https://fonts.googleapis.com/css?family=Roboto:100\");.tick-tock-time{font-size:2em;font-family:'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif}.btn-file{position:relative;overflow:hidden}.btn-file input[type=file]{position:absolute;top:0;right:0;min-width:100%;min-height:100%;font-size:100px;text-align:right;filter:alpha(opacity=0);opacity:0;outline:none;background:white;cursor:inherit;display:block}#img-upload{width:100%}.image-preview-input{position:relative;overflow:hidden;margin:0px;color:#333;background-color:#fff;border-color:#ccc}.image-preview-input input[type=file]{position:absolute;top:0;right:0;margin:0;padding:0;font-size:20px;cursor:pointer;opacity:0;filter:alpha(opacity=0)}.image-preview-input-title{margin-left:2px}img{display:block;margin:0 auto;margin-top:10px}\n  "],
                template: "\n    <div class=\"col-md-12\">\n      <div class=\"form-group\">\n        <div class=\"input-group\">\n          <input type=\"text\" class=\"form-control\" readonly [(ngModel)]=\"value\">\n          <span class=\"input-group-btn\">\n            <button *ngIf=\"value\" type=\"button\" (click)=\"clear()\" class=\"btn btn-default image-preview-clear\">\n                            <span class=\"glyphicon glyphicon-remove\"></span> Clear\n          </button>\n          <div class=\"btn btn-default image-preview-input\">\n            <span class=\"glyphicon glyphicon-folder-open\"></span>\n            <span class=\"image-preview-input-title\">Browse</span>\n            <input type=\"file\" accept=\"image/png, image/jpeg, image/gif\" (blur)=\"onBlur()\" name=\"input-file-preview\" (change)=\"onChange($event)\"\n            />\n            <!-- rename it -->\n          </div>\n          </span>\n        </div>\n      </div>\n    </div>\n  ",
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return FileUploderComponent; }), multi: true
                    }
                ]
            },] },
];
/** @nocollapse */
FileUploderComponent.ctorParameters = function () { return []; };
FileUploderComponent.propDecorators = {
    'source': [{ type: Input },],
    'fileChanged': [{ type: Output },],
};
//# sourceMappingURL=file-uploader.component.js.map