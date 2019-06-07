(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('jspdf'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-file-uploader', ['exports', '@angular/core', '@angular/forms', 'jspdf', '@angular/common'], factory) :
    (factory((global['ngx-file-uploader'] = {}),global.ng.core,global.ng.forms,null,global.ng.common));
}(this, (function (exports,i0,forms,jsPDF,common) { 'use strict';

    jsPDF = jsPDF && jsPDF.hasOwnProperty('default') ? jsPDF['default'] : jsPDF;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var NgxFileUploaderService = (function () {
        function NgxFileUploaderService() {
        }
        NgxFileUploaderService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        NgxFileUploaderService.ctorParameters = function () { return []; };
        /** @nocollapse */ NgxFileUploaderService.ngInjectableDef = i0.defineInjectable({ factory: function NgxFileUploaderService_Factory() { return new NgxFileUploaderService(); }, token: NgxFileUploaderService, providedIn: "root" });
        return NgxFileUploaderService;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @type {?} */
    var noop = function () {
        // placeholder call backs
    };
    var NgxFileUploaderComponent = (function () {
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
            this.fileChanged = new i0.EventEmitter();
            this.liveCamera = new i0.EventEmitter();
            this.uploadData = new i0.EventEmitter();
            this._onClear = new i0.EventEmitter();
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
                        for (var files_1 = __values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                            var file = files_1_1.value;
                            _loop_1(file);
                        }
                    }
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (files_1_1 && !files_1_1.done && (_a = files_1.return))
                                _a.call(files_1);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
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
            { type: i0.Component, args: [{
                        selector: 'file-uploader',
                        template: "<div *ngIf=\"backButton\">\n  <button class=\"btn btn-default image-preview-clear\" type=\"button\" (click)=\"back()\">\n    <span class=\"glyphicon glyphicon-circle-arrow-left\"></span> Back\n  </button>\n</div>\n<div *ngIf=\"selectFileType\" class=\"panel panel-primary\">\n  <div class=\"panel-heading\">UPLOAD FILE TYPE</div>\n  <div class=\"panel-body\">\n    <div class=\"row-cb\">\n      <span><input name=\"image\" id=\"ima\" (change)=\"toggleVisibility('image')\" type=\"checkbox\" /></span>\n      <label for=\"ima\">Image</label>\n\n      <div class=\"clear-both\"></div>\n    </div>\n    <div class=\"row-cb\">\n      <span><input name=\"option\" id=\"pdf\" (change)=\"toggleVisibility('pdf')\" type=\"checkbox\" /></span>\n      <label for=\"pdf\">PDF</label>\n\n      <div class=\"clear-both\"></div>\n    </div>\n    <div *ngIf=\"!singleFile\" class=\"row-cb\">\n      <span><input name=\"option\" id=\"both\" (change)=\"toggleVisibility('both')\" type=\"checkbox\" /></span>\n      <label for=\"both\">Image & PDF</label>\n\n      <div class=\"clear-both\"></div>\n    </div>\n    <div class=\"row-cb\">\n      <span><input name=\"camera\" id=\"camera\" (change)=\"toggleVisibility('liveCamera')\" type=\"checkbox\" /></span>\n      <label for=\"camera\">Live Camera</label>\n\n      <div class=\"clear-both\"></div>\n    </div>\n  </div>\n</div>\n<div style=\"display: block;\">\n  <div style=\"display: inline-block;\" *ngFor=\"let url of urls;let i=index\">\n    <a class=\"columne\" id=\"caption\">\n      <img style=\" border: 1px solid rgb(97, 97, 97); margin: 2px; border-radius: 4px;padding: 5px;\" id=\"img{{i}}\"\n        [src]=\"url.data || url.imageAsDataUrl\"\n        onError=\"this.onerror=null;this.src='59e6d5338faf193392f1bf9f89f4513dc548bd68.png | secure';\"\n        class=\"rounded mb-3\" width=\"90\" height=\"200\">\n      <div class=\"text\">\n        <h2 title=\"Click to Delete File {{url.name}}\" (click)=\"delete(url)\"\n          style=\"color: rgb(255, 255, 255); font-family: fantasy;\"><span class=\"glyphicon glyphicon-trash\"></span>REMOVE\n        </h2>\n      </div>\n    </a>\n  </div>\n  <button *ngIf=\"UploadCaptions\" type=\"button\" (click)=\"upload()\" class=\"button\">\n    <span class=\"glyphicon glyphicon-upload\"></span> Upload Files\n  </button>\n  <button *ngIf=\"!pdfAvailable && fileUpload || liveCamera\" type=\"button\" [disabled]=\"!urls[1]\" (click)=\"MergeImages()\"\n    title=\"merge the images as pages in one pdf document\" class=\"btn btn-default image-preview-clear\">\n    <span class=\"glyphicon glyphicon-upload\"></span> Merge\n  </button>\n</div>\n<div *ngIf=\"fileUpload\">\n\n  <div class=\"input-group\">\n    <input type=\"text\" class=\"form-control\" readonly [(ngModel)]=\"value\">\n    <div class=\"input-group-btn\">\n\n      <div class=\"btn btn-default image-preview-input\">\n        <span class=\"glyphicon glyphicon-folder-open\"></span>\n        <span class=\"image-preview-input-title\">SELECT FILE</span>\n        <input *ngIf=\"multiple\" type=\"file\" multiple accept=\"{{fileType}}\" (blur)=\"onBlur()\" name=\"input-file-preview\"\n          (change)=\"onChange($event)\" />\n        <input *ngIf=\"!multiple\" type=\"file\" accept=\"{{fileType}}\" (blur)=\"onBlur()\" name=\"input-file-preview\"\n          (change)=\"onChange($event)\" />\n        <!-- rename it -->\n      </div>\n      <button *ngIf=\"value\" type=\"button\" (click)=\"clear()\" class=\"btn btn-default image-preview-clear\">\n        <span class=\"glyphicon glyphicon-remove\"></span> Clear\n      </button>\n      <button *ngIf=\"multiple\" type=\"button\" (click)=\"upload()\" class=\"button\">\n        <span class=\"glyphicon glyphicon-upload\"></span> Upload\n      </button>\n    </div>\n  </div>\n  <div *ngIf=\"!mobile\" class=\"image-upload-wrap\">\n    <input *ngIf=\"multiple\" class=\"file-upload-input\" type='file' (change)=\"onChange($event)\" multiple\n      accept=\"{{fileType}}\" />\n    <input *ngIf=\"!multiple\" class=\"file-upload-input\" type='file' (change)=\"onChange($event)\" accept=\"{{fileType}}\" />\n    <div class=\"drag-text\">\n      <h3>Drag and Drop file(s)</h3>\n    </div>\n  </div>\n</div>",
                        encapsulation: i0.ViewEncapsulation.Native,
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                // tslint:disable-next-line:no-forward-ref
                                useExisting: i0.forwardRef(function () { return NgxFileUploaderComponent; }), multi: true
                            }
                        ],
                        styles: [".btn-file{position:relative;overflow:hidden}.btn-file input[type=file]{position:absolute;top:0;right:0;min-width:100%;min-height:100%;font-size:100px;text-align:right;opacity:0;outline:0;background:#fff;cursor:inherit;display:block}#img-upload{width:100%}.image-preview-input input[type=file]{position:absolute;top:0;right:0;margin:0;padding:0;font-size:20px;cursor:pointer;opacity:0}.file-upload{background-color:#fff;width:600px;margin:0 auto;padding:20px}.file-upload-btn{width:100%;margin:0;color:#fff;background:#1fb264;border:none;padding:10px;border-radius:4px;border-bottom:4px solid #15824b;transition:.2s;outline:0;text-transform:uppercase;font-weight:700}ul{list-style-type:none;margin:0;padding:0}.file-upload-btn:hover{background:#1aa059;color:#fff;transition:.2s;cursor:pointer}.file-upload-btn:active{border:0;transition:.2s}.file-upload-content{display:none;text-align:center}.file-upload-input{position:absolute;margin:0;padding:0;width:100%;height:100%;outline:0;opacity:0;cursor:pointer}.image-upload-wrap{margin-top:20px;border:4px dashed #3683c7;position:relative}.image-dropping,.image-upload-wrap:hover{background-color:#337ab7;border:4px dashed #fff}.image-title-wrap{padding:0 15px 15px;color:#222}.drag-text{text-align:center}.drag-text h3{font-weight:100;text-transform:uppercase;color:#155a82;padding:60px 0}.file-upload-image{max-height:200px;max-width:200px;margin:auto;padding:20px}.button{display:inline-block;padding:6px 12px;margin-bottom:0;font-size:14px;font-weight:400;line-height:1.42857143;text-align:center;white-space:nowrap;vertical-align:middle;touch-action:manipulation;cursor:pointer;background-color:#004a7f;border:none;color:#fff;text-decoration:none;-webkit-animation:1.5s infinite glowing;animation:1.5s infinite glowing}@-webkit-keyframes glowing{0%{background-color:#002fb2;-webkit-box-shadow:0 0 3px #005cb2}50%{background-color:#203864;-webkit-box-shadow:0 0 40px #203864}100%{background-color:#005cb2;-webkit-box-shadow:0 0 3px #005cb2}}@keyframes glowing{0%,100%{background-color:#005cb2;box-shadow:0 0 3px #005cb2}50%{background-color:#203864;box-shadow:0 0 40px #203864}}.actionBtn{margin-top:5px;margin-bottom:2px;font-size:1.2em}label{display:inline-block;max-width:100%;margin-bottom:5px;font-weight:700;margin-right:10px}.row-cb{margin:auto;font-size:15px}.row-cb label{float:left}.row-cb span{float:left;text-align:left}.snapshot{text-align:center}.snapshot img{max-width:800px;max-height:800px}.columne#caption .text h1{margin:0;color:#fff}.columne#caption:hover .text{opacity:1;cursor:pointer;opacity:1}.columne#caption{position:relative}.columne#caption .text{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);z-index:10;opacity:0;transition:.8s}.columne#caption:hover img{-webkit-filter:sepia(90%)}@media (max-width:629px){.file-upload-input{display:none!important}}"]
                    }] }
        ];
        NgxFileUploaderComponent.propDecorators = {
            singleFile: [{ type: i0.Input }],
            source: [{ type: i0.Input }],
            fileChanged: [{ type: i0.Output }],
            liveCamera: [{ type: i0.Output }],
            uploadData: [{ type: i0.Output }],
            _onClear: [{ type: i0.Output }]
        };
        return NgxFileUploaderComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var NgxFileUploaderModule = (function () {
        function NgxFileUploaderModule() {
        }
        NgxFileUploaderModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule, forms.FormsModule
                        ],
                        declarations: [NgxFileUploaderComponent],
                        exports: [NgxFileUploaderComponent]
                    },] }
        ];
        return NgxFileUploaderModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */

    exports.NgxFileUploaderService = NgxFileUploaderService;
    exports.NgxFileUploaderComponent = NgxFileUploaderComponent;
    exports.NgxFileUploaderModule = NgxFileUploaderModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZpbGUtdXBsb2FkZXIudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtZmlsZS11cGxvYWRlci9saWIvbmd4LWZpbGUtdXBsb2FkZXIuc2VydmljZS50cyIsbnVsbCwibmc6Ly9uZ3gtZmlsZS11cGxvYWRlci9saWIvbmd4LWZpbGUtdXBsb2FkZXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtZmlsZS11cGxvYWRlci9saWIvbmd4LWZpbGUtdXBsb2FkZXIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4RmlsZVVwbG9hZGVyU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBmb3J3YXJkUmVmLFxuICBPbkNoYW5nZXMsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCDDicK1Q29uc29sZSwgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBpbXBvcnQgKiBhcyBwZGZNYWtlIGZyb20gJ3BkZm1ha2UvYnVpbGQvcGRmbWFrZSc7XG5pbXBvcnQganNQREYgZnJvbSAnanNwZGYnO1xuXG5cbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG4gIC8vIHBsYWNlaG9sZGVyIGNhbGwgYmFja3Ncbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ZpbGUtdXBsb2FkZXInLFxuICBzdHlsZXM6IFtgLmJ0bi1maWxle3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0uYnRuLWZpbGUgaW5wdXRbdHlwZT1maWxlXXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtyaWdodDowO21pbi13aWR0aDoxMDAlO21pbi1oZWlnaHQ6MTAwJTtmb250LXNpemU6MTAwcHg7dGV4dC1hbGlnbjpyaWdodDtvcGFjaXR5OjA7b3V0bGluZTowO2JhY2tncm91bmQ6I2ZmZjtjdXJzb3I6aW5oZXJpdDtkaXNwbGF5OmJsb2NrfSNpbWctdXBsb2Fke3dpZHRoOjEwMCV9LmltYWdlLXByZXZpZXctaW5wdXQgaW5wdXRbdHlwZT1maWxlXXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtyaWdodDowO21hcmdpbjowO3BhZGRpbmc6MDtmb250LXNpemU6MjBweDtjdXJzb3I6cG9pbnRlcjtvcGFjaXR5OjB9LmZpbGUtdXBsb2Fke2JhY2tncm91bmQtY29sb3I6I2ZmZjt3aWR0aDo2MDBweDttYXJnaW46MCBhdXRvO3BhZGRpbmc6MjBweH0uZmlsZS11cGxvYWQtYnRue3dpZHRoOjEwMCU7bWFyZ2luOjA7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kOiMxZmIyNjQ7Ym9yZGVyOm5vbmU7cGFkZGluZzoxMHB4O2JvcmRlci1yYWRpdXM6NHB4O2JvcmRlci1ib3R0b206NHB4IHNvbGlkICMxNTgyNGI7dHJhbnNpdGlvbjouMnM7b3V0bGluZTowO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtmb250LXdlaWdodDo3MDB9dWx7bGlzdC1zdHlsZS10eXBlOm5vbmU7bWFyZ2luOjA7cGFkZGluZzowfS5maWxlLXVwbG9hZC1idG46aG92ZXJ7YmFja2dyb3VuZDojMWFhMDU5O2NvbG9yOiNmZmY7dHJhbnNpdGlvbjouMnM7Y3Vyc29yOnBvaW50ZXJ9LmZpbGUtdXBsb2FkLWJ0bjphY3RpdmV7Ym9yZGVyOjA7dHJhbnNpdGlvbjouMnN9LmZpbGUtdXBsb2FkLWNvbnRlbnR7ZGlzcGxheTpub25lO3RleHQtYWxpZ246Y2VudGVyfS5maWxlLXVwbG9hZC1pbnB1dHtwb3NpdGlvbjphYnNvbHV0ZTttYXJnaW46MDtwYWRkaW5nOjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtvdXRsaW5lOjA7b3BhY2l0eTowO2N1cnNvcjpwb2ludGVyfS5pbWFnZS11cGxvYWQtd3JhcHttYXJnaW4tdG9wOjIwcHg7Ym9yZGVyOjRweCBkYXNoZWQgIzM2ODNjNztwb3NpdGlvbjpyZWxhdGl2ZX0uaW1hZ2UtZHJvcHBpbmcsLmltYWdlLXVwbG9hZC13cmFwOmhvdmVye2JhY2tncm91bmQtY29sb3I6IzMzN2FiNztib3JkZXI6NHB4IGRhc2hlZCAjZmZmfS5pbWFnZS10aXRsZS13cmFwe3BhZGRpbmc6MCAxNXB4IDE1cHg7Y29sb3I6IzIyMn0uZHJhZy10ZXh0e3RleHQtYWxpZ246Y2VudGVyfS5kcmFnLXRleHQgaDN7Zm9udC13ZWlnaHQ6MTAwO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtjb2xvcjojMTU1YTgyO3BhZGRpbmc6NjBweCAwfS5maWxlLXVwbG9hZC1pbWFnZXttYXgtaGVpZ2h0OjIwMHB4O21heC13aWR0aDoyMDBweDttYXJnaW46YXV0bztwYWRkaW5nOjIwcHh9LmJ1dHRvbntkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOjZweCAxMnB4O21hcmdpbi1ib3R0b206MDtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo0MDA7bGluZS1oZWlnaHQ6MS40Mjg1NzE0Mzt0ZXh0LWFsaWduOmNlbnRlcjt3aGl0ZS1zcGFjZTpub3dyYXA7dmVydGljYWwtYWxpZ246bWlkZGxlO3RvdWNoLWFjdGlvbjptYW5pcHVsYXRpb247Y3Vyc29yOnBvaW50ZXI7YmFja2dyb3VuZC1jb2xvcjojMDA0YTdmO2JvcmRlcjpub25lO2NvbG9yOiNmZmY7dGV4dC1kZWNvcmF0aW9uOm5vbmU7LXdlYmtpdC1hbmltYXRpb246MS41cyBpbmZpbml0ZSBnbG93aW5nO2FuaW1hdGlvbjoxLjVzIGluZmluaXRlIGdsb3dpbmd9QC13ZWJraXQta2V5ZnJhbWVzIGdsb3dpbmd7MCV7YmFja2dyb3VuZC1jb2xvcjojMDAyZmIyOy13ZWJraXQtYm94LXNoYWRvdzowIDAgM3B4ICMwMDVjYjJ9NTAle2JhY2tncm91bmQtY29sb3I6IzIwMzg2NDstd2Via2l0LWJveC1zaGFkb3c6MCAwIDQwcHggIzIwMzg2NH0xMDAle2JhY2tncm91bmQtY29sb3I6IzAwNWNiMjstd2Via2l0LWJveC1zaGFkb3c6MCAwIDNweCAjMDA1Y2IyfX1Aa2V5ZnJhbWVzIGdsb3dpbmd7MCUsMTAwJXtiYWNrZ3JvdW5kLWNvbG9yOiMwMDVjYjI7Ym94LXNoYWRvdzowIDAgM3B4ICMwMDVjYjJ9NTAle2JhY2tncm91bmQtY29sb3I6IzIwMzg2NDtib3gtc2hhZG93OjAgMCA0MHB4ICMyMDM4NjR9fS5hY3Rpb25CdG57bWFyZ2luLXRvcDo1cHg7bWFyZ2luLWJvdHRvbToycHg7Zm9udC1zaXplOjEuMmVtfWxhYmVse2Rpc3BsYXk6aW5saW5lLWJsb2NrO21heC13aWR0aDoxMDAlO21hcmdpbi1ib3R0b206NXB4O2ZvbnQtd2VpZ2h0OjcwMDttYXJnaW4tcmlnaHQ6MTBweH0ucm93LWNie21hcmdpbjphdXRvO2ZvbnQtc2l6ZToxNXB4fS5yb3ctY2IgbGFiZWx7ZmxvYXQ6bGVmdH0ucm93LWNiIHNwYW57ZmxvYXQ6bGVmdDt0ZXh0LWFsaWduOmxlZnR9LnNuYXBzaG90e3RleHQtYWxpZ246Y2VudGVyfS5zbmFwc2hvdCBpbWd7bWF4LXdpZHRoOjgwMHB4O21heC1oZWlnaHQ6ODAwcHh9LmNvbHVtbmUjY2FwdGlvbiAudGV4dCBoMXttYXJnaW46MDtjb2xvcjojZmZmfS5jb2x1bW5lI2NhcHRpb246aG92ZXIgLnRleHR7b3BhY2l0eToxO2N1cnNvcjpwb2ludGVyO29wYWNpdHk6MX0uY29sdW1uZSNjYXB0aW9ue3Bvc2l0aW9uOnJlbGF0aXZlfS5jb2x1bW5lI2NhcHRpb24gLnRleHR7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTtsZWZ0OjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7ei1pbmRleDoxMDtvcGFjaXR5OjA7dHJhbnNpdGlvbjouOHN9LmNvbHVtbmUjY2FwdGlvbjpob3ZlciBpbWd7LXdlYmtpdC1maWx0ZXI6c2VwaWEoOTAlKX1AbWVkaWEgKG1heC13aWR0aDo2MjlweCl7LmZpbGUtdXBsb2FkLWlucHV0e2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fWBdLFxuICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJiYWNrQnV0dG9uXCI+XG4gIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgaW1hZ2UtcHJldmlldy1jbGVhclwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiYmFjaygpXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWNpcmNsZS1hcnJvdy1sZWZ0XCI+PC9zcGFuPiBCYWNrXG4gIDwvYnV0dG9uPlxuPC9kaXY+XG48ZGl2ICpuZ0lmPVwic2VsZWN0RmlsZVR5cGVcIiBjbGFzcz1cInBhbmVsIHBhbmVsLXByaW1hcnlcIj5cbiAgPGRpdiBjbGFzcz1cInBhbmVsLWhlYWRpbmdcIj5VUExPQUQgRklMRSBUWVBFPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+XG4gICAgPGRpdiBjbGFzcz1cInJvdy1jYlwiPlxuICAgICAgPHNwYW4+PGlucHV0IG5hbWU9XCJpbWFnZVwiIGlkPVwiaW1hXCIgKGNoYW5nZSk9XCJ0b2dnbGVWaXNpYmlsaXR5KCdpbWFnZScpXCIgdHlwZT1cImNoZWNrYm94XCIgLz48L3NwYW4+XG4gICAgICA8bGFiZWwgZm9yPVwiaW1hXCI+SW1hZ2U8L2xhYmVsPlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiY2xlYXItYm90aFwiPjwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJyb3ctY2JcIj5cbiAgICAgIDxzcGFuPjxpbnB1dCBuYW1lPVwib3B0aW9uXCIgaWQ9XCJwZGZcIiAoY2hhbmdlKT1cInRvZ2dsZVZpc2liaWxpdHkoJ3BkZicpXCIgdHlwZT1cImNoZWNrYm94XCIgLz48L3NwYW4+XG4gICAgICA8bGFiZWwgZm9yPVwicGRmXCI+UERGPC9sYWJlbD5cblxuICAgICAgPGRpdiBjbGFzcz1cImNsZWFyLWJvdGhcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2ICpuZ0lmPVwiIXNpbmdsZUZpbGVcIiBjbGFzcz1cInJvdy1jYlwiPlxuICAgICAgPHNwYW4+PGlucHV0IG5hbWU9XCJvcHRpb25cIiBpZD1cImJvdGhcIiAoY2hhbmdlKT1cInRvZ2dsZVZpc2liaWxpdHkoJ2JvdGgnKVwiIHR5cGU9XCJjaGVja2JveFwiIC8+PC9zcGFuPlxuICAgICAgPGxhYmVsIGZvcj1cImJvdGhcIj5JbWFnZSAmIFBERjwvbGFiZWw+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJjbGVhci1ib3RoXCI+PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInJvdy1jYlwiPlxuICAgICAgPHNwYW4+PGlucHV0IG5hbWU9XCJjYW1lcmFcIiBpZD1cImNhbWVyYVwiIChjaGFuZ2UpPVwidG9nZ2xlVmlzaWJpbGl0eSgnbGl2ZUNhbWVyYScpXCIgdHlwZT1cImNoZWNrYm94XCIgLz48L3NwYW4+XG4gICAgICA8bGFiZWwgZm9yPVwiY2FtZXJhXCI+TGl2ZSBDYW1lcmE8L2xhYmVsPlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiY2xlYXItYm90aFwiPjwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuPGRpdiBzdHlsZT1cImRpc3BsYXk6IGJsb2NrO1wiPlxuICA8ZGl2IHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrO1wiICpuZ0Zvcj1cImxldCB1cmwgb2YgdXJscztsZXQgaT1pbmRleFwiPlxuICAgIDxhIGNsYXNzPVwiY29sdW1uZVwiIGlkPVwiY2FwdGlvblwiPlxuICAgICAgPGltZyBzdHlsZT1cIiBib3JkZXI6IDFweCBzb2xpZCByZ2IoOTcsIDk3LCA5Nyk7IG1hcmdpbjogMnB4OyBib3JkZXItcmFkaXVzOiA0cHg7cGFkZGluZzogNXB4O1wiIGlkPVwiaW1ne3tpfX1cIlxuICAgICAgICBbc3JjXT1cInVybC5kYXRhIHx8IHVybC5pbWFnZUFzRGF0YVVybFwiXG4gICAgICAgIG9uRXJyb3I9XCJ0aGlzLm9uZXJyb3I9bnVsbDt0aGlzLnNyYz0nNTllNmQ1MzM4ZmFmMTkzMzkyZjFiZjlmODlmNDUxM2RjNTQ4YmQ2OC5wbmcgfCBzZWN1cmUnO1wiXG4gICAgICAgIGNsYXNzPVwicm91bmRlZCBtYi0zXCIgd2lkdGg9XCI5MFwiIGhlaWdodD1cIjIwMFwiPlxuICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj5cbiAgICAgICAgPGgyIHRpdGxlPVwiQ2xpY2sgdG8gRGVsZXRlIEZpbGUge3t1cmwubmFtZX19XCIgKGNsaWNrKT1cImRlbGV0ZSh1cmwpXCJcbiAgICAgICAgICBzdHlsZT1cImNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7IGZvbnQtZmFtaWx5OiBmYW50YXN5O1wiPjxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi10cmFzaFwiPjwvc3Bhbj5SRU1PVkVcbiAgICAgICAgPC9oMj5cbiAgICAgIDwvZGl2PlxuICAgIDwvYT5cbiAgPC9kaXY+XG4gIDxidXR0b24gKm5nSWY9XCJVcGxvYWRDYXB0aW9uc1wiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwidXBsb2FkKClcIiBjbGFzcz1cImJ1dHRvblwiPlxuICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi11cGxvYWRcIj48L3NwYW4+IFVwbG9hZCBGaWxlc1xuICA8L2J1dHRvbj5cbiAgPGJ1dHRvbiAqbmdJZj1cIiFwZGZBdmFpbGFibGUgJiYgZmlsZVVwbG9hZCB8fCBsaXZlQ2FtZXJhXCIgdHlwZT1cImJ1dHRvblwiIFtkaXNhYmxlZF09XCIhdXJsc1sxXVwiIChjbGljayk9XCJNZXJnZUltYWdlcygpXCJcbiAgICB0aXRsZT1cIm1lcmdlIHRoZSBpbWFnZXMgYXMgcGFnZXMgaW4gb25lIHBkZiBkb2N1bWVudFwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGltYWdlLXByZXZpZXctY2xlYXJcIj5cbiAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tdXBsb2FkXCI+PC9zcGFuPiBNZXJnZVxuICA8L2J1dHRvbj5cbjwvZGl2PlxuPGRpdiAqbmdJZj1cImZpbGVVcGxvYWRcIj5cblxuICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHJlYWRvbmx5IFsobmdNb2RlbCldPVwidmFsdWVcIj5cbiAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgaW1hZ2UtcHJldmlldy1pbnB1dFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tZm9sZGVyLW9wZW5cIj48L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaW1hZ2UtcHJldmlldy1pbnB1dC10aXRsZVwiPlNFTEVDVCBGSUxFPC9zcGFuPlxuICAgICAgICA8aW5wdXQgKm5nSWY9XCJtdWx0aXBsZVwiIHR5cGU9XCJmaWxlXCIgbXVsdGlwbGUgYWNjZXB0PVwie3tmaWxlVHlwZX19XCIgKGJsdXIpPVwib25CbHVyKClcIiBuYW1lPVwiaW5wdXQtZmlsZS1wcmV2aWV3XCJcbiAgICAgICAgICAoY2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIiAvPlxuICAgICAgICA8aW5wdXQgKm5nSWY9XCIhbXVsdGlwbGVcIiB0eXBlPVwiZmlsZVwiIGFjY2VwdD1cInt7ZmlsZVR5cGV9fVwiIChibHVyKT1cIm9uQmx1cigpXCIgbmFtZT1cImlucHV0LWZpbGUtcHJldmlld1wiXG4gICAgICAgICAgKGNoYW5nZSk9XCJvbkNoYW5nZSgkZXZlbnQpXCIgLz5cbiAgICAgICAgPCEtLSByZW5hbWUgaXQgLS0+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxidXR0b24gKm5nSWY9XCJ2YWx1ZVwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2xlYXIoKVwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGltYWdlLXByZXZpZXctY2xlYXJcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXJlbW92ZVwiPjwvc3Bhbj4gQ2xlYXJcbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiAqbmdJZj1cIm11bHRpcGxlXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJ1cGxvYWQoKVwiIGNsYXNzPVwiYnV0dG9uXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi11cGxvYWRcIj48L3NwYW4+IFVwbG9hZFxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2ICpuZ0lmPVwiIW1vYmlsZVwiIGNsYXNzPVwiaW1hZ2UtdXBsb2FkLXdyYXBcIj5cbiAgICA8aW5wdXQgKm5nSWY9XCJtdWx0aXBsZVwiIGNsYXNzPVwiZmlsZS11cGxvYWQtaW5wdXRcIiB0eXBlPSdmaWxlJyAoY2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIiBtdWx0aXBsZVxuICAgICAgYWNjZXB0PVwie3tmaWxlVHlwZX19XCIgLz5cbiAgICA8aW5wdXQgKm5nSWY9XCIhbXVsdGlwbGVcIiBjbGFzcz1cImZpbGUtdXBsb2FkLWlucHV0XCIgdHlwZT0nZmlsZScgKGNoYW5nZSk9XCJvbkNoYW5nZSgkZXZlbnQpXCIgYWNjZXB0PVwie3tmaWxlVHlwZX19XCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwiZHJhZy10ZXh0XCI+XG4gICAgICA8aDM+RHJhZyBhbmQgRHJvcCBmaWxlKHMpPC9oMz5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5gLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5OYXRpdmUsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZvcndhcmQtcmVmXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ3hGaWxlVXBsb2FkZXJDb21wb25lbnQpLCBtdWx0aTogdHJ1ZVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hGaWxlVXBsb2FkZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0IHtcbiAgcHVibGljIHVybHMgPSBuZXcgQXJyYXk8YW55PigpO1xuICBwdWJsaWMgc2VsZWN0RmlsZVR5cGUgPSB0cnVlO1xuICBwdWJsaWMgZmlsZUxpc3QgPSBuZXcgQXJyYXk8YW55PigpO1xuICBwdWJsaWMgZmlsZVR5cGU6IHN0cmluZztcbiAgcHVibGljIHBkZkF2YWlsYWJsZSA9IGZhbHNlO1xuICBwdWJsaWMgbW9iaWxlID0gZmFsc2U7XG4gIHB1YmxpYyBVcGxvYWRDYXB0aW9ucyA9IGZhbHNlO1xuICBASW5wdXQoKSBwdWJsaWMgc2luZ2xlRmlsZTogYW55O1xuICBwdWJsaWMgbXVsdGlwbGUgPSB0cnVlO1xuICBwdWJsaWMgZmlsZVVwbG9hZCA9IGZhbHNlO1xuICBwdWJsaWMgYmFja0J1dHRvbiA9IGZhbHNlO1xuICBASW5wdXQoKSBwdWJsaWMgc291cmNlOiBhbnk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgZmlsZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0ICgpIHB1YmxpYyBsaXZlQ2FtZXJhOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyB1cGxvYWREYXRhOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBfb25DbGVhcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHB1YmxpYyBfaW1hZ2VQYXRoOiBzdHJpbmc7XG4gIHB1YmxpYyB1cGxvYWRpbmcgPSBmYWxzZTtcbiAgLy8gVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnkgPSAnJztcblxuICAvLyBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVzZFxuICAvLyBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5zaW5nbGVGaWxlKSB7XG4gICAgICB0aGlzLm11bHRpcGxlID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh3aW5kb3cuc2NyZWVuLndpZHRoIDw9IDY5MikgeyAvLyA3NjhweCBwb3J0cmFpdFxuICAgICAgdGhpcy5tb2JpbGUgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8vIGdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gc2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cbiAgLy8gQ3VycmVudCB0aW1lIHN0cmluZy5cblxuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcHVibGljIG9uQmx1cigpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gIH1cblxuICBwdWJsaWMgb25DaGFuZ2UoZXZlbnQ6IGFueSkge1xuICAgIGNvbnN0IGZpbGVzID0gZXZlbnQuc3JjRWxlbWVudC5maWxlcztcbiAgICB0aGlzLnVwbG9hZGluZyA9IHRydWU7XG4gICAgLy8gY29uc3QgZmlsZVRvTG9hZCA9IGZpbGVzO1xuXG4gICAgaWYgKGZpbGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICAgICAgY29uc3QgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgICAgZmlsZVJlYWRlci5vbmxvYWQgPSAoZmlsZUxvYWRlZEV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gZmlsZVJlYWRlci5yZXN1bHQ7XG4gICAgICAgICAgY29uc3QgbmFtZSA9IGZpbGUubmFtZTtcbiAgICAgICAgICBjb25zdCBmaWxlU2l6ZSA9IE1hdGgucm91bmQoZmlsZS5zaXplIC8gMTAyNCk7XG5cbiAgICAgICAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIGlkOiB0aGlzLnVybHMubGVuZ3RoICsgMSxcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBzaXplOiBmaWxlU2l6ZVxuICAgICAgICAgIH07XG4gICAgICAgICAgaWYgKCF0aGlzLnNpbmdsZUZpbGUpIHtcbiAgICAgICAgICAgIHRoaXMudXJscy5wdXNoKHBheWxvYWQpO1xuICAgICAgICAgICAgdGhpcy5maWxlTGlzdC5wdXNoKHBheWxvYWQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZpbGVDaGFuZ2VkLmVtaXQocGF5bG9hZCk7XG4gICAgICAgICAgICB0aGlzLmJhY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICAgIH1cblxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjbGVhcigpIHtcbiAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMudmFsdWUpO1xuICAgIHRoaXMudXJscyA9IFtdO1xuICAgIHRoaXMuYmFjaygpO1xuICAgIHRoaXMuX29uQ2xlYXIuZW1pdCgpO1xuICB9XG4gIHB1YmxpYyBiYWNrKCkge1xuICAgIHRoaXMuc2VsZWN0RmlsZVR5cGUgPSB0cnVlO1xuICAgIHRoaXMudXJscyA9IFtdO1xuICAgIHRoaXMuYmFja0J1dHRvbiA9IGZhbHNlO1xuICAgIHRoaXMuZmlsZUxpc3QgPSBbXTtcbiAgICB0aGlzLlVwbG9hZENhcHRpb25zID0gZmFsc2U7XG4gICAgdGhpcy5maWxlVXBsb2FkID0gZmFsc2U7XG4gICAgdGhpcy5saXZlQ2FtZXJhLmVtaXQoKTtcbiAgfVxuICBwdWJsaWMgdG9nZ2xlVmlzaWJpbGl0eShmaWxldHlwZTogc3RyaW5nKSB7XG4gICAgaWYgKGZpbGV0eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICB0aGlzLmZpbGVUeXBlID0gJ2ltYWdlL3BuZywgaW1hZ2UvanBlZywgaW1hZ2UvZ2lmJztcbiAgICAgIHRoaXMuZmlsZVVwbG9hZCA9IHRydWU7XG5cbiAgICB9IGVsc2UgaWYgKGZpbGV0eXBlID09PSAncGRmJykge1xuICAgICAgdGhpcy5maWxlVHlwZSA9ICdhcHBsaWNhdGlvbi9wZGYnO1xuICAgICAgdGhpcy5wZGZBdmFpbGFibGUgPSB0cnVlO1xuICAgICAgdGhpcy5maWxlVXBsb2FkID0gdHJ1ZTtcblxuICAgIH0gZWxzZSBpZiAoZmlsZXR5cGUgPT09ICdib3RoJykge1xuICAgICAgdGhpcy5maWxlVHlwZSA9ICdpbWFnZS9wbmcsIGltYWdlL2pwZWcsIGltYWdlL2dpZiAsIGFwcGxpY2F0aW9uL3BkZic7XG4gICAgICB0aGlzLnBkZkF2YWlsYWJsZSA9IHRydWU7XG4gICAgICB0aGlzLmZpbGVVcGxvYWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoZmlsZXR5cGUgPT09ICdsaXZlQ2FtZXJhJykge1xuICAgICAgdGhpcy5saXZlQ2FtZXJhLmVtaXQoKTtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RGaWxlVHlwZSA9IGZhbHNlO1xuICAgIHRoaXMuYmFja0J1dHRvbiA9IHRydWU7XG5cbiAgfVxuXG4gIHB1YmxpYyB1cGxvYWQoKSB7XG4gICAgdGhpcy51cGxvYWREYXRhLmVtaXQodGhpcy5maWxlTGlzdCk7XG4gICAgdGhpcy5iYWNrKCk7XG4gIH1cblxuICBwdWJsaWMgTWVyZ2VJbWFnZXMoKSB7XG4gICAgY29uc3QgZG9jID0gbmV3IGpzUERGKCk7XG4gICAgZG9jLnBhZ2UgPSAxO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5maWxlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaW1hZ2VEYXRhID0gdGhpcy5maWxlTGlzdFtpXS5kYXRhIHx8IHRoaXMuZmlsZUxpc3RbaV0uaW1hZ2VBc0RhdGFVcmw7XG4gICAgICBkb2MuYWRkSW1hZ2UoaW1hZ2VEYXRhLCAnSlBHJywgMTAsIDEwLCAxOTAsIDI3MCk7XG4gICAgICBkb2Muc2V0Rm9udCgnY291cmllcicpO1xuICAgICAgZG9jLnNldEZvbnRUeXBlKCdub3JtYWwnKTtcbiAgICAgIGRvYy50ZXh0KDE4MCwgMjkwLCAncGFnZSAnICsgZG9jLnBhZ2UpO1xuICAgICAgZG9jLnBhZ2UrKztcbiAgICAgIGlmIChpIDwgdGhpcy5maWxlTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgZG9jLmFkZFBhZ2UoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZG9jLmRlbGV0ZVBhZ2UodGhpcy5maWxlTGlzdC5sZW5ndGggKyAxKTtcbiAgICB0aGlzLmZpbGVMaXN0ID0gW107XG4gICAgdGhpcy51cmxzID0gW107XG4gICAgY29uc3QgZGF0YSA9IGRvYy5vdXRwdXQoJ2RhdGF1cmlzdHJpbmcnKTtcbiAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgZGF0YSxcbiAgICB9O1xuICAgIHRoaXMuZmlsZUxpc3QucHVzaChwYXlsb2FkKTtcbiAgICB0aGlzLnVybHMucHVzaChwYXlsb2FkKTtcbiAgICBkb2Mub3V0cHV0KCdkYXRhdXJsbmV3d2luZG93Jyk7XG4gICAgLy8gZG9jLnNhdmUoJ1Rlc3QucGRmJyk7XG5cbiAgfVxuICBwdWJsaWMgZGVsZXRlKHVybHM6IGFueSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHRoaXMudXJscy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHVybHMuZGF0YSkge1xuICAgICAgICBpZiAodGhpcy51cmxzW2ldLmRhdGEgPT09IHVybHMuZGF0YSkge1xuICAgICAgICAgIHRoaXMudXJscy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgdGhpcy5maWxlTGlzdC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodXJscy5pbWFnZUFzRGF0YVVybCkge1xuICAgICAgICBpZiAodGhpcy51cmxzW2ldLmltYWdlQXNEYXRhVXJsID09PSB1cmxzLmltYWdlQXNEYXRhVXJsKSB7XG4gICAgICAgICAgdGhpcy51cmxzLnNwbGljZShpKTtcbiAgICAgICAgICB0aGlzLmZpbGVMaXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufSIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IE5neEZpbGVVcGxvYWRlckNvbXBvbmVudCB9IGZyb20gJy4vbmd4LWZpbGUtdXBsb2FkZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxGb3Jtc01vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtOZ3hGaWxlVXBsb2FkZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbTmd4RmlsZVVwbG9hZGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hGaWxlVXBsb2FkZXJNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIkV2ZW50RW1pdHRlciIsInRzbGliXzEuX192YWx1ZXMiLCJDb21wb25lbnQiLCJWaWV3RW5jYXBzdWxhdGlvbiIsIk5HX1ZBTFVFX0FDQ0VTU09SIiwiZm9yd2FyZFJlZiIsIklucHV0IiwiT3V0cHV0IiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJGb3Jtc01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7UUFPRTtTQUFpQjs7b0JBTGxCQSxhQUFVLFNBQUM7d0JBQ1YsVUFBVSxFQUFFLE1BQU07cUJBQ25COzs7O3FDQUpEO0tBUUM7O0lDUkQ7Ozs7Ozs7Ozs7Ozs7O0FBY0Esc0JBNEZ5QixDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDO1lBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNO29CQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFDbkMsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7YUFDM0M7U0FDSixDQUFDO0lBQ04sQ0FBQzs7Ozs7OztRQzFHSyxJQUFJLEdBQUc7O0lBRWIsQ0FBQzs7UUFFRDtZQXFHUyxTQUFJLEdBQUcsSUFBSSxLQUFLLEVBQU8sQ0FBQztZQUN4QixtQkFBYyxHQUFHLElBQUksQ0FBQztZQUN0QixhQUFRLEdBQUcsSUFBSSxLQUFLLEVBQU8sQ0FBQztZQUU1QixpQkFBWSxHQUFHLEtBQUssQ0FBQztZQUNyQixXQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ2YsbUJBQWMsR0FBRyxLQUFLLENBQUM7WUFFdkIs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