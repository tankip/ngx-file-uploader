import { Injectable, NgModule, Component, Input, forwardRef, Output, EventEmitter, ViewEncapsulation, defineInjectable } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
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
NgxFileUploaderService.ctorParameters = () => [];
/** @nocollapse */ NgxFileUploaderService.ngInjectableDef = defineInjectable({ factory: function NgxFileUploaderService_Factory() { return new NgxFileUploaderService(); }, token: NgxFileUploaderService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
const noop = () => {
    // placeholder call backs
};
class NgxFileUploaderComponent {
    constructor() {
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
    ngOnInit() {
        if (this.singleFile) {
            this.multiple = false;
        }
        if (window.screen.width <= 692) {
            this.mobile = true;
        }
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
        // const fileToLoad = files;
        if (files) {
            for (const file of files) {
                /** @type {?} */
                const fileReader = new FileReader();
                fileReader.onload = (fileLoadedEvent) => {
                    /** @type {?} */
                    const data = fileReader.result;
                    /** @type {?} */
                    const name = file.name;
                    /** @type {?} */
                    const fileSize = Math.round(file.size / 1024);
                    /** @type {?} */
                    const payload = {
                        data,
                        id: this.urls.length + 1,
                        name: name,
                        size: fileSize
                    };
                    if (!this.singleFile) {
                        this.urls.push(payload);
                        this.fileList.push(payload);
                    }
                    else {
                        this.fileChanged.emit(payload);
                        this.back();
                    }
                };
                fileReader.readAsDataURL(file);
            }
        }
    }
    /**
     * @return {?}
     */
    clear() {
        this.value = '';
        this.onChangeCallback(this.value);
        this.urls = [];
        this.back();
        this._onClear.emit();
    }
    /**
     * @return {?}
     */
    back() {
        this.selectFileType = true;
        this.urls = [];
        this.backButton = false;
        this.fileList = [];
        this.UploadCaptions = false;
        this.fileUpload = false;
        this.liveCamera.emit();
    }
    /**
     * @param {?} filetype
     * @return {?}
     */
    toggleVisibility(filetype) {
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
    }
    /**
     * @return {?}
     */
    upload() {
        this.uploadData.emit(this.fileList);
        this.back();
    }
    /**
     * @return {?}
     */
    MergeImages() {
        /** @type {?} */
        const doc = new jsPDF();
        doc.page = 1;
        for (let i = 0; i < this.fileList.length; i++) {
            /** @type {?} */
            const imageData = this.fileList[i].data || this.fileList[i].imageAsDataUrl;
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
        const data = doc.output('datauristring');
        /** @type {?} */
        const payload = {
            data,
        };
        this.fileList.push(payload);
        this.urls.push(payload);
        doc.output('dataurlnewwindow');
        // doc.save('Test.pdf');
    }
    /**
     * @param {?} urls
     * @return {?}
     */
    delete(urls) {
        for (let i = 0; i <= this.urls.length; i++) {
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
    }
}
NgxFileUploaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'file-uploader',
                template: `<div *ngIf="backButton">
  <button class="btn btn-default image-preview-clear" type="button" (click)="back()">
    <span class="glyphicon glyphicon-circle-arrow-left"></span> Back
  </button>
</div>
<div *ngIf="selectFileType" class="panel panel-primary">
  <div class="panel-heading">UPLOAD FILE TYPE</div>
  <div class="panel-body">
    <div class="row-cb">
      <span><input name="image" id="ima" (change)="toggleVisibility('image')" type="checkbox" /></span>
      <label for="ima">Image</label>

      <div class="clear-both"></div>
    </div>
    <div class="row-cb">
      <span><input name="option" id="pdf" (change)="toggleVisibility('pdf')" type="checkbox" /></span>
      <label for="pdf">PDF</label>

      <div class="clear-both"></div>
    </div>
    <div *ngIf="!singleFile" class="row-cb">
      <span><input name="option" id="both" (change)="toggleVisibility('both')" type="checkbox" /></span>
      <label for="both">Image & PDF</label>

      <div class="clear-both"></div>
    </div>
    <div class="row-cb">
      <span><input name="camera" id="camera" (change)="toggleVisibility('liveCamera')" type="checkbox" /></span>
      <label for="camera">Live Camera</label>

      <div class="clear-both"></div>
    </div>
  </div>
</div>
<div style="display: block;">
  <div style="display: inline-block;" *ngFor="let url of urls;let i=index">
    <a class="columne" id="caption">
      <img style=" border: 1px solid rgb(97, 97, 97); margin: 2px; border-radius: 4px;padding: 5px;" id="img{{i}}"
        [src]="url.data || url.imageAsDataUrl"
        onError="this.onerror=null;this.src='59e6d5338faf193392f1bf9f89f4513dc548bd68.png | secure';"
        class="rounded mb-3" width="90" height="200">
      <div class="text">
        <h2 title="Click to Delete File {{url.name}}" (click)="delete(url)"
          style="color: rgb(255, 255, 255); font-family: fantasy;"><span class="glyphicon glyphicon-trash"></span>REMOVE
        </h2>
      </div>
    </a>
  </div>
  <button *ngIf="UploadCaptions" type="button" (click)="upload()" class="button">
    <span class="glyphicon glyphicon-upload"></span> Upload Files
  </button>
  <button *ngIf="!pdfAvailable && fileUpload || liveCamera" type="button" [disabled]="!urls[1]" (click)="MergeImages()"
    title="merge the images as pages in one pdf document" class="btn btn-default image-preview-clear">
    <span class="glyphicon glyphicon-upload"></span> Merge
  </button>
</div>
<div *ngIf="fileUpload">

  <div class="input-group">
    <input type="text" class="form-control" readonly [(ngModel)]="value">
    <div class="input-group-btn">

      <div class="btn btn-default image-preview-input">
        <span class="glyphicon glyphicon-folder-open"></span>
        <span class="image-preview-input-title">SELECT FILE</span>
        <input *ngIf="multiple" type="file" multiple accept="{{fileType}}" (blur)="onBlur()" name="input-file-preview"
          (change)="onChange($event)" />
        <input *ngIf="!multiple" type="file" accept="{{fileType}}" (blur)="onBlur()" name="input-file-preview"
          (change)="onChange($event)" />
        <!-- rename it -->
      </div>
      <button *ngIf="value" type="button" (click)="clear()" class="btn btn-default image-preview-clear">
        <span class="glyphicon glyphicon-remove"></span> Clear
      </button>
      <button *ngIf="multiple" type="button" (click)="upload()" class="button">
        <span class="glyphicon glyphicon-upload"></span> Upload
      </button>
    </div>
  </div>
  <div *ngIf="!mobile" class="image-upload-wrap">
    <input *ngIf="multiple" class="file-upload-input" type='file' (change)="onChange($event)" multiple
      accept="{{fileType}}" />
    <input *ngIf="!multiple" class="file-upload-input" type='file' (change)="onChange($event)" accept="{{fileType}}" />
    <div class="drag-text">
      <h3>Drag and Drop file(s)</h3>
    </div>
  </div>
</div>`,
                encapsulation: ViewEncapsulation.Native,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        // tslint:disable-next-line:no-forward-ref
                        useExisting: forwardRef(() => NgxFileUploaderComponent), multi: true
                    }
                ],
                styles: [`.btn-file{position:relative;overflow:hidden}.btn-file input[type=file]{position:absolute;top:0;right:0;min-width:100%;min-height:100%;font-size:100px;text-align:right;opacity:0;outline:0;background:#fff;cursor:inherit;display:block}#img-upload{width:100%}.image-preview-input input[type=file]{position:absolute;top:0;right:0;margin:0;padding:0;font-size:20px;cursor:pointer;opacity:0}.file-upload{background-color:#fff;width:600px;margin:0 auto;padding:20px}.file-upload-btn{width:100%;margin:0;color:#fff;background:#1fb264;border:none;padding:10px;border-radius:4px;border-bottom:4px solid #15824b;transition:.2s;outline:0;text-transform:uppercase;font-weight:700}ul{list-style-type:none;margin:0;padding:0}.file-upload-btn:hover{background:#1aa059;color:#fff;transition:.2s;cursor:pointer}.file-upload-btn:active{border:0;transition:.2s}.file-upload-content{display:none;text-align:center}.file-upload-input{position:absolute;margin:0;padding:0;width:100%;height:100%;outline:0;opacity:0;cursor:pointer}.image-upload-wrap{margin-top:20px;border:4px dashed #3683c7;position:relative}.image-dropping,.image-upload-wrap:hover{background-color:#337ab7;border:4px dashed #fff}.image-title-wrap{padding:0 15px 15px;color:#222}.drag-text{text-align:center}.drag-text h3{font-weight:100;text-transform:uppercase;color:#155a82;padding:60px 0}.file-upload-image{max-height:200px;max-width:200px;margin:auto;padding:20px}.button{display:inline-block;padding:6px 12px;margin-bottom:0;font-size:14px;font-weight:400;line-height:1.42857143;text-align:center;white-space:nowrap;vertical-align:middle;touch-action:manipulation;cursor:pointer;background-color:#004a7f;border:none;color:#fff;text-decoration:none;-webkit-animation:1.5s infinite glowing;animation:1.5s infinite glowing}@-webkit-keyframes glowing{0%{background-color:#002fb2;-webkit-box-shadow:0 0 3px #005cb2}50%{background-color:#203864;-webkit-box-shadow:0 0 40px #203864}100%{background-color:#005cb2;-webkit-box-shadow:0 0 3px #005cb2}}@keyframes glowing{0%,100%{background-color:#005cb2;box-shadow:0 0 3px #005cb2}50%{background-color:#203864;box-shadow:0 0 40px #203864}}.actionBtn{margin-top:5px;margin-bottom:2px;font-size:1.2em}label{display:inline-block;max-width:100%;margin-bottom:5px;font-weight:700;margin-right:10px}.row-cb{margin:auto;font-size:15px}.row-cb label{float:left}.row-cb span{float:left;text-align:left}.snapshot{text-align:center}.snapshot img{max-width:800px;max-height:800px}.columne#caption .text h1{margin:0;color:#fff}.columne#caption:hover .text{opacity:1;cursor:pointer;opacity:1}.columne#caption{position:relative}.columne#caption .text{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);z-index:10;opacity:0;transition:.8s}.columne#caption:hover img{-webkit-filter:sepia(90%)}@media (max-width:629px){.file-upload-input{display:none!important}}`]
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZpbGUtdXBsb2FkZXIuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC1maWxlLXVwbG9hZGVyL2xpYi9uZ3gtZmlsZS11cGxvYWRlci5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtZmlsZS11cGxvYWRlci9saWIvbmd4LWZpbGUtdXBsb2FkZXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtZmlsZS11cGxvYWRlci9saWIvbmd4LWZpbGUtdXBsb2FkZXIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4RmlsZVVwbG9hZGVyU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZixcbiAgT25DaGFuZ2VzLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgw4nCtUNvbnNvbGUsIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuLy8gaW1wb3J0ICogYXMgcGRmTWFrZSBmcm9tICdwZGZtYWtlL2J1aWxkL3BkZm1ha2UnO1xuaW1wb3J0IGpzUERGIGZyb20gJ2pzcGRmJztcblxuXG5jb25zdCBub29wID0gKCkgPT4ge1xuICAvLyBwbGFjZWhvbGRlciBjYWxsIGJhY2tzXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmaWxlLXVwbG9hZGVyJyxcbiAgc3R5bGVzOiBbYC5idG4tZmlsZXtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW59LmJ0bi1maWxlIGlucHV0W3R5cGU9ZmlsZV17cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7cmlnaHQ6MDttaW4td2lkdGg6MTAwJTttaW4taGVpZ2h0OjEwMCU7Zm9udC1zaXplOjEwMHB4O3RleHQtYWxpZ246cmlnaHQ7b3BhY2l0eTowO291dGxpbmU6MDtiYWNrZ3JvdW5kOiNmZmY7Y3Vyc29yOmluaGVyaXQ7ZGlzcGxheTpibG9ja30jaW1nLXVwbG9hZHt3aWR0aDoxMDAlfS5pbWFnZS1wcmV2aWV3LWlucHV0IGlucHV0W3R5cGU9ZmlsZV17cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7cmlnaHQ6MDttYXJnaW46MDtwYWRkaW5nOjA7Zm9udC1zaXplOjIwcHg7Y3Vyc29yOnBvaW50ZXI7b3BhY2l0eTowfS5maWxlLXVwbG9hZHtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7d2lkdGg6NjAwcHg7bWFyZ2luOjAgYXV0bztwYWRkaW5nOjIwcHh9LmZpbGUtdXBsb2FkLWJ0bnt3aWR0aDoxMDAlO21hcmdpbjowO2NvbG9yOiNmZmY7YmFja2dyb3VuZDojMWZiMjY0O2JvcmRlcjpub25lO3BhZGRpbmc6MTBweDtib3JkZXItcmFkaXVzOjRweDtib3JkZXItYm90dG9tOjRweCBzb2xpZCAjMTU4MjRiO3RyYW5zaXRpb246LjJzO291dGxpbmU6MDt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7Zm9udC13ZWlnaHQ6NzAwfXVse2xpc3Qtc3R5bGUtdHlwZTpub25lO21hcmdpbjowO3BhZGRpbmc6MH0uZmlsZS11cGxvYWQtYnRuOmhvdmVye2JhY2tncm91bmQ6IzFhYTA1OTtjb2xvcjojZmZmO3RyYW5zaXRpb246LjJzO2N1cnNvcjpwb2ludGVyfS5maWxlLXVwbG9hZC1idG46YWN0aXZle2JvcmRlcjowO3RyYW5zaXRpb246LjJzfS5maWxlLXVwbG9hZC1jb250ZW50e2Rpc3BsYXk6bm9uZTt0ZXh0LWFsaWduOmNlbnRlcn0uZmlsZS11cGxvYWQtaW5wdXR7cG9zaXRpb246YWJzb2x1dGU7bWFyZ2luOjA7cGFkZGluZzowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7b3V0bGluZTowO29wYWNpdHk6MDtjdXJzb3I6cG9pbnRlcn0uaW1hZ2UtdXBsb2FkLXdyYXB7bWFyZ2luLXRvcDoyMHB4O2JvcmRlcjo0cHggZGFzaGVkICMzNjgzYzc7cG9zaXRpb246cmVsYXRpdmV9LmltYWdlLWRyb3BwaW5nLC5pbWFnZS11cGxvYWQtd3JhcDpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiMzMzdhYjc7Ym9yZGVyOjRweCBkYXNoZWQgI2ZmZn0uaW1hZ2UtdGl0bGUtd3JhcHtwYWRkaW5nOjAgMTVweCAxNXB4O2NvbG9yOiMyMjJ9LmRyYWctdGV4dHt0ZXh0LWFsaWduOmNlbnRlcn0uZHJhZy10ZXh0IGgze2ZvbnQtd2VpZ2h0OjEwMDt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7Y29sb3I6IzE1NWE4MjtwYWRkaW5nOjYwcHggMH0uZmlsZS11cGxvYWQtaW1hZ2V7bWF4LWhlaWdodDoyMDBweDttYXgtd2lkdGg6MjAwcHg7bWFyZ2luOmF1dG87cGFkZGluZzoyMHB4fS5idXR0b257ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzo2cHggMTJweDttYXJnaW4tYm90dG9tOjA7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NDAwO2xpbmUtaGVpZ2h0OjEuNDI4NTcxNDM7dGV4dC1hbGlnbjpjZW50ZXI7d2hpdGUtc3BhY2U6bm93cmFwO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTt0b3VjaC1hY3Rpb246bWFuaXB1bGF0aW9uO2N1cnNvcjpwb2ludGVyO2JhY2tncm91bmQtY29sb3I6IzAwNGE3Zjtib3JkZXI6bm9uZTtjb2xvcjojZmZmO3RleHQtZGVjb3JhdGlvbjpub25lOy13ZWJraXQtYW5pbWF0aW9uOjEuNXMgaW5maW5pdGUgZ2xvd2luZzthbmltYXRpb246MS41cyBpbmZpbml0ZSBnbG93aW5nfUAtd2Via2l0LWtleWZyYW1lcyBnbG93aW5nezAle2JhY2tncm91bmQtY29sb3I6IzAwMmZiMjstd2Via2l0LWJveC1zaGFkb3c6MCAwIDNweCAjMDA1Y2IyfTUwJXtiYWNrZ3JvdW5kLWNvbG9yOiMyMDM4NjQ7LXdlYmtpdC1ib3gtc2hhZG93OjAgMCA0MHB4ICMyMDM4NjR9MTAwJXtiYWNrZ3JvdW5kLWNvbG9yOiMwMDVjYjI7LXdlYmtpdC1ib3gtc2hhZG93OjAgMCAzcHggIzAwNWNiMn19QGtleWZyYW1lcyBnbG93aW5nezAlLDEwMCV7YmFja2dyb3VuZC1jb2xvcjojMDA1Y2IyO2JveC1zaGFkb3c6MCAwIDNweCAjMDA1Y2IyfTUwJXtiYWNrZ3JvdW5kLWNvbG9yOiMyMDM4NjQ7Ym94LXNoYWRvdzowIDAgNDBweCAjMjAzODY0fX0uYWN0aW9uQnRue21hcmdpbi10b3A6NXB4O21hcmdpbi1ib3R0b206MnB4O2ZvbnQtc2l6ZToxLjJlbX1sYWJlbHtkaXNwbGF5OmlubGluZS1ibG9jazttYXgtd2lkdGg6MTAwJTttYXJnaW4tYm90dG9tOjVweDtmb250LXdlaWdodDo3MDA7bWFyZ2luLXJpZ2h0OjEwcHh9LnJvdy1jYnttYXJnaW46YXV0bztmb250LXNpemU6MTVweH0ucm93LWNiIGxhYmVse2Zsb2F0OmxlZnR9LnJvdy1jYiBzcGFue2Zsb2F0OmxlZnQ7dGV4dC1hbGlnbjpsZWZ0fS5zbmFwc2hvdHt0ZXh0LWFsaWduOmNlbnRlcn0uc25hcHNob3QgaW1ne21heC13aWR0aDo4MDBweDttYXgtaGVpZ2h0OjgwMHB4fS5jb2x1bW5lI2NhcHRpb24gLnRleHQgaDF7bWFyZ2luOjA7Y29sb3I6I2ZmZn0uY29sdW1uZSNjYXB0aW9uOmhvdmVyIC50ZXh0e29wYWNpdHk6MTtjdXJzb3I6cG9pbnRlcjtvcGFjaXR5OjF9LmNvbHVtbmUjY2FwdGlvbntwb3NpdGlvbjpyZWxhdGl2ZX0uY29sdW1uZSNjYXB0aW9uIC50ZXh0e3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO3otaW5kZXg6MTA7b3BhY2l0eTowO3RyYW5zaXRpb246LjhzfS5jb2x1bW5lI2NhcHRpb246aG92ZXIgaW1ney13ZWJraXQtZmlsdGVyOnNlcGlhKDkwJSl9QG1lZGlhIChtYXgtd2lkdGg6NjI5cHgpey5maWxlLXVwbG9hZC1pbnB1dHtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1gXSxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiYmFja0J1dHRvblwiPlxuICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGltYWdlLXByZXZpZXctY2xlYXJcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImJhY2soKVwiPlxuICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1jaXJjbGUtYXJyb3ctbGVmdFwiPjwvc3Bhbj4gQmFja1xuICA8L2J1dHRvbj5cbjwvZGl2PlxuPGRpdiAqbmdJZj1cInNlbGVjdEZpbGVUeXBlXCIgY2xhc3M9XCJwYW5lbCBwYW5lbC1wcmltYXJ5XCI+XG4gIDxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkaW5nXCI+VVBMT0FEIEZJTEUgVFlQRTwvZGl2PlxuICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPlxuICAgIDxkaXYgY2xhc3M9XCJyb3ctY2JcIj5cbiAgICAgIDxzcGFuPjxpbnB1dCBuYW1lPVwiaW1hZ2VcIiBpZD1cImltYVwiIChjaGFuZ2UpPVwidG9nZ2xlVmlzaWJpbGl0eSgnaW1hZ2UnKVwiIHR5cGU9XCJjaGVja2JveFwiIC8+PC9zcGFuPlxuICAgICAgPGxhYmVsIGZvcj1cImltYVwiPkltYWdlPC9sYWJlbD5cblxuICAgICAgPGRpdiBjbGFzcz1cImNsZWFyLWJvdGhcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicm93LWNiXCI+XG4gICAgICA8c3Bhbj48aW5wdXQgbmFtZT1cIm9wdGlvblwiIGlkPVwicGRmXCIgKGNoYW5nZSk9XCJ0b2dnbGVWaXNpYmlsaXR5KCdwZGYnKVwiIHR5cGU9XCJjaGVja2JveFwiIC8+PC9zcGFuPlxuICAgICAgPGxhYmVsIGZvcj1cInBkZlwiPlBERjwvbGFiZWw+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJjbGVhci1ib3RoXCI+PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiAqbmdJZj1cIiFzaW5nbGVGaWxlXCIgY2xhc3M9XCJyb3ctY2JcIj5cbiAgICAgIDxzcGFuPjxpbnB1dCBuYW1lPVwib3B0aW9uXCIgaWQ9XCJib3RoXCIgKGNoYW5nZSk9XCJ0b2dnbGVWaXNpYmlsaXR5KCdib3RoJylcIiB0eXBlPVwiY2hlY2tib3hcIiAvPjwvc3Bhbj5cbiAgICAgIDxsYWJlbCBmb3I9XCJib3RoXCI+SW1hZ2UgJiBQREY8L2xhYmVsPlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiY2xlYXItYm90aFwiPjwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJyb3ctY2JcIj5cbiAgICAgIDxzcGFuPjxpbnB1dCBuYW1lPVwiY2FtZXJhXCIgaWQ9XCJjYW1lcmFcIiAoY2hhbmdlKT1cInRvZ2dsZVZpc2liaWxpdHkoJ2xpdmVDYW1lcmEnKVwiIHR5cGU9XCJjaGVja2JveFwiIC8+PC9zcGFuPlxuICAgICAgPGxhYmVsIGZvcj1cImNhbWVyYVwiPkxpdmUgQ2FtZXJhPC9sYWJlbD5cblxuICAgICAgPGRpdiBjbGFzcz1cImNsZWFyLWJvdGhcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbjxkaXYgc3R5bGU9XCJkaXNwbGF5OiBibG9jaztcIj5cbiAgPGRpdiBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9jaztcIiAqbmdGb3I9XCJsZXQgdXJsIG9mIHVybHM7bGV0IGk9aW5kZXhcIj5cbiAgICA8YSBjbGFzcz1cImNvbHVtbmVcIiBpZD1cImNhcHRpb25cIj5cbiAgICAgIDxpbWcgc3R5bGU9XCIgYm9yZGVyOiAxcHggc29saWQgcmdiKDk3LCA5NywgOTcpOyBtYXJnaW46IDJweDsgYm9yZGVyLXJhZGl1czogNHB4O3BhZGRpbmc6IDVweDtcIiBpZD1cImltZ3t7aX19XCJcbiAgICAgICAgW3NyY109XCJ1cmwuZGF0YSB8fCB1cmwuaW1hZ2VBc0RhdGFVcmxcIlxuICAgICAgICBvbkVycm9yPVwidGhpcy5vbmVycm9yPW51bGw7dGhpcy5zcmM9JzU5ZTZkNTMzOGZhZjE5MzM5MmYxYmY5Zjg5ZjQ1MTNkYzU0OGJkNjgucG5nIHwgc2VjdXJlJztcIlxuICAgICAgICBjbGFzcz1cInJvdW5kZWQgbWItM1wiIHdpZHRoPVwiOTBcIiBoZWlnaHQ9XCIyMDBcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+XG4gICAgICAgIDxoMiB0aXRsZT1cIkNsaWNrIHRvIERlbGV0ZSBGaWxlIHt7dXJsLm5hbWV9fVwiIChjbGljayk9XCJkZWxldGUodXJsKVwiXG4gICAgICAgICAgc3R5bGU9XCJjb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUpOyBmb250LWZhbWlseTogZmFudGFzeTtcIj48c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tdHJhc2hcIj48L3NwYW4+UkVNT1ZFXG4gICAgICAgIDwvaDI+XG4gICAgICA8L2Rpdj5cbiAgICA8L2E+XG4gIDwvZGl2PlxuICA8YnV0dG9uICpuZ0lmPVwiVXBsb2FkQ2FwdGlvbnNcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInVwbG9hZCgpXCIgY2xhc3M9XCJidXR0b25cIj5cbiAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tdXBsb2FkXCI+PC9zcGFuPiBVcGxvYWQgRmlsZXNcbiAgPC9idXR0b24+XG4gIDxidXR0b24gKm5nSWY9XCIhcGRmQXZhaWxhYmxlICYmIGZpbGVVcGxvYWQgfHwgbGl2ZUNhbWVyYVwiIHR5cGU9XCJidXR0b25cIiBbZGlzYWJsZWRdPVwiIXVybHNbMV1cIiAoY2xpY2spPVwiTWVyZ2VJbWFnZXMoKVwiXG4gICAgdGl0bGU9XCJtZXJnZSB0aGUgaW1hZ2VzIGFzIHBhZ2VzIGluIG9uZSBwZGYgZG9jdW1lbnRcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBpbWFnZS1wcmV2aWV3LWNsZWFyXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXVwbG9hZFwiPjwvc3Bhbj4gTWVyZ2VcbiAgPC9idXR0b24+XG48L2Rpdj5cbjxkaXYgKm5nSWY9XCJmaWxlVXBsb2FkXCI+XG5cbiAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiByZWFkb25seSBbKG5nTW9kZWwpXT1cInZhbHVlXCI+XG4gICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGltYWdlLXByZXZpZXctaW5wdXRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWZvbGRlci1vcGVuXCI+PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImltYWdlLXByZXZpZXctaW5wdXQtdGl0bGVcIj5TRUxFQ1QgRklMRTwvc3Bhbj5cbiAgICAgICAgPGlucHV0ICpuZ0lmPVwibXVsdGlwbGVcIiB0eXBlPVwiZmlsZVwiIG11bHRpcGxlIGFjY2VwdD1cInt7ZmlsZVR5cGV9fVwiIChibHVyKT1cIm9uQmx1cigpXCIgbmFtZT1cImlucHV0LWZpbGUtcHJldmlld1wiXG4gICAgICAgICAgKGNoYW5nZSk9XCJvbkNoYW5nZSgkZXZlbnQpXCIgLz5cbiAgICAgICAgPGlucHV0ICpuZ0lmPVwiIW11bHRpcGxlXCIgdHlwZT1cImZpbGVcIiBhY2NlcHQ9XCJ7e2ZpbGVUeXBlfX1cIiAoYmx1cik9XCJvbkJsdXIoKVwiIG5hbWU9XCJpbnB1dC1maWxlLXByZXZpZXdcIlxuICAgICAgICAgIChjaGFuZ2UpPVwib25DaGFuZ2UoJGV2ZW50KVwiIC8+XG4gICAgICAgIDwhLS0gcmVuYW1lIGl0IC0tPlxuICAgICAgPC9kaXY+XG4gICAgICA8YnV0dG9uICpuZ0lmPVwidmFsdWVcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNsZWFyKClcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBpbWFnZS1wcmV2aWV3LWNsZWFyXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1yZW1vdmVcIj48L3NwYW4+IENsZWFyXG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gKm5nSWY9XCJtdWx0aXBsZVwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwidXBsb2FkKClcIiBjbGFzcz1cImJ1dHRvblwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tdXBsb2FkXCI+PC9zcGFuPiBVcGxvYWRcbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiAqbmdJZj1cIiFtb2JpbGVcIiBjbGFzcz1cImltYWdlLXVwbG9hZC13cmFwXCI+XG4gICAgPGlucHV0ICpuZ0lmPVwibXVsdGlwbGVcIiBjbGFzcz1cImZpbGUtdXBsb2FkLWlucHV0XCIgdHlwZT0nZmlsZScgKGNoYW5nZSk9XCJvbkNoYW5nZSgkZXZlbnQpXCIgbXVsdGlwbGVcbiAgICAgIGFjY2VwdD1cInt7ZmlsZVR5cGV9fVwiIC8+XG4gICAgPGlucHV0ICpuZ0lmPVwiIW11bHRpcGxlXCIgY2xhc3M9XCJmaWxlLXVwbG9hZC1pbnB1dFwiIHR5cGU9J2ZpbGUnIChjaGFuZ2UpPVwib25DaGFuZ2UoJGV2ZW50KVwiIGFjY2VwdD1cInt7ZmlsZVR5cGV9fVwiIC8+XG4gICAgPGRpdiBjbGFzcz1cImRyYWctdGV4dFwiPlxuICAgICAgPGgzPkRyYWcgYW5kIERyb3AgZmlsZShzKTwvaDM+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+YCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTmF0aXZlLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mb3J3YXJkLXJlZlxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmd4RmlsZVVwbG9hZGVyQ29tcG9uZW50KSwgbXVsdGk6IHRydWVcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4RmlsZVVwbG9hZGVyQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XG4gIHB1YmxpYyB1cmxzID0gbmV3IEFycmF5PGFueT4oKTtcbiAgcHVibGljIHNlbGVjdEZpbGVUeXBlID0gdHJ1ZTtcbiAgcHVibGljIGZpbGVMaXN0ID0gbmV3IEFycmF5PGFueT4oKTtcbiAgcHVibGljIGZpbGVUeXBlOiBzdHJpbmc7XG4gIHB1YmxpYyBwZGZBdmFpbGFibGUgPSBmYWxzZTtcbiAgcHVibGljIG1vYmlsZSA9IGZhbHNlO1xuICBwdWJsaWMgVXBsb2FkQ2FwdGlvbnMgPSBmYWxzZTtcbiAgQElucHV0KCkgcHVibGljIHNpbmdsZUZpbGU6IGFueTtcbiAgcHVibGljIG11bHRpcGxlID0gdHJ1ZTtcbiAgcHVibGljIGZpbGVVcGxvYWQgPSBmYWxzZTtcbiAgcHVibGljIGJhY2tCdXR0b24gPSBmYWxzZTtcbiAgQElucHV0KCkgcHVibGljIHNvdXJjZTogYW55O1xuICBAT3V0cHV0KCkgcHVibGljIGZpbGVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCAoKSBwdWJsaWMgbGl2ZUNhbWVyYTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgdXBsb2FkRGF0YTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgX29uQ2xlYXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwdWJsaWMgX2ltYWdlUGF0aDogc3RyaW5nO1xuICBwdWJsaWMgdXBsb2FkaW5nID0gZmFsc2U7XG4gIC8vIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55ID0gJyc7XG5cbiAgLy8gUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlc2RcbiAgLy8gYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuc2luZ2xlRmlsZSkge1xuICAgICAgdGhpcy5tdWx0aXBsZSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAod2luZG93LnNjcmVlbi53aWR0aCA8PSA2OTIpIHsgLy8gNzY4cHggcG9ydHJhaXRcbiAgICAgIHRoaXMubW9iaWxlID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvLyBnZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIHNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG4gIC8vIEN1cnJlbnQgdGltZSBzdHJpbmcuXG5cbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyBvbkJsdXIoKSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICB9XG5cbiAgcHVibGljIG9uQ2hhbmdlKGV2ZW50OiBhbnkpIHtcbiAgICBjb25zdCBmaWxlcyA9IGV2ZW50LnNyY0VsZW1lbnQuZmlsZXM7XG4gICAgdGhpcy51cGxvYWRpbmcgPSB0cnVlO1xuICAgIC8vIGNvbnN0IGZpbGVUb0xvYWQgPSBmaWxlcztcblxuICAgIGlmIChmaWxlcykge1xuICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICAgIGNvbnN0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgICAgIGZpbGVSZWFkZXIub25sb2FkID0gKGZpbGVMb2FkZWRFdmVudDogYW55KSA9PiB7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IGZpbGVSZWFkZXIucmVzdWx0O1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSBmaWxlLm5hbWU7XG4gICAgICAgICAgY29uc3QgZmlsZVNpemUgPSBNYXRoLnJvdW5kKGZpbGUuc2l6ZSAvIDEwMjQpO1xuXG4gICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBpZDogdGhpcy51cmxzLmxlbmd0aCArIDEsXG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgc2l6ZTogZmlsZVNpemVcbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmICghdGhpcy5zaW5nbGVGaWxlKSB7XG4gICAgICAgICAgICB0aGlzLnVybHMucHVzaChwYXlsb2FkKTtcbiAgICAgICAgICAgIHRoaXMuZmlsZUxpc3QucHVzaChwYXlsb2FkKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5maWxlQ2hhbmdlZC5lbWl0KHBheWxvYWQpO1xuICAgICAgICAgICAgdGhpcy5iYWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmaWxlUmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgICB9XG5cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xlYXIoKSB7XG4gICAgdGhpcy52YWx1ZSA9ICcnO1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLnZhbHVlKTtcbiAgICB0aGlzLnVybHMgPSBbXTtcbiAgICB0aGlzLmJhY2soKTtcbiAgICB0aGlzLl9vbkNsZWFyLmVtaXQoKTtcbiAgfVxuICBwdWJsaWMgYmFjaygpIHtcbiAgICB0aGlzLnNlbGVjdEZpbGVUeXBlID0gdHJ1ZTtcbiAgICB0aGlzLnVybHMgPSBbXTtcbiAgICB0aGlzLmJhY2tCdXR0b24gPSBmYWxzZTtcbiAgICB0aGlzLmZpbGVMaXN0ID0gW107XG4gICAgdGhpcy5VcGxvYWRDYXB0aW9ucyA9IGZhbHNlO1xuICAgIHRoaXMuZmlsZVVwbG9hZCA9IGZhbHNlO1xuICAgIHRoaXMubGl2ZUNhbWVyYS5lbWl0KCk7XG4gIH1cbiAgcHVibGljIHRvZ2dsZVZpc2liaWxpdHkoZmlsZXR5cGU6IHN0cmluZykge1xuICAgIGlmIChmaWxldHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgdGhpcy5maWxlVHlwZSA9ICdpbWFnZS9wbmcsIGltYWdlL2pwZWcsIGltYWdlL2dpZic7XG4gICAgICB0aGlzLmZpbGVVcGxvYWQgPSB0cnVlO1xuXG4gICAgfSBlbHNlIGlmIChmaWxldHlwZSA9PT0gJ3BkZicpIHtcbiAgICAgIHRoaXMuZmlsZVR5cGUgPSAnYXBwbGljYXRpb24vcGRmJztcbiAgICAgIHRoaXMucGRmQXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgIHRoaXMuZmlsZVVwbG9hZCA9IHRydWU7XG5cbiAgICB9IGVsc2UgaWYgKGZpbGV0eXBlID09PSAnYm90aCcpIHtcbiAgICAgIHRoaXMuZmlsZVR5cGUgPSAnaW1hZ2UvcG5nLCBpbWFnZS9qcGVnLCBpbWFnZS9naWYgLCBhcHBsaWNhdGlvbi9wZGYnO1xuICAgICAgdGhpcy5wZGZBdmFpbGFibGUgPSB0cnVlO1xuICAgICAgdGhpcy5maWxlVXBsb2FkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGZpbGV0eXBlID09PSAnbGl2ZUNhbWVyYScpIHtcbiAgICAgIHRoaXMubGl2ZUNhbWVyYS5lbWl0KCk7XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0RmlsZVR5cGUgPSBmYWxzZTtcbiAgICB0aGlzLmJhY2tCdXR0b24gPSB0cnVlO1xuXG4gIH1cblxuICBwdWJsaWMgdXBsb2FkKCkge1xuICAgIHRoaXMudXBsb2FkRGF0YS5lbWl0KHRoaXMuZmlsZUxpc3QpO1xuICAgIHRoaXMuYmFjaygpO1xuICB9XG5cbiAgcHVibGljIE1lcmdlSW1hZ2VzKCkge1xuICAgIGNvbnN0IGRvYyA9IG5ldyBqc1BERigpO1xuICAgIGRvYy5wYWdlID0gMTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZmlsZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGltYWdlRGF0YSA9IHRoaXMuZmlsZUxpc3RbaV0uZGF0YSB8fCB0aGlzLmZpbGVMaXN0W2ldLmltYWdlQXNEYXRhVXJsO1xuICAgICAgZG9jLmFkZEltYWdlKGltYWdlRGF0YSwgJ0pQRycsIDEwLCAxMCwgMTkwLCAyNzApO1xuICAgICAgZG9jLnNldEZvbnQoJ2NvdXJpZXInKTtcbiAgICAgIGRvYy5zZXRGb250VHlwZSgnbm9ybWFsJyk7XG4gICAgICBkb2MudGV4dCgxODAsIDI5MCwgJ3BhZ2UgJyArIGRvYy5wYWdlKTtcbiAgICAgIGRvYy5wYWdlKys7XG4gICAgICBpZiAoaSA8IHRoaXMuZmlsZUxpc3QubGVuZ3RoKSB7XG4gICAgICAgIGRvYy5hZGRQYWdlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGRvYy5kZWxldGVQYWdlKHRoaXMuZmlsZUxpc3QubGVuZ3RoICsgMSk7XG4gICAgdGhpcy5maWxlTGlzdCA9IFtdO1xuICAgIHRoaXMudXJscyA9IFtdO1xuICAgIGNvbnN0IGRhdGEgPSBkb2Mub3V0cHV0KCdkYXRhdXJpc3RyaW5nJyk7XG4gICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgIGRhdGEsXG4gICAgfTtcbiAgICB0aGlzLmZpbGVMaXN0LnB1c2gocGF5bG9hZCk7XG4gICAgdGhpcy51cmxzLnB1c2gocGF5bG9hZCk7XG4gICAgZG9jLm91dHB1dCgnZGF0YXVybG5ld3dpbmRvdycpO1xuICAgIC8vIGRvYy5zYXZlKCdUZXN0LnBkZicpO1xuXG4gIH1cbiAgcHVibGljIGRlbGV0ZSh1cmxzOiBhbnkpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB0aGlzLnVybHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh1cmxzLmRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMudXJsc1tpXS5kYXRhID09PSB1cmxzLmRhdGEpIHtcbiAgICAgICAgICB0aGlzLnVybHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIHRoaXMuZmlsZUxpc3Quc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHVybHMuaW1hZ2VBc0RhdGFVcmwpIHtcbiAgICAgICAgaWYgKHRoaXMudXJsc1tpXS5pbWFnZUFzRGF0YVVybCA9PT0gdXJscy5pbWFnZUFzRGF0YVVybCkge1xuICAgICAgICAgIHRoaXMudXJscy5zcGxpY2UoaSk7XG4gICAgICAgICAgdGhpcy5maWxlTGlzdC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBOZ3hGaWxlVXBsb2FkZXJDb21wb25lbnQgfSBmcm9tICcuL25neC1maWxlLXVwbG9hZGVyLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsRm9ybXNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbTmd4RmlsZVVwbG9hZGVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW05neEZpbGVVcGxvYWRlckNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4RmlsZVVwbG9hZGVyTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0lBT0UsaUJBQWlCOzs7WUFMbEIsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7Ozs7Ozs7QUNKRDtNQVNNLElBQUksR0FBRzs7Q0FFWjs7SUFFRDtRQXFHUyxTQUFJLEdBQUcsSUFBSSxLQUFLLEVBQU8sQ0FBQztRQUN4QixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixhQUFRLEdBQUcsSUFBSSxLQUFLLEVBQU8sQ0FBQztRQUU1QixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFFdkIsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFFVCxnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ25ELGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNwRCxlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbkQsYUFBUSxHQUFzQixJQUFJLFlB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