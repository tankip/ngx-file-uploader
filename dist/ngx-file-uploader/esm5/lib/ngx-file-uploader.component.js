/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/** @type {?} */
var noop = function () {
};
var ɵ0 = noop;
var NgxFileUploaderComponent = /** @class */ (function () {
    function NgxFileUploaderComponent() {
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
        { type: Component, args: [{
                    selector: 'file-uploader',
                    template: "<div>\n    <div class=\"input-group\">\n      <input type=\"text\" class=\"form-control\" readonly [(ngModel)]=\"value\">\n      <div class=\"input-group-btn\">\n  \n        <div class=\"btn btn-default image-preview-input\">\n          <span class=\"glyphicon glyphicon-folder-open\"></span>\n          <span class=\"image-preview-input-title\">Take Photo / Select File</span>\n          <input type=\"file\" onclick=\"value = null\" accept=\"image/png, image/jpeg, image/gif\" (blur)=\"onBlur()\" name=\"input-file-preview\" (change)=\"onChange($event)\"\n          />\n        </div>\n        <button *ngIf=\"value\" type=\"button\"  (click)=\"clear()\" class=\"btn btn-default image-preview-clear\">\n                          <span class=\"glyphicon glyphicon-remove\"></span> Clear\n      </button>\n      </div>\n    </div>\n  </div>",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return NgxFileUploaderComponent; }), multi: true
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
    return NgxFileUploaderComponent;
}());
export { NgxFileUploaderComponent };
if (false) {
    /** @type {?} */
    NgxFileUploaderComponent.prototype.source;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.fileChanged;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.onClear;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZpbGUtdXBsb2FkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZpbGUtdXBsb2FkZXItbGliLyIsInNvdXJjZXMiOlsibGliL25neC1maWxlLXVwbG9hZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQ25ELE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7SUFDbkUsSUFBSSxHQUFHO0FBQ2IsQ0FBQzs7QUFFRDtJQUFBO1FBYW1CLGdCQUFXLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDcEQsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTFELGNBQVMsR0FBRyxLQUFLLENBQUM7O1FBRWpCLGVBQVUsR0FBUSxFQUFFLENBQUM7OztRQUlyQixzQkFBaUIsR0FBZSxJQUFJLENBQUM7UUFDckMscUJBQWdCLEdBQXFCLElBQUksQ0FBQztJQThEcEQsQ0FBQztJQTNEQyxzQkFBSSwyQ0FBSztRQURULGVBQWU7Ozs7OztRQUNmO1lBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3pCLENBQUM7UUFFRCxvREFBb0Q7Ozs7Ozs7UUFDcEQsVUFBVSxDQUFNO1lBQ2QsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMxQjtRQUNILENBQUM7OztPQVJBO0lBU0QsdUJBQXVCOzs7Ozs7SUFFaEIsNkNBQVU7Ozs7OztJQUFqQixVQUFrQixLQUFVO1FBQzFCLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQztJQUNILENBQUM7SUFFRCxzQ0FBc0M7Ozs7OztJQUMvQixtREFBZ0I7Ozs7OztJQUF2QixVQUF3QixFQUFPO1FBQzdCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELHNDQUFzQzs7Ozs7O0lBQy9CLG9EQUFpQjs7Ozs7O0lBQXhCLFVBQXlCLEVBQU87UUFDOUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztJQUM5QixDQUFDOzs7O0lBR00seUNBQU07OztJQUFiO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFFTSwyQ0FBUTs7OztJQUFmLFVBQWdCLEtBQVU7UUFBMUIsaUJBaUJDOztZQWhCTyxLQUFLLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLO1FBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDOztZQUNoQixVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQzs7WUFFckIsVUFBVSxHQUFHLElBQUksVUFBVSxFQUFFO1FBQ25DLFVBQVUsQ0FBQyxNQUFNLEdBQUcsVUFBQyxlQUFlOztnQkFDNUIsSUFBSSxHQUFHLFVBQVUsQ0FBQyxNQUFNOztnQkFDeEIsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztnQkFDOUYsT0FBTyxHQUFHO2dCQUNkLElBQUksTUFBQTtnQkFDSixTQUFTLEVBQUUsUUFBUTthQUNwQjtZQUNELEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQztRQUVGLFVBQVUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7OztJQUVNLHdDQUFLOzs7SUFBWjtRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDOztnQkFwRkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUV6QixvMUJBQWlEO29CQUNqRCxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsd0JBQXdCLEVBQXhCLENBQXdCLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSTt5QkFDckU7cUJBQ0Y7O2lCQUNGOzs7eUJBRUUsS0FBSzs4QkFDTCxNQUFNOzBCQUNOLE1BQU07O0lBdUVULCtCQUFDO0NBQUEsQUFyRkQsSUFxRkM7U0ExRVksd0JBQXdCOzs7SUFDbkMsMENBQTRCOztJQUM1QiwrQ0FBcUU7O0lBQ3JFLDJDQUFpRTs7SUFDakUsOENBQTBCOztJQUMxQiw2Q0FBeUI7O0lBRXpCLDhDQUE2Qjs7SUFJN0IscURBQTZDOztJQUM3QyxvREFBa0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmaWxlLXVwbG9hZGVyJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmd4LWZpbGUtdXBsb2FkZXIuY29tcG9uZW50LmNzcyddLFxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LWZpbGUtdXBsb2FkZXIuY29tcG9uZW50Lmh0bWwnLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neEZpbGVVcGxvYWRlckNvbXBvbmVudCksIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neEZpbGVVcGxvYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQElucHV0KCkgcHVibGljIHNvdXJjZTogYW55O1xuICBAT3V0cHV0KCkgcHVibGljIGZpbGVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvbkNsZWFyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHVibGljIF9pbWFnZVBhdGg6IHN0cmluZztcbiAgcHVibGljIHVwbG9hZGluZyA9IGZhbHNlO1xuICAvLyBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueSA9ICcnO1xuXG4gIC8vIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZXNkXG4gIC8vIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIC8vIGdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gc2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cbiAgLy8gQ3VycmVudCB0aW1lIHN0cmluZy5cblxuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG4gIFxuXG4gIHB1YmxpYyBvbkJsdXIoKSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICB9XG5cbiAgcHVibGljIG9uQ2hhbmdlKGV2ZW50OiBhbnkpIHtcbiAgICBjb25zdCBmaWxlcyA9IGV2ZW50LnNyY0VsZW1lbnQuZmlsZXM7XG4gICAgdGhpcy51cGxvYWRpbmcgPSB0cnVlO1xuICAgIGNvbnN0IGZpbGVUb0xvYWQgPSBmaWxlc1swXTtcblxuICAgIGNvbnN0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIGZpbGVSZWFkZXIub25sb2FkID0gKGZpbGVMb2FkZWRFdmVudCkgPT4ge1xuICAgICAgY29uc3QgZGF0YSA9IGZpbGVSZWFkZXIucmVzdWx0O1xuICAgICAgY29uc3QgZmlsZVR5cGUgPSBkYXRhLnRvU3RyaW5nKCkuc3Vic3RyaW5nKCdkYXRhOmltYWdlLycubGVuZ3RoLCBkYXRhLnRvU3RyaW5nKCkuaW5kZXhPZignO2Jhc2U2NCcpKTtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgIGRhdGEsXG4gICAgICAgIGV4dGVuc2lvbjogZmlsZVR5cGVcbiAgICAgIH07XG4gICAgICB0aGlzLmZpbGVDaGFuZ2VkLmVtaXQocGF5bG9hZCk7XG4gICAgfTtcblxuICAgIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlVG9Mb2FkKTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhcigpIHtcbiAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgdGhpcy5vbkNsZWFyLmVtaXQoKTtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy52YWx1ZSk7XG4gIH1cbn0iXX0=