import { Injectable, NgModule, Component, Input, forwardRef, Output, EventEmitter, defineInjectable } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgxFileUploaderService {
    constructor() { }
}
NgxFileUploaderService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NgxFileUploaderService.ctorParameters = () => [];
/** @nocollapse */ NgxFileUploaderService.ngInjectableDef = defineInjectable({ factory: function NgxFileUploaderService_Factory() { return new NgxFileUploaderService(); }, token: NgxFileUploaderService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
const noop = () => {
};
class NgxFileUploaderComponent {
    constructor() {
        this.fileChanged = new EventEmitter();
        this.onClear = new EventEmitter();
        this.uploading = false;
        // The internal data model
        this.innerValue = '';
        // Placeholders for the callbacks which are later providesd
        // by the Control Value Accessor
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    // get accessor
    /**
     * @return {?}
     */
    get value() {
        return this.innerValue;
    }
    // set accessor including call the onchange callback
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }
    // Current time string.
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
            this.onChangeCallback(this.value);
        }
    }
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @return {?}
     */
    onBlur() {
        this.onTouchedCallback();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onChange(event) {
        /** @type {?} */
        const files = event.srcElement.files;
        this.uploading = true;
        /** @type {?} */
        const fileToLoad = files[0];
        /** @type {?} */
        const fileReader = new FileReader();
        fileReader.onload = (fileLoadedEvent) => {
            /** @type {?} */
            const data = fileReader.result;
            /** @type {?} */
            const fileType = data.toString().substring('data:image/'.length, data.toString().indexOf(';base64'));
            /** @type {?} */
            const payload = {
                data,
                extension: fileType
            };
            this.fileChanged.emit(payload);
        };
        fileReader.readAsDataURL(fileToLoad);
    }
    /**
     * @return {?}
     */
    clear() {
        this.value = '';
        this.onClear.emit();
        this.onChangeCallback(this.value);
    }
}
NgxFileUploaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'file-uploader',
                template: "<div>\n    <div class=\"input-group\">\n      <input type=\"text\" class=\"form-control\" readonly [(ngModel)]=\"value\">\n      <div class=\"input-group-btn\">\n  \n        <div class=\"btn btn-default image-preview-input\">\n          <span class=\"glyphicon glyphicon-folder-open\"></span>\n          <span class=\"image-preview-input-title\">Take Photo / Select File</span>\n          <input type=\"file\" onclick=\"value = null\" accept=\"image/png, image/jpeg, image/gif , application/pdf\" (blur)=\"onBlur()\" name=\"input-file-preview\" (change)=\"onChange($event)\"\n          />\n        </div>\n        <button *ngIf=\"value\" type=\"button\"  (click)=\"clear()\" class=\"btn btn-default image-preview-clear\">\n                          <span class=\"glyphicon glyphicon-remove\"></span> Clear\n      </button>\n      </div>\n    </div>\n  </div>",
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => NgxFileUploaderComponent), multi: true
                    }
                ],
                styles: [".btn-file{position:relative;overflow:hidden}.btn-file input[type=file]{position:absolute;top:0;right:0;min-width:100%;min-height:100%;font-size:100px;text-align:right;opacity:0;outline:0;background:#fff;cursor:inherit;display:block}#img-upload{width:100%}.image-preview-input input[type=file]{position:absolute;top:0;right:0;margin:0;padding:0;font-size:20px;cursor:pointer;opacity:0}"]
            }] }
];
NgxFileUploaderComponent.propDecorators = {
    source: [{ type: Input }],
    fileChanged: [{ type: Output }],
    onClear: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgxFileUploaderModule {
}
NgxFileUploaderModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule, FormsModule
                ],
                declarations: [NgxFileUploaderComponent],
                exports: [NgxFileUploaderComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

export { NgxFileUploaderService, NgxFileUploaderComponent, NgxFileUploaderModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZpbGUtdXBsb2FkZXIuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC1maWxlLXVwbG9hZGVyL2xpYi9uZ3gtZmlsZS11cGxvYWRlci5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtZmlsZS11cGxvYWRlci9saWIvbmd4LWZpbGUtdXBsb2FkZXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtZmlsZS11cGxvYWRlci9saWIvbmd4LWZpbGUtdXBsb2FkZXIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4RmlsZVVwbG9hZGVyU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ZpbGUtdXBsb2FkZXInLFxuICBzdHlsZVVybHM6IFsnLi9uZ3gtZmlsZS11cGxvYWRlci5jb21wb25lbnQuY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtZmlsZS11cGxvYWRlci5jb21wb25lbnQuaHRtbCcsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmd4RmlsZVVwbG9hZGVyQ29tcG9uZW50KSwgbXVsdGk6IHRydWVcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4RmlsZVVwbG9hZGVyQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBASW5wdXQoKSBwdWJsaWMgc291cmNlOiBhbnk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgZmlsZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9uQ2xlYXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwdWJsaWMgX2ltYWdlUGF0aDogc3RyaW5nO1xuICBwdWJsaWMgdXBsb2FkaW5nID0gZmFsc2U7XG4gIC8vIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55ID0gJyc7XG5cbiAgLy8gUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlc2RcbiAgLy8gYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgLy8gZ2V0IGFjY2Vzc29yXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICAvLyBzZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuICAvLyBDdXJyZW50IHRpbWUgc3RyaW5nLlxuXG4gIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cbiAgXG5cbiAgcHVibGljIG9uQmx1cigpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gIH1cblxuICBwdWJsaWMgb25DaGFuZ2UoZXZlbnQ6IGFueSkge1xuICAgIGNvbnN0IGZpbGVzID0gZXZlbnQuc3JjRWxlbWVudC5maWxlcztcbiAgICB0aGlzLnVwbG9hZGluZyA9IHRydWU7XG4gICAgY29uc3QgZmlsZVRvTG9hZCA9IGZpbGVzWzBdO1xuXG4gICAgY29uc3QgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgZmlsZVJlYWRlci5vbmxvYWQgPSAoZmlsZUxvYWRlZEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBkYXRhID0gZmlsZVJlYWRlci5yZXN1bHQ7XG4gICAgICBjb25zdCBmaWxlVHlwZSA9IGRhdGEudG9TdHJpbmcoKS5zdWJzdHJpbmcoJ2RhdGE6aW1hZ2UvJy5sZW5ndGgsIGRhdGEudG9TdHJpbmcoKS5pbmRleE9mKCc7YmFzZTY0JykpO1xuICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgZGF0YSxcbiAgICAgICAgZXh0ZW5zaW9uOiBmaWxlVHlwZVxuICAgICAgfTtcbiAgICAgIHRoaXMuZmlsZUNoYW5nZWQuZW1pdChwYXlsb2FkKTtcbiAgICB9O1xuXG4gICAgZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGVUb0xvYWQpO1xuICB9XG5cbiAgcHVibGljIGNsZWFyKCkge1xuICAgIHRoaXMudmFsdWUgPSAnJztcbiAgICB0aGlzLm9uQ2xlYXIuZW1pdCgpO1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLnZhbHVlKTtcbiAgfVxufSIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IE5neEZpbGVVcGxvYWRlckNvbXBvbmVudCB9IGZyb20gJy4vbmd4LWZpbGUtdXBsb2FkZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxGb3Jtc01vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtOZ3hGaWxlVXBsb2FkZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbTmd4RmlsZVVwbG9hZGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hGaWxlVXBsb2FkZXJNb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxNQUthLHNCQUFzQjtJQUVqQyxpQkFBaUI7OztZQUxsQixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7Ozs7Ozs7QUNKRDtNQUlNLElBQUksR0FBRztDQUNaO01BYVksd0JBQXdCO0lBWHJDO1FBYW1CLGdCQUFXLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDcEQsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTFELGNBQVMsR0FBRyxLQUFLLENBQUM7O1FBRWpCLGVBQVUsR0FBUSxFQUFF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