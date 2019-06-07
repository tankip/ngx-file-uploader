import { OnInit, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class NgxFileUploaderComponent implements ControlValueAccessor, OnInit {
    urls: any[];
    selectFileType: boolean;
    fileList: any[];
    fileType: string;
    pdfAvailable: boolean;
    mobile: boolean;
    UploadCaptions: boolean;
    singleFile: any;
    multiple: boolean;
    fileUpload: boolean;
    backButton: boolean;
    source: any;
    fileChanged: EventEmitter<any>;
    liveCamera: EventEmitter<any>;
    uploadData: EventEmitter<any>;
    _onClear: EventEmitter<any>;
    _imagePath: string;
    uploading: boolean;
    private innerValue;
    private onTouchedCallback;
    private onChangeCallback;
    ngOnInit(): void;
    value: any;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    onBlur(): void;
    onChange(event: any): void;
    clear(): void;
    back(): void;
    toggleVisibility(filetype: string): void;
    upload(): void;
    MergeImages(): void;
    delete(urls: any): void;
}