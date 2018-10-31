(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-file-uploader-lib', ['exports', '@angular/core', '@angular/forms', '@angular/common'], factory) :
    (factory((global['ngx-file-uploader-lib'] = {}),global.ng.core,global.ng.forms,global.ng.common));
}(this, (function (exports,i0,forms,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var NgxFileUploaderService = /** @class */ (function () {
        function NgxFileUploaderService() {
        }
        NgxFileUploaderService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        NgxFileUploaderService.ctorParameters = function () { return []; };
        /** @nocollapse */ NgxFileUploaderService.ngInjectableDef = i0.defineInjectable({ factory: function NgxFileUploaderService_Factory() { return new NgxFileUploaderService(); }, token: NgxFileUploaderService, providedIn: "root" });
        return NgxFileUploaderService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @type {?} */
    var noop = function () {
    };
    var NgxFileUploaderComponent = /** @class */ (function () {
        function NgxFileUploaderComponent() {
            this.fileChanged = new i0.EventEmitter();
            this.onClear = new i0.EventEmitter();
            this.uploading = false;
            // The internal data model
            this.innerValue = '';
            // Placeholders for the callbacks which are later providesd
            // by the Control Value Accessor
            this.onTouchedCallback = noop;
            this.onChangeCallback = noop;
        }
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
                    this.onChangeCallback(this.value);
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
                /** @type {?} */
                var fileToLoad = files[0];
                /** @type {?} */
                var fileReader = new FileReader();
                fileReader.onload = function (fileLoadedEvent) {
                    /** @type {?} */
                    var data = fileReader.result;
                    /** @type {?} */
                    var fileType = data.toString().substring('data:image/'.length, data.toString().indexOf(';base64'));
                    /** @type {?} */
                    var payload = {
                        data: data,
                        extension: fileType
                    };
                    _this.fileChanged.emit(payload);
                };
                fileReader.readAsDataURL(fileToLoad);
            };
        /**
         * @return {?}
         */
        NgxFileUploaderComponent.prototype.clear = /**
         * @return {?}
         */
            function () {
                this.value = '';
                this.onClear.emit();
                this.onChangeCallback(this.value);
            };
        NgxFileUploaderComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'file-uploader',
                        template: "<div>\n    <div class=\"input-group\">\n      <input type=\"text\" class=\"form-control\" readonly [(ngModel)]=\"value\">\n      <div class=\"input-group-btn\">\n  \n        <div class=\"btn btn-default image-preview-input\">\n          <span class=\"glyphicon glyphicon-folder-open\"></span>\n          <span class=\"image-preview-input-title\">Take Photo / Select File</span>\n          <input type=\"file\" onclick=\"value = null\" accept=\"image/png, image/jpeg, image/gif\" (blur)=\"onBlur()\" name=\"input-file-preview\" (change)=\"onChange($event)\"\n          />\n        </div>\n        <button *ngIf=\"value\" type=\"button\"  (click)=\"clear()\" class=\"btn btn-default image-preview-clear\">\n                          <span class=\"glyphicon glyphicon-remove\"></span> Clear\n      </button>\n      </div>\n    </div>\n  </div>",
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: i0.forwardRef(function () { return NgxFileUploaderComponent; }), multi: true
                            }
                        ],
                        styles: [".btn-file{position:relative;overflow:hidden}.btn-file input[type=file]{position:absolute;top:0;right:0;min-width:100%;min-height:100%;font-size:100px;text-align:right;opacity:0;outline:0;background:#fff;cursor:inherit;display:block}#img-upload{width:100%}.image-preview-input input[type=file]{position:absolute;top:0;right:0;margin:0;padding:0;font-size:20px;cursor:pointer;opacity:0}"]
                    }] }
        ];
        NgxFileUploaderComponent.propDecorators = {
            source: [{ type: i0.Input }],
            fileChanged: [{ type: i0.Output }],
            onClear: [{ type: i0.Output }]
        };
        return NgxFileUploaderComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var NgxFileUploaderModule = /** @class */ (function () {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZpbGUtdXBsb2FkZXItbGliLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LWZpbGUtdXBsb2FkZXItbGliL2xpYi9uZ3gtZmlsZS11cGxvYWRlci5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtZmlsZS11cGxvYWRlci1saWIvbGliL25neC1maWxlLXVwbG9hZGVyLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWZpbGUtdXBsb2FkZXItbGliL2xpYi9uZ3gtZmlsZS11cGxvYWRlci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hGaWxlVXBsb2FkZXJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZmlsZS11cGxvYWRlcicsXG4gIHN0eWxlVXJsczogWycuL25neC1maWxlLXVwbG9hZGVyLmNvbXBvbmVudC5jc3MnXSxcbiAgdGVtcGxhdGVVcmw6ICcuL25neC1maWxlLXVwbG9hZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ3hGaWxlVXBsb2FkZXJDb21wb25lbnQpLCBtdWx0aTogdHJ1ZVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hGaWxlVXBsb2FkZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBJbnB1dCgpIHB1YmxpYyBzb3VyY2U6IGFueTtcbiAgQE91dHB1dCgpIHB1YmxpYyBmaWxlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25DbGVhcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHB1YmxpYyBfaW1hZ2VQYXRoOiBzdHJpbmc7XG4gIHB1YmxpYyB1cGxvYWRpbmcgPSBmYWxzZTtcbiAgLy8gVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnkgPSAnJztcblxuICAvLyBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVzZFxuICAvLyBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICAvLyBnZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIHNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG4gIC8vIEN1cnJlbnQgdGltZSBzdHJpbmcuXG5cbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuICBcblxuICBwdWJsaWMgb25CbHVyKCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNoYW5nZShldmVudDogYW55KSB7XG4gICAgY29uc3QgZmlsZXMgPSBldmVudC5zcmNFbGVtZW50LmZpbGVzO1xuICAgIHRoaXMudXBsb2FkaW5nID0gdHJ1ZTtcbiAgICBjb25zdCBmaWxlVG9Mb2FkID0gZmlsZXNbMF07XG5cbiAgICBjb25zdCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICBmaWxlUmVhZGVyLm9ubG9hZCA9IChmaWxlTG9hZGVkRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSBmaWxlUmVhZGVyLnJlc3VsdDtcbiAgICAgIGNvbnN0IGZpbGVUeXBlID0gZGF0YS50b1N0cmluZygpLnN1YnN0cmluZygnZGF0YTppbWFnZS8nLmxlbmd0aCwgZGF0YS50b1N0cmluZygpLmluZGV4T2YoJztiYXNlNjQnKSk7XG4gICAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgICBkYXRhLFxuICAgICAgICBleHRlbnNpb246IGZpbGVUeXBlXG4gICAgICB9O1xuICAgICAgdGhpcy5maWxlQ2hhbmdlZC5lbWl0KHBheWxvYWQpO1xuICAgIH07XG5cbiAgICBmaWxlUmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZVRvTG9hZCk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXIoKSB7XG4gICAgdGhpcy52YWx1ZSA9ICcnO1xuICAgIHRoaXMub25DbGVhci5lbWl0KCk7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMudmFsdWUpO1xuICB9XG59IiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgTmd4RmlsZVVwbG9hZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtZmlsZS11cGxvYWRlci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLEZvcm1zTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW05neEZpbGVVcGxvYWRlckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtOZ3hGaWxlVXBsb2FkZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE5neEZpbGVVcGxvYWRlck1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiRXZlbnRFbWl0dGVyIiwiQ29tcG9uZW50IiwiTkdfVkFMVUVfQUNDRVNTT1IiLCJmb3J3YXJkUmVmIiwiSW5wdXQiLCJPdXRwdXQiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkZvcm1zTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7UUFPRTtTQUFpQjs7b0JBTGxCQSxhQUFVLFNBQUM7d0JBQ1YsVUFBVSxFQUFFLE1BQU07cUJBQ25COzs7OztxQ0FKRDtLQUVBOzs7Ozs7QUNGQTtRQUlNLElBQUks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