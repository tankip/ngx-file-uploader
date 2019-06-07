/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, forwardRef, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// import * as pdfMake from 'pdfmake/build/pdfmake';
import jsPDF from 'jspdf';
/** @type {?} */
var noop = function () {
    // placeholder call backs
};
var ɵ0 = noop;
var NgxFileUploaderComponent = /** @class */ (function () {
    function NgxFileUploaderComponent() {
        this.urls = new Array();
        this.selectFileType = true;
        this.fileList = new Array();
        this.pdfAvailable = false;
        this.mobile = false;
        this.UploadCaptions = false;
        this.multiple = true;
        this.fileUpload = false;
        this.backButton = false;
        this.fileChanged = new EventEmitter();
        this.liveCamera = new EventEmitter();
        this.uploadData = new EventEmitter();
        this._onClear = new EventEmitter();
        this.uploading = false;
        // The internal data model
        this.innerValue = '';
        // Placeholders for the callbacks which are later providesd
        // by the Control Value Accessor
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    /**
     * @return {?}
     */
    NgxFileUploaderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.singleFile) {
            this.multiple = false;
        }
        if (window.screen.width <= 692) {
            this.mobile = true;
        }
    };
    Object.defineProperty(NgxFileUploaderComponent.prototype, "value", {
        // get accessor
        get: 
        // get accessor
        /**
         * @return {?}
         */
        function () {
            return this.innerValue;
        },
        // set accessor including call the onchange callback
        set: 
        // set accessor including call the onchange callback
        /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    // Current time string.
    // Current time string.
    /**
     * @param {?} value
     * @return {?}
     */
    NgxFileUploaderComponent.prototype.writeValue = 
    // Current time string.
    /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    };
    // From ControlValueAccessor interface
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    NgxFileUploaderComponent.prototype.registerOnChange = 
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    NgxFileUploaderComponent.prototype.registerOnTouched = 
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @return {?}
     */
    NgxFileUploaderComponent.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this.onTouchedCallback();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxFileUploaderComponent.prototype.onChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var files = event.srcElement.files;
        this.uploading = true;
        // const fileToLoad = files;
        if (files) {
            var _loop_1 = function (file) {
                /** @type {?} */
                var fileReader = new FileReader();
                fileReader.onload = function (fileLoadedEvent) {
                    /** @type {?} */
                    var data = fileReader.result;
                    /** @type {?} */
                    var name = file.name;
                    /** @type {?} */
                    var fileSize = Math.round(file.size / 1024);
                    /** @type {?} */
                    var payload = {
                        data: data,
                        id: _this.urls.length + 1,
                        name: name,
                        size: fileSize
                    };
                    if (!_this.singleFile) {
                        _this.urls.push(payload);
                        _this.fileList.push(payload);
                    }
                    else {
                        _this.fileChanged.emit(payload);
                        _this.back();
                    }
                };
                fileReader.readAsDataURL(file);
            };
            try {
                for (var files_1 = tslib_1.__values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                    var file = files_1_1.value;
                    _loop_1(file);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        var e_1, _a;
    };
    /**
     * @return {?}
     */
    NgxFileUploaderComponent.prototype.clear = /**
     * @return {?}
     */
    function () {
        this.value = '';
        this.onChangeCallback(this.value);
        this.urls = [];
        this.back();
        this._onClear.emit();
    };
    /**
     * @return {?}
     */
    NgxFileUploaderComponent.prototype.back = /**
     * @return {?}
     */
    function () {
        this.selectFileType = true;
        this.urls = [];
        this.backButton = false;
        this.fileList = [];
        this.UploadCaptions = false;
        this.fileUpload = false;
        this.liveCamera.emit();
    };
    /**
     * @param {?} filetype
     * @return {?}
     */
    NgxFileUploaderComponent.prototype.toggleVisibility = /**
     * @param {?} filetype
     * @return {?}
     */
    function (filetype) {
        if (filetype === 'image') {
            this.fileType = 'image/png, image/jpeg, image/gif';
            this.fileUpload = true;
        }
        else if (filetype === 'pdf') {
            this.fileType = 'application/pdf';
            this.pdfAvailable = true;
            this.fileUpload = true;
        }
        else if (filetype === 'both') {
            this.fileType = 'image/png, image/jpeg, image/gif , application/pdf';
            this.pdfAvailable = true;
            this.fileUpload = true;
        }
        else if (filetype === 'liveCamera') {
            this.liveCamera.emit();
        }
        this.selectFileType = false;
        this.backButton = true;
    };
    /**
     * @return {?}
     */
    NgxFileUploaderComponent.prototype.upload = /**
     * @return {?}
     */
    function () {
        this.uploadData.emit(this.fileList);
        this.back();
    };
    /**
     * @return {?}
     */
    NgxFileUploaderComponent.prototype.MergeImages = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var doc = new jsPDF();
        doc.page = 1;
        for (var i = 0; i < this.fileList.length; i++) {
            /** @type {?} */
            var imageData = this.fileList[i].data || this.fileList[i].imageAsDataUrl;
            doc.addImage(imageData, 'JPG', 10, 10, 190, 270);
            doc.setFont('courier');
            doc.setFontType('normal');
            doc.text(180, 290, 'page ' + doc.page);
            doc.page++;
            if (i < this.fileList.length) {
                doc.addPage();
            }
        }
        doc.deletePage(this.fileList.length + 1);
        this.fileList = [];
        this.urls = [];
        /** @type {?} */
        var data = doc.output('datauristring');
        /** @type {?} */
        var payload = {
            data: data,
        };
        this.fileList.push(payload);
        this.urls.push(payload);
        doc.output('dataurlnewwindow');
        // doc.save('Test.pdf');
    };
    /**
     * @param {?} urls
     * @return {?}
     */
    NgxFileUploaderComponent.prototype.delete = /**
     * @param {?} urls
     * @return {?}
     */
    function (urls) {
        for (var i = 0; i <= this.urls.length; i++) {
            if (urls.data) {
                if (this.urls[i].data === urls.data) {
                    this.urls.splice(i, 1);
                    this.fileList.splice(i, 1);
                    break;
                }
            }
            else if (urls.imageAsDataUrl) {
                if (this.urls[i].imageAsDataUrl === urls.imageAsDataUrl) {
                    this.urls.splice(i);
                    this.fileList.splice(i, 1);
                    break;
                }
            }
        }
    };
    NgxFileUploaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'file-uploader',
                    template: "<div *ngIf=\"backButton\">\n  <button class=\"btn btn-default image-preview-clear\" type=\"button\" (click)=\"back()\">\n    <span class=\"glyphicon glyphicon-circle-arrow-left\"></span> Back\n  </button>\n</div>\n<div *ngIf=\"selectFileType\" class=\"panel panel-primary\">\n  <div class=\"panel-heading\">UPLOAD FILE TYPE</div>\n  <div class=\"panel-body\">\n    <div class=\"row-cb\">\n      <span><input name=\"image\" id=\"ima\" (change)=\"toggleVisibility('image')\" type=\"checkbox\" /></span>\n      <label for=\"ima\">Image</label>\n\n      <div class=\"clear-both\"></div>\n    </div>\n    <div class=\"row-cb\">\n      <span><input name=\"option\" id=\"pdf\" (change)=\"toggleVisibility('pdf')\" type=\"checkbox\" /></span>\n      <label for=\"pdf\">PDF</label>\n\n      <div class=\"clear-both\"></div>\n    </div>\n    <div *ngIf=\"!singleFile\" class=\"row-cb\">\n      <span><input name=\"option\" id=\"both\" (change)=\"toggleVisibility('both')\" type=\"checkbox\" /></span>\n      <label for=\"both\">Image & PDF</label>\n\n      <div class=\"clear-both\"></div>\n    </div>\n    <div class=\"row-cb\">\n      <span><input name=\"camera\" id=\"camera\" (change)=\"toggleVisibility('liveCamera')\" type=\"checkbox\" /></span>\n      <label for=\"camera\">Live Camera</label>\n\n      <div class=\"clear-both\"></div>\n    </div>\n  </div>\n</div>\n<div style=\"display: block;\">\n  <div style=\"display: inline-block;\" *ngFor=\"let url of urls;let i=index\">\n    <a class=\"columne\" id=\"caption\">\n      <img style=\" border: 1px solid rgb(97, 97, 97); margin: 2px; border-radius: 4px;padding: 5px;\" id=\"img{{i}}\"\n        [src]=\"url.data || url.imageAsDataUrl\"\n        onError=\"this.onerror=null;this.src='59e6d5338faf193392f1bf9f89f4513dc548bd68.png | secure';\"\n        class=\"rounded mb-3\" width=\"90\" height=\"200\">\n      <div class=\"text\">\n        <h2 title=\"Click to Delete File {{url.name}}\" (click)=\"delete(url)\"\n          style=\"color: rgb(255, 255, 255); font-family: fantasy;\"><span class=\"glyphicon glyphicon-trash\"></span>REMOVE\n        </h2>\n      </div>\n    </a>\n  </div>\n  <button *ngIf=\"UploadCaptions\" type=\"button\" (click)=\"upload()\" class=\"button\">\n    <span class=\"glyphicon glyphicon-upload\"></span> Upload Files\n  </button>\n  <button *ngIf=\"!pdfAvailable && fileUpload || liveCamera\" type=\"button\" [disabled]=\"!urls[1]\" (click)=\"MergeImages()\"\n    title=\"merge the images as pages in one pdf document\" class=\"btn btn-default image-preview-clear\">\n    <span class=\"glyphicon glyphicon-upload\"></span> Merge\n  </button>\n</div>\n<div *ngIf=\"fileUpload\">\n\n  <div class=\"input-group\">\n    <input type=\"text\" class=\"form-control\" readonly [(ngModel)]=\"value\">\n    <div class=\"input-group-btn\">\n\n      <div class=\"btn btn-default image-preview-input\">\n        <span class=\"glyphicon glyphicon-folder-open\"></span>\n        <span class=\"image-preview-input-title\">SELECT FILE</span>\n        <input *ngIf=\"multiple\" type=\"file\" multiple accept=\"{{fileType}}\" (blur)=\"onBlur()\" name=\"input-file-preview\"\n          (change)=\"onChange($event)\" />\n        <input *ngIf=\"!multiple\" type=\"file\" accept=\"{{fileType}}\" (blur)=\"onBlur()\" name=\"input-file-preview\"\n          (change)=\"onChange($event)\" />\n        <!-- rename it -->\n      </div>\n      <button *ngIf=\"value\" type=\"button\" (click)=\"clear()\" class=\"btn btn-default image-preview-clear\">\n        <span class=\"glyphicon glyphicon-remove\"></span> Clear\n      </button>\n      <button *ngIf=\"multiple\" type=\"button\" (click)=\"upload()\" class=\"button\">\n        <span class=\"glyphicon glyphicon-upload\"></span> Upload\n      </button>\n    </div>\n  </div>\n  <div *ngIf=\"!mobile\" class=\"image-upload-wrap\">\n    <input *ngIf=\"multiple\" class=\"file-upload-input\" type='file' (change)=\"onChange($event)\" multiple\n      accept=\"{{fileType}}\" />\n    <input *ngIf=\"!multiple\" class=\"file-upload-input\" type='file' (change)=\"onChange($event)\" accept=\"{{fileType}}\" />\n    <div class=\"drag-text\">\n      <h3>Drag and Drop file(s)</h3>\n    </div>\n  </div>\n</div>",
                    encapsulation: ViewEncapsulation.Native,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: forwardRef(function () { return NgxFileUploaderComponent; }), multi: true
                        }
                    ],
                    styles: [".btn-file{position:relative;overflow:hidden}.btn-file input[type=file]{position:absolute;top:0;right:0;min-width:100%;min-height:100%;font-size:100px;text-align:right;opacity:0;outline:0;background:#fff;cursor:inherit;display:block}#img-upload{width:100%}.image-preview-input input[type=file]{position:absolute;top:0;right:0;margin:0;padding:0;font-size:20px;cursor:pointer;opacity:0}.file-upload{background-color:#fff;width:600px;margin:0 auto;padding:20px}.file-upload-btn{width:100%;margin:0;color:#fff;background:#1fb264;border:none;padding:10px;border-radius:4px;border-bottom:4px solid #15824b;transition:.2s;outline:0;text-transform:uppercase;font-weight:700}ul{list-style-type:none;margin:0;padding:0}.file-upload-btn:hover{background:#1aa059;color:#fff;transition:.2s;cursor:pointer}.file-upload-btn:active{border:0;transition:.2s}.file-upload-content{display:none;text-align:center}.file-upload-input{position:absolute;margin:0;padding:0;width:100%;height:100%;outline:0;opacity:0;cursor:pointer}.image-upload-wrap{margin-top:20px;border:4px dashed #3683c7;position:relative}.image-dropping,.image-upload-wrap:hover{background-color:#337ab7;border:4px dashed #fff}.image-title-wrap{padding:0 15px 15px;color:#222}.drag-text{text-align:center}.drag-text h3{font-weight:100;text-transform:uppercase;color:#155a82;padding:60px 0}.file-upload-image{max-height:200px;max-width:200px;margin:auto;padding:20px}.button{display:inline-block;padding:6px 12px;margin-bottom:0;font-size:14px;font-weight:400;line-height:1.42857143;text-align:center;white-space:nowrap;vertical-align:middle;touch-action:manipulation;cursor:pointer;background-color:#004a7f;border:none;color:#fff;text-decoration:none;-webkit-animation:1.5s infinite glowing;animation:1.5s infinite glowing}@-webkit-keyframes glowing{0%{background-color:#002fb2;-webkit-box-shadow:0 0 3px #005cb2}50%{background-color:#203864;-webkit-box-shadow:0 0 40px #203864}100%{background-color:#005cb2;-webkit-box-shadow:0 0 3px #005cb2}}@keyframes glowing{0%,100%{background-color:#005cb2;box-shadow:0 0 3px #005cb2}50%{background-color:#203864;box-shadow:0 0 40px #203864}}.actionBtn{margin-top:5px;margin-bottom:2px;font-size:1.2em}label{display:inline-block;max-width:100%;margin-bottom:5px;font-weight:700;margin-right:10px}.row-cb{margin:auto;font-size:15px}.row-cb label{float:left}.row-cb span{float:left;text-align:left}.snapshot{text-align:center}.snapshot img{max-width:800px;max-height:800px}.columne#caption .text h1{margin:0;color:#fff}.columne#caption:hover .text{opacity:1;cursor:pointer;opacity:1}.columne#caption{position:relative}.columne#caption .text{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);z-index:10;opacity:0;transition:.8s}.columne#caption:hover img{-webkit-filter:sepia(90%)}@media (max-width:629px){.file-upload-input{display:none!important}}"]
                }] }
    ];
    NgxFileUploaderComponent.propDecorators = {
        singleFile: [{ type: Input }],
        source: [{ type: Input }],
        fileChanged: [{ type: Output }],
        liveCamera: [{ type: Output }],
        uploadData: [{ type: Output }],
        _onClear: [{ type: Output }]
    };
    return NgxFileUploaderComponent;
}());
export { NgxFileUploaderComponent };
if (false) {
    /** @type {?} */
    NgxFileUploaderComponent.prototype.urls;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.selectFileType;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.fileList;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.fileType;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.pdfAvailable;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.mobile;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.UploadCaptions;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.singleFile;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.multiple;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.fileUpload;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.backButton;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.source;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.fileChanged;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.liveCamera;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.uploadData;
    /** @type {?} */
    NgxFileUploaderComponent.prototype._onClear;
    /** @type {?} */
    NgxFileUploaderComponent.prototype._imagePath;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.uploading;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.innerValue;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.onTouchedCallback;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.onChangeCallback;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZpbGUtdXBsb2FkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZpbGUtdXBsb2FkZXIvIiwic291cmNlcyI6WyJsaWIvbmd4LWZpbGUtdXBsb2FkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBVSxLQUFLLEVBQUUsVUFBVSxFQUN6QixNQUFNLEVBQUUsWUFBWSxFQUFZLGlCQUFpQixFQUM3RCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBRXpFLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQzs7SUFHcEIsSUFBSSxHQUFHO0lBQ1gseUJBQXlCO0FBQzNCLENBQUM7O0FBRUQ7SUFBQTtRQXFHUyxTQUFJLEdBQUcsSUFBSSxLQUFLLEVBQU8sQ0FBQztRQUN4QixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixhQUFRLEdBQUcsSUFBSSxLQUFLLEVBQU8sQ0FBQztRQUU1QixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFFdkIsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFFVCxnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ25ELGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNwRCxlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbkQsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTNELGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDekIsMEJBQTBCO1FBQ2xCLGVBQVUsR0FBUSxFQUFFLENBQUM7UUFFN0IsMkRBQTJEO1FBQzNELGdDQUFnQztRQUN4QixzQkFBaUIs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LEVBQUUsaUJBQWlCOzs0QkFFMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsd0JBQXdCLEVBQXhCLENBQXdCLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSTt5QkFDckU7cUJBQ0Y7NkJBaEdRLHkwRkFBeTBGO2lCQWlHbjFGOzs7NkJBU0UsS0FBSzt5QkFJTCxLQUFLOzhCQUNMLE1BQU07NkJBQ04sTUFBTTs2QkFDTixNQUFNOzJCQUNOLE1BQU07O0lBZ0xULCtCQUFDO0NBQUEsQUFwU0QsSUFvU0M7U0FoTVksd0JBQXdCOzs7SUFDbkMsd0NBQStCOztJQUMvQixrREFBNkI7O0lBQzdCLDRDQUFtQzs7SUFDbkMsNENBQXdCOztJQUN4QixnREFBNEI7O0lBQzVCLDBDQUFzQjs7SUFDdEIsa0RBQThCOztJQUM5Qiw4Q0FBZ0M7O0lBQ2hDLDRDQUF1Qjs7SUFDdkIsOENBQTBCOztJQUMxQiw4Q0FBMEI7O0lBQzFCLDBDQUE0Qjs7SUFDNUIsK0NBQXFFOztJQUNyRSw4Q0FBcUU7O0lBQ3JFLDhDQUFvRTs7SUFDcEUsNENBQWtFOztJQUNsRSw4Q0FBMEI7O0lBQzFCLDZDQUF5Qjs7SUFFekIsOENBQTZCOztJQUk3QixxREFBNkM7O0lBQzdDLG9EQUFrRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZixcbiAgT25DaGFuZ2VzLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgybVDb25zb2xlLCBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIGltcG9ydCAqIGFzIHBkZk1ha2UgZnJvbSAncGRmbWFrZS9idWlsZC9wZGZtYWtlJztcbmltcG9ydCBqc1BERiBmcm9tICdqc3BkZic7XG5cblxuY29uc3Qgbm9vcCA9ICgpID0+IHtcbiAgLy8gcGxhY2Vob2xkZXIgY2FsbCBiYWNrc1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZmlsZS11cGxvYWRlcicsXG4gIHN0eWxlczogW2AuYnRuLWZpbGV7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVufS5idG4tZmlsZSBpbnB1dFt0eXBlPWZpbGVde3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3JpZ2h0OjA7bWluLXdpZHRoOjEwMCU7bWluLWhlaWdodDoxMDAlO2ZvbnQtc2l6ZToxMDBweDt0ZXh0LWFsaWduOnJpZ2h0O29wYWNpdHk6MDtvdXRsaW5lOjA7YmFja2dyb3VuZDojZmZmO2N1cnNvcjppbmhlcml0O2Rpc3BsYXk6YmxvY2t9I2ltZy11cGxvYWR7d2lkdGg6MTAwJX0uaW1hZ2UtcHJldmlldy1pbnB1dCBpbnB1dFt0eXBlPWZpbGVde3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3JpZ2h0OjA7bWFyZ2luOjA7cGFkZGluZzowO2ZvbnQtc2l6ZToyMHB4O2N1cnNvcjpwb2ludGVyO29wYWNpdHk6MH0uZmlsZS11cGxvYWR7YmFja2dyb3VuZC1jb2xvcjojZmZmO3dpZHRoOjYwMHB4O21hcmdpbjowIGF1dG87cGFkZGluZzoyMHB4fS5maWxlLXVwbG9hZC1idG57d2lkdGg6MTAwJTttYXJnaW46MDtjb2xvcjojZmZmO2JhY2tncm91bmQ6IzFmYjI2NDtib3JkZXI6bm9uZTtwYWRkaW5nOjEwcHg7Ym9yZGVyLXJhZGl1czo0cHg7Ym9yZGVyLWJvdHRvbTo0cHggc29saWQgIzE1ODI0Yjt0cmFuc2l0aW9uOi4ycztvdXRsaW5lOjA7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2ZvbnQtd2VpZ2h0OjcwMH11bHtsaXN0LXN0eWxlLXR5cGU6bm9uZTttYXJnaW46MDtwYWRkaW5nOjB9LmZpbGUtdXBsb2FkLWJ0bjpob3ZlcntiYWNrZ3JvdW5kOiMxYWEwNTk7Y29sb3I6I2ZmZjt0cmFuc2l0aW9uOi4ycztjdXJzb3I6cG9pbnRlcn0uZmlsZS11cGxvYWQtYnRuOmFjdGl2ZXtib3JkZXI6MDt0cmFuc2l0aW9uOi4yc30uZmlsZS11cGxvYWQtY29udGVudHtkaXNwbGF5Om5vbmU7dGV4dC1hbGlnbjpjZW50ZXJ9LmZpbGUtdXBsb2FkLWlucHV0e3Bvc2l0aW9uOmFic29sdXRlO21hcmdpbjowO3BhZGRpbmc6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO291dGxpbmU6MDtvcGFjaXR5OjA7Y3Vyc29yOnBvaW50ZXJ9LmltYWdlLXVwbG9hZC13cmFwe21hcmdpbi10b3A6MjBweDtib3JkZXI6NHB4IGRhc2hlZCAjMzY4M2M3O3Bvc2l0aW9uOnJlbGF0aXZlfS5pbWFnZS1kcm9wcGluZywuaW1hZ2UtdXBsb2FkLXdyYXA6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojMzM3YWI3O2JvcmRlcjo0cHggZGFzaGVkICNmZmZ9LmltYWdlLXRpdGxlLXdyYXB7cGFkZGluZzowIDE1cHggMTVweDtjb2xvcjojMjIyfS5kcmFnLXRleHR7dGV4dC1hbGlnbjpjZW50ZXJ9LmRyYWctdGV4dCBoM3tmb250LXdlaWdodDoxMDA7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2NvbG9yOiMxNTVhODI7cGFkZGluZzo2MHB4IDB9LmZpbGUtdXBsb2FkLWltYWdle21heC1oZWlnaHQ6MjAwcHg7bWF4LXdpZHRoOjIwMHB4O21hcmdpbjphdXRvO3BhZGRpbmc6MjBweH0uYnV0dG9ue2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmc6NnB4IDEycHg7bWFyZ2luLWJvdHRvbTowO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjQwMDtsaW5lLWhlaWdodDoxLjQyODU3MTQzO3RleHQtYWxpZ246Y2VudGVyO3doaXRlLXNwYWNlOm5vd3JhcDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7dG91Y2gtYWN0aW9uOm1hbmlwdWxhdGlvbjtjdXJzb3I6cG9pbnRlcjtiYWNrZ3JvdW5kLWNvbG9yOiMwMDRhN2Y7Ym9yZGVyOm5vbmU7Y29sb3I6I2ZmZjt0ZXh0LWRlY29yYXRpb246bm9uZTstd2Via2l0LWFuaW1hdGlvbjoxLjVzIGluZmluaXRlIGdsb3dpbmc7YW5pbWF0aW9uOjEuNXMgaW5maW5pdGUgZ2xvd2luZ31ALXdlYmtpdC1rZXlmcmFtZXMgZ2xvd2luZ3swJXtiYWNrZ3JvdW5kLWNvbG9yOiMwMDJmYjI7LXdlYmtpdC1ib3gtc2hhZG93OjAgMCAzcHggIzAwNWNiMn01MCV7YmFja2dyb3VuZC1jb2xvcjojMjAzODY0Oy13ZWJraXQtYm94LXNoYWRvdzowIDAgNDBweCAjMjAzODY0fTEwMCV7YmFja2dyb3VuZC1jb2xvcjojMDA1Y2IyOy13ZWJraXQtYm94LXNoYWRvdzowIDAgM3B4ICMwMDVjYjJ9fUBrZXlmcmFtZXMgZ2xvd2luZ3swJSwxMDAle2JhY2tncm91bmQtY29sb3I6IzAwNWNiMjtib3gtc2hhZG93OjAgMCAzcHggIzAwNWNiMn01MCV7YmFja2dyb3VuZC1jb2xvcjojMjAzODY0O2JveC1zaGFkb3c6MCAwIDQwcHggIzIwMzg2NH19LmFjdGlvbkJ0bnttYXJnaW4tdG9wOjVweDttYXJnaW4tYm90dG9tOjJweDtmb250LXNpemU6MS4yZW19bGFiZWx7ZGlzcGxheTppbmxpbmUtYmxvY2s7bWF4LXdpZHRoOjEwMCU7bWFyZ2luLWJvdHRvbTo1cHg7Zm9udC13ZWlnaHQ6NzAwO21hcmdpbi1yaWdodDoxMHB4fS5yb3ctY2J7bWFyZ2luOmF1dG87Zm9udC1zaXplOjE1cHh9LnJvdy1jYiBsYWJlbHtmbG9hdDpsZWZ0fS5yb3ctY2Igc3BhbntmbG9hdDpsZWZ0O3RleHQtYWxpZ246bGVmdH0uc25hcHNob3R7dGV4dC1hbGlnbjpjZW50ZXJ9LnNuYXBzaG90IGltZ3ttYXgtd2lkdGg6ODAwcHg7bWF4LWhlaWdodDo4MDBweH0uY29sdW1uZSNjYXB0aW9uIC50ZXh0IGgxe21hcmdpbjowO2NvbG9yOiNmZmZ9LmNvbHVtbmUjY2FwdGlvbjpob3ZlciAudGV4dHtvcGFjaXR5OjE7Y3Vyc29yOnBvaW50ZXI7b3BhY2l0eToxfS5jb2x1bW5lI2NhcHRpb257cG9zaXRpb246cmVsYXRpdmV9LmNvbHVtbmUjY2FwdGlvbiAudGV4dHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO2xlZnQ6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTt6LWluZGV4OjEwO29wYWNpdHk6MDt0cmFuc2l0aW9uOi44c30uY29sdW1uZSNjYXB0aW9uOmhvdmVyIGltZ3std2Via2l0LWZpbHRlcjpzZXBpYSg5MCUpfUBtZWRpYSAobWF4LXdpZHRoOjYyOXB4KXsuZmlsZS11cGxvYWQtaW5wdXR7ZGlzcGxheTpub25lIWltcG9ydGFudH19YF0sXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cImJhY2tCdXR0b25cIj5cbiAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBpbWFnZS1wcmV2aWV3LWNsZWFyXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJiYWNrKClcIj5cbiAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tY2lyY2xlLWFycm93LWxlZnRcIj48L3NwYW4+IEJhY2tcbiAgPC9idXR0b24+XG48L2Rpdj5cbjxkaXYgKm5nSWY9XCJzZWxlY3RGaWxlVHlwZVwiIGNsYXNzPVwicGFuZWwgcGFuZWwtcHJpbWFyeVwiPlxuICA8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGluZ1wiPlVQTE9BRCBGSUxFIFRZUEU8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj5cbiAgICA8ZGl2IGNsYXNzPVwicm93LWNiXCI+XG4gICAgICA8c3Bhbj48aW5wdXQgbmFtZT1cImltYWdlXCIgaWQ9XCJpbWFcIiAoY2hhbmdlKT1cInRvZ2dsZVZpc2liaWxpdHkoJ2ltYWdlJylcIiB0eXBlPVwiY2hlY2tib3hcIiAvPjwvc3Bhbj5cbiAgICAgIDxsYWJlbCBmb3I9XCJpbWFcIj5JbWFnZTwvbGFiZWw+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJjbGVhci1ib3RoXCI+PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInJvdy1jYlwiPlxuICAgICAgPHNwYW4+PGlucHV0IG5hbWU9XCJvcHRpb25cIiBpZD1cInBkZlwiIChjaGFuZ2UpPVwidG9nZ2xlVmlzaWJpbGl0eSgncGRmJylcIiB0eXBlPVwiY2hlY2tib3hcIiAvPjwvc3Bhbj5cbiAgICAgIDxsYWJlbCBmb3I9XCJwZGZcIj5QREY8L2xhYmVsPlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiY2xlYXItYm90aFwiPjwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgKm5nSWY9XCIhc2luZ2xlRmlsZVwiIGNsYXNzPVwicm93LWNiXCI+XG4gICAgICA8c3Bhbj48aW5wdXQgbmFtZT1cIm9wdGlvblwiIGlkPVwiYm90aFwiIChjaGFuZ2UpPVwidG9nZ2xlVmlzaWJpbGl0eSgnYm90aCcpXCIgdHlwZT1cImNoZWNrYm94XCIgLz48L3NwYW4+XG4gICAgICA8bGFiZWwgZm9yPVwiYm90aFwiPkltYWdlICYgUERGPC9sYWJlbD5cblxuICAgICAgPGRpdiBjbGFzcz1cImNsZWFyLWJvdGhcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicm93LWNiXCI+XG4gICAgICA8c3Bhbj48aW5wdXQgbmFtZT1cImNhbWVyYVwiIGlkPVwiY2FtZXJhXCIgKGNoYW5nZSk9XCJ0b2dnbGVWaXNpYmlsaXR5KCdsaXZlQ2FtZXJhJylcIiB0eXBlPVwiY2hlY2tib3hcIiAvPjwvc3Bhbj5cbiAgICAgIDxsYWJlbCBmb3I9XCJjYW1lcmFcIj5MaXZlIENhbWVyYTwvbGFiZWw+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJjbGVhci1ib3RoXCI+PC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG48ZGl2IHN0eWxlPVwiZGlzcGxheTogYmxvY2s7XCI+XG4gIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCIgKm5nRm9yPVwibGV0IHVybCBvZiB1cmxzO2xldCBpPWluZGV4XCI+XG4gICAgPGEgY2xhc3M9XCJjb2x1bW5lXCIgaWQ9XCJjYXB0aW9uXCI+XG4gICAgICA8aW1nIHN0eWxlPVwiIGJvcmRlcjogMXB4IHNvbGlkIHJnYig5NywgOTcsIDk3KTsgbWFyZ2luOiAycHg7IGJvcmRlci1yYWRpdXM6IDRweDtwYWRkaW5nOiA1cHg7XCIgaWQ9XCJpbWd7e2l9fVwiXG4gICAgICAgIFtzcmNdPVwidXJsLmRhdGEgfHwgdXJsLmltYWdlQXNEYXRhVXJsXCJcbiAgICAgICAgb25FcnJvcj1cInRoaXMub25lcnJvcj1udWxsO3RoaXMuc3JjPSc1OWU2ZDUzMzhmYWYxOTMzOTJmMWJmOWY4OWY0NTEzZGM1NDhiZDY4LnBuZyB8IHNlY3VyZSc7XCJcbiAgICAgICAgY2xhc3M9XCJyb3VuZGVkIG1iLTNcIiB3aWR0aD1cIjkwXCIgaGVpZ2h0PVwiMjAwXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPlxuICAgICAgICA8aDIgdGl0bGU9XCJDbGljayB0byBEZWxldGUgRmlsZSB7e3VybC5uYW1lfX1cIiAoY2xpY2spPVwiZGVsZXRlKHVybClcIlxuICAgICAgICAgIHN0eWxlPVwiY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTsgZm9udC1mYW1pbHk6IGZhbnRhc3k7XCI+PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXRyYXNoXCI+PC9zcGFuPlJFTU9WRVxuICAgICAgICA8L2gyPlxuICAgICAgPC9kaXY+XG4gICAgPC9hPlxuICA8L2Rpdj5cbiAgPGJ1dHRvbiAqbmdJZj1cIlVwbG9hZENhcHRpb25zXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJ1cGxvYWQoKVwiIGNsYXNzPVwiYnV0dG9uXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXVwbG9hZFwiPjwvc3Bhbj4gVXBsb2FkIEZpbGVzXG4gIDwvYnV0dG9uPlxuICA8YnV0dG9uICpuZ0lmPVwiIXBkZkF2YWlsYWJsZSAmJiBmaWxlVXBsb2FkIHx8IGxpdmVDYW1lcmFcIiB0eXBlPVwiYnV0dG9uXCIgW2Rpc2FibGVkXT1cIiF1cmxzWzFdXCIgKGNsaWNrKT1cIk1lcmdlSW1hZ2VzKClcIlxuICAgIHRpdGxlPVwibWVyZ2UgdGhlIGltYWdlcyBhcyBwYWdlcyBpbiBvbmUgcGRmIGRvY3VtZW50XCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgaW1hZ2UtcHJldmlldy1jbGVhclwiPlxuICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi11cGxvYWRcIj48L3NwYW4+IE1lcmdlXG4gIDwvYnV0dG9uPlxuPC9kaXY+XG48ZGl2ICpuZ0lmPVwiZmlsZVVwbG9hZFwiPlxuXG4gIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcmVhZG9ubHkgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiPlxuICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1idG5cIj5cblxuICAgICAgPGRpdiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBpbWFnZS1wcmV2aWV3LWlucHV0XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1mb2xkZXItb3BlblwiPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJpbWFnZS1wcmV2aWV3LWlucHV0LXRpdGxlXCI+U0VMRUNUIEZJTEU8L3NwYW4+XG4gICAgICAgIDxpbnB1dCAqbmdJZj1cIm11bHRpcGxlXCIgdHlwZT1cImZpbGVcIiBtdWx0aXBsZSBhY2NlcHQ9XCJ7e2ZpbGVUeXBlfX1cIiAoYmx1cik9XCJvbkJsdXIoKVwiIG5hbWU9XCJpbnB1dC1maWxlLXByZXZpZXdcIlxuICAgICAgICAgIChjaGFuZ2UpPVwib25DaGFuZ2UoJGV2ZW50KVwiIC8+XG4gICAgICAgIDxpbnB1dCAqbmdJZj1cIiFtdWx0aXBsZVwiIHR5cGU9XCJmaWxlXCIgYWNjZXB0PVwie3tmaWxlVHlwZX19XCIgKGJsdXIpPVwib25CbHVyKClcIiBuYW1lPVwiaW5wdXQtZmlsZS1wcmV2aWV3XCJcbiAgICAgICAgICAoY2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIiAvPlxuICAgICAgICA8IS0tIHJlbmFtZSBpdCAtLT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGJ1dHRvbiAqbmdJZj1cInZhbHVlXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJjbGVhcigpXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgaW1hZ2UtcHJldmlldy1jbGVhclwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcmVtb3ZlXCI+PC9zcGFuPiBDbGVhclxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uICpuZ0lmPVwibXVsdGlwbGVcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInVwbG9hZCgpXCIgY2xhc3M9XCJidXR0b25cIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXVwbG9hZFwiPjwvc3Bhbj4gVXBsb2FkXG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgKm5nSWY9XCIhbW9iaWxlXCIgY2xhc3M9XCJpbWFnZS11cGxvYWQtd3JhcFwiPlxuICAgIDxpbnB1dCAqbmdJZj1cIm11bHRpcGxlXCIgY2xhc3M9XCJmaWxlLXVwbG9hZC1pbnB1dFwiIHR5cGU9J2ZpbGUnIChjaGFuZ2UpPVwib25DaGFuZ2UoJGV2ZW50KVwiIG11bHRpcGxlXG4gICAgICBhY2NlcHQ9XCJ7e2ZpbGVUeXBlfX1cIiAvPlxuICAgIDxpbnB1dCAqbmdJZj1cIiFtdWx0aXBsZVwiIGNsYXNzPVwiZmlsZS11cGxvYWQtaW5wdXRcIiB0eXBlPSdmaWxlJyAoY2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIiBhY2NlcHQ9XCJ7e2ZpbGVUeXBlfX1cIiAvPlxuICAgIDxkaXYgY2xhc3M9XCJkcmFnLXRleHRcIj5cbiAgICAgIDxoMz5EcmFnIGFuZCBEcm9wIGZpbGUocyk8L2gzPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PmAsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5hdGl2ZSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZm9yd2FyZC1yZWZcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neEZpbGVVcGxvYWRlckNvbXBvbmVudCksIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neEZpbGVVcGxvYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQge1xuICBwdWJsaWMgdXJscyA9IG5ldyBBcnJheTxhbnk+KCk7XG4gIHB1YmxpYyBzZWxlY3RGaWxlVHlwZSA9IHRydWU7XG4gIHB1YmxpYyBmaWxlTGlzdCA9IG5ldyBBcnJheTxhbnk+KCk7XG4gIHB1YmxpYyBmaWxlVHlwZTogc3RyaW5nO1xuICBwdWJsaWMgcGRmQXZhaWxhYmxlID0gZmFsc2U7XG4gIHB1YmxpYyBtb2JpbGUgPSBmYWxzZTtcbiAgcHVibGljIFVwbG9hZENhcHRpb25zID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyBzaW5nbGVGaWxlOiBhbnk7XG4gIHB1YmxpYyBtdWx0aXBsZSA9IHRydWU7XG4gIHB1YmxpYyBmaWxlVXBsb2FkID0gZmFsc2U7XG4gIHB1YmxpYyBiYWNrQnV0dG9uID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyBzb3VyY2U6IGFueTtcbiAgQE91dHB1dCgpIHB1YmxpYyBmaWxlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQgKCkgcHVibGljIGxpdmVDYW1lcmE6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIHVwbG9hZERhdGE6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIF9vbkNsZWFyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHVibGljIF9pbWFnZVBhdGg6IHN0cmluZztcbiAgcHVibGljIHVwbG9hZGluZyA9IGZhbHNlO1xuICAvLyBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueSA9ICcnO1xuXG4gIC8vIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZXNkXG4gIC8vIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLnNpbmdsZUZpbGUpIHtcbiAgICAgIHRoaXMubXVsdGlwbGUgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHdpbmRvdy5zY3JlZW4ud2lkdGggPD0gNjkyKSB7IC8vIDc2OHB4IHBvcnRyYWl0XG4gICAgICB0aGlzLm1vYmlsZSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLy8gZ2V0IGFjY2Vzc29yXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICAvLyBzZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuICAvLyBDdXJyZW50IHRpbWUgc3RyaW5nLlxuXG4gIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBwdWJsaWMgb25CbHVyKCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNoYW5nZShldmVudDogYW55KSB7XG4gICAgY29uc3QgZmlsZXMgPSBldmVudC5zcmNFbGVtZW50LmZpbGVzO1xuICAgIHRoaXMudXBsb2FkaW5nID0gdHJ1ZTtcbiAgICAvLyBjb25zdCBmaWxlVG9Mb2FkID0gZmlsZXM7XG5cbiAgICBpZiAoZmlsZXMpIHtcbiAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgICBjb25zdCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgICBmaWxlUmVhZGVyLm9ubG9hZCA9IChmaWxlTG9hZGVkRXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBmaWxlUmVhZGVyLnJlc3VsdDtcbiAgICAgICAgICBjb25zdCBuYW1lID0gZmlsZS5uYW1lO1xuICAgICAgICAgIGNvbnN0IGZpbGVTaXplID0gTWF0aC5yb3VuZChmaWxlLnNpemUgLyAxMDI0KTtcblxuICAgICAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgaWQ6IHRoaXMudXJscy5sZW5ndGggKyAxLFxuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIHNpemU6IGZpbGVTaXplXG4gICAgICAgICAgfTtcbiAgICAgICAgICBpZiAoIXRoaXMuc2luZ2xlRmlsZSkge1xuICAgICAgICAgICAgdGhpcy51cmxzLnB1c2gocGF5bG9hZCk7XG4gICAgICAgICAgICB0aGlzLmZpbGVMaXN0LnB1c2gocGF5bG9hZCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmlsZUNoYW5nZWQuZW1pdChwYXlsb2FkKTtcbiAgICAgICAgICAgIHRoaXMuYmFjaygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgfVxuXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsZWFyKCkge1xuICAgIHRoaXMudmFsdWUgPSAnJztcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy52YWx1ZSk7XG4gICAgdGhpcy51cmxzID0gW107XG4gICAgdGhpcy5iYWNrKCk7XG4gICAgdGhpcy5fb25DbGVhci5lbWl0KCk7XG4gIH1cbiAgcHVibGljIGJhY2soKSB7XG4gICAgdGhpcy5zZWxlY3RGaWxlVHlwZSA9IHRydWU7XG4gICAgdGhpcy51cmxzID0gW107XG4gICAgdGhpcy5iYWNrQnV0dG9uID0gZmFsc2U7XG4gICAgdGhpcy5maWxlTGlzdCA9IFtdO1xuICAgIHRoaXMuVXBsb2FkQ2FwdGlvbnMgPSBmYWxzZTtcbiAgICB0aGlzLmZpbGVVcGxvYWQgPSBmYWxzZTtcbiAgICB0aGlzLmxpdmVDYW1lcmEuZW1pdCgpO1xuICB9XG4gIHB1YmxpYyB0b2dnbGVWaXNpYmlsaXR5KGZpbGV0eXBlOiBzdHJpbmcpIHtcbiAgICBpZiAoZmlsZXR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgIHRoaXMuZmlsZVR5cGUgPSAnaW1hZ2UvcG5nLCBpbWFnZS9qcGVnLCBpbWFnZS9naWYnO1xuICAgICAgdGhpcy5maWxlVXBsb2FkID0gdHJ1ZTtcblxuICAgIH0gZWxzZSBpZiAoZmlsZXR5cGUgPT09ICdwZGYnKSB7XG4gICAgICB0aGlzLmZpbGVUeXBlID0gJ2FwcGxpY2F0aW9uL3BkZic7XG4gICAgICB0aGlzLnBkZkF2YWlsYWJsZSA9IHRydWU7XG4gICAgICB0aGlzLmZpbGVVcGxvYWQgPSB0cnVlO1xuXG4gICAgfSBlbHNlIGlmIChmaWxldHlwZSA9PT0gJ2JvdGgnKSB7XG4gICAgICB0aGlzLmZpbGVUeXBlID0gJ2ltYWdlL3BuZywgaW1hZ2UvanBlZywgaW1hZ2UvZ2lmICwgYXBwbGljYXRpb24vcGRmJztcbiAgICAgIHRoaXMucGRmQXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgIHRoaXMuZmlsZVVwbG9hZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChmaWxldHlwZSA9PT0gJ2xpdmVDYW1lcmEnKSB7XG4gICAgICB0aGlzLmxpdmVDYW1lcmEuZW1pdCgpO1xuICAgIH1cbiAgICB0aGlzLnNlbGVjdEZpbGVUeXBlID0gZmFsc2U7XG4gICAgdGhpcy5iYWNrQnV0dG9uID0gdHJ1ZTtcblxuICB9XG5cbiAgcHVibGljIHVwbG9hZCgpIHtcbiAgICB0aGlzLnVwbG9hZERhdGEuZW1pdCh0aGlzLmZpbGVMaXN0KTtcbiAgICB0aGlzLmJhY2soKTtcbiAgfVxuXG4gIHB1YmxpYyBNZXJnZUltYWdlcygpIHtcbiAgICBjb25zdCBkb2MgPSBuZXcganNQREYoKTtcbiAgICBkb2MucGFnZSA9IDE7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmZpbGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBpbWFnZURhdGEgPSB0aGlzLmZpbGVMaXN0W2ldLmRhdGEgfHwgdGhpcy5maWxlTGlzdFtpXS5pbWFnZUFzRGF0YVVybDtcbiAgICAgIGRvYy5hZGRJbWFnZShpbWFnZURhdGEsICdKUEcnLCAxMCwgMTAsIDE5MCwgMjcwKTtcbiAgICAgIGRvYy5zZXRGb250KCdjb3VyaWVyJyk7XG4gICAgICBkb2Muc2V0Rm9udFR5cGUoJ25vcm1hbCcpO1xuICAgICAgZG9jLnRleHQoMTgwLCAyOTAsICdwYWdlICcgKyBkb2MucGFnZSk7XG4gICAgICBkb2MucGFnZSsrO1xuICAgICAgaWYgKGkgPCB0aGlzLmZpbGVMaXN0Lmxlbmd0aCkge1xuICAgICAgICBkb2MuYWRkUGFnZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBkb2MuZGVsZXRlUGFnZSh0aGlzLmZpbGVMaXN0Lmxlbmd0aCArIDEpO1xuICAgIHRoaXMuZmlsZUxpc3QgPSBbXTtcbiAgICB0aGlzLnVybHMgPSBbXTtcbiAgICBjb25zdCBkYXRhID0gZG9jLm91dHB1dCgnZGF0YXVyaXN0cmluZycpO1xuICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICBkYXRhLFxuICAgIH07XG4gICAgdGhpcy5maWxlTGlzdC5wdXNoKHBheWxvYWQpO1xuICAgIHRoaXMudXJscy5wdXNoKHBheWxvYWQpO1xuICAgIGRvYy5vdXRwdXQoJ2RhdGF1cmxuZXd3aW5kb3cnKTtcbiAgICAvLyBkb2Muc2F2ZSgnVGVzdC5wZGYnKTtcblxuICB9XG4gIHB1YmxpYyBkZWxldGUodXJsczogYW55KSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gdGhpcy51cmxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodXJscy5kYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLnVybHNbaV0uZGF0YSA9PT0gdXJscy5kYXRhKSB7XG4gICAgICAgICAgdGhpcy51cmxzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICB0aGlzLmZpbGVMaXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh1cmxzLmltYWdlQXNEYXRhVXJsKSB7XG4gICAgICAgIGlmICh0aGlzLnVybHNbaV0uaW1hZ2VBc0RhdGFVcmwgPT09IHVybHMuaW1hZ2VBc0RhdGFVcmwpIHtcbiAgICAgICAgICB0aGlzLnVybHMuc3BsaWNlKGkpO1xuICAgICAgICAgIHRoaXMuZmlsZUxpc3Quc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59Il19