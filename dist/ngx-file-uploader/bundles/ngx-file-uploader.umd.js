(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-file-uploader', ['exports', '@angular/core', '@angular/forms', '@angular/common'], factory) :
    (factory((global['ngx-file-uploader'] = {}),global.ng.core,global.ng.forms,global.ng.common));
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
                        template: "<div>\n    <div class=\"input-group\">\n      <input type=\"text\" class=\"form-control\" readonly [(ngModel)]=\"value\">\n      <div class=\"input-group-btn\">\n  \n        <div class=\"btn btn-default image-preview-input\">\n          <span class=\"glyphicon glyphicon-folder-open\"></span>\n          <span class=\"image-preview-input-title\">Take Photo / Select File</span>\n          <input type=\"file\" onclick=\"value = null\" accept=\"image/png, image/jpeg, image/gif , application/pdf\" (blur)=\"onBlur()\" name=\"input-file-preview\" (change)=\"onChange($event)\"\n          />\n        </div>\n        <button *ngIf=\"value\" type=\"button\"  (click)=\"clear()\" class=\"btn btn-default image-preview-clear\">\n                          <span class=\"glyphicon glyphicon-remove\"></span> Clear\n      </button>\n      </div>\n    </div>\n  </div>",
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZpbGUtdXBsb2FkZXIudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtZmlsZS11cGxvYWRlci9saWIvbmd4LWZpbGUtdXBsb2FkZXIuc2VydmljZS50cyIsIm5nOi8vbmd4LWZpbGUtdXBsb2FkZXIvbGliL25neC1maWxlLXVwbG9hZGVyLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWZpbGUtdXBsb2FkZXIvbGliL25neC1maWxlLXVwbG9hZGVyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5neEZpbGVVcGxvYWRlclNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmaWxlLXVwbG9hZGVyJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmd4LWZpbGUtdXBsb2FkZXIuY29tcG9uZW50LmNzcyddLFxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LWZpbGUtdXBsb2FkZXIuY29tcG9uZW50Lmh0bWwnLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neEZpbGVVcGxvYWRlckNvbXBvbmVudCksIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neEZpbGVVcGxvYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQElucHV0KCkgcHVibGljIHNvdXJjZTogYW55O1xuICBAT3V0cHV0KCkgcHVibGljIGZpbGVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvbkNsZWFyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHVibGljIF9pbWFnZVBhdGg6IHN0cmluZztcbiAgcHVibGljIHVwbG9hZGluZyA9IGZhbHNlO1xuICAvLyBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueSA9ICcnO1xuXG4gIC8vIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZXNkXG4gIC8vIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIC8vIGdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gc2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cbiAgLy8gQ3VycmVudCB0aW1lIHN0cmluZy5cblxuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG4gIFxuXG4gIHB1YmxpYyBvbkJsdXIoKSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICB9XG5cbiAgcHVibGljIG9uQ2hhbmdlKGV2ZW50OiBhbnkpIHtcbiAgICBjb25zdCBmaWxlcyA9IGV2ZW50LnNyY0VsZW1lbnQuZmlsZXM7XG4gICAgdGhpcy51cGxvYWRpbmcgPSB0cnVlO1xuICAgIGNvbnN0IGZpbGVUb0xvYWQgPSBmaWxlc1swXTtcblxuICAgIGNvbnN0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIGZpbGVSZWFkZXIub25sb2FkID0gKGZpbGVMb2FkZWRFdmVudCkgPT4ge1xuICAgICAgY29uc3QgZGF0YSA9IGZpbGVSZWFkZXIucmVzdWx0O1xuICAgICAgY29uc3QgZmlsZVR5cGUgPSBkYXRhLnRvU3RyaW5nKCkuc3Vic3RyaW5nKCdkYXRhOmltYWdlLycubGVuZ3RoLCBkYXRhLnRvU3RyaW5nKCkuaW5kZXhPZignO2Jhc2U2NCcpKTtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgIGRhdGEsXG4gICAgICAgIGV4dGVuc2lvbjogZmlsZVR5cGVcbiAgICAgIH07XG4gICAgICB0aGlzLmZpbGVDaGFuZ2VkLmVtaXQocGF5bG9hZCk7XG4gICAgfTtcblxuICAgIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlVG9Mb2FkKTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhcigpIHtcbiAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgdGhpcy5vbkNsZWFyLmVtaXQoKTtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy52YWx1ZSk7XG4gIH1cbn0iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBOZ3hGaWxlVXBsb2FkZXJDb21wb25lbnQgfSBmcm9tICcuL25neC1maWxlLXVwbG9hZGVyLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsRm9ybXNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbTmd4RmlsZVVwbG9hZGVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW05neEZpbGVVcGxvYWRlckNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4RmlsZVVwbG9hZGVyTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJFdmVudEVtaXR0ZXIiLCJDb21wb25lbnQiLCJOR19WQUxVRV9BQ0NFU1NPUiIsImZvcndhcmRSZWYiLCJJbnB1dCIsIk91dHB1dCIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiRm9ybXNNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtRQU9FO1NBQWlCOztvQkFMbEJBLGFBQVUsU0FBQzt3QkFDVixVQUFVLEVBQUUsTUFBTTtxQkFDbkI7Ozs7O3FDQUpEO0tBRUE7Ozs7OztBQ0ZBO1FBSU0sSUFBSSxHQUFHO0lBQ2IsQ0FBQzs7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