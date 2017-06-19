import {
  Component, OnInit, Input, forwardRef,
  OnChanges, Output, EventEmitter
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { FileUploaderService } from '../../services';
const noop = () => {
};

@Component({
  selector: 'file-uploader',
  styleUrls: ['./file-uploader.component.scss'],
  templateUrl: './file-uploader.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploderComponent), multi: true
    }
  ]
})
export class FileUploderComponent implements ControlValueAccessor {
  @Input() public source: any;
  @Output() public uploadStarted: EventEmitter<any> = new EventEmitter();
  @Output() public uploadCompleted: EventEmitter<any> = new EventEmitter();
  public _imagePath: string;
  public uploading = false;
  // The internal data model
  private innerValue: any = '';

  // Placeholders for the callbacks which are later providesd
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  // get accessor
  get value(): any {
    return this.innerValue;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }
  // Current time string.

  public writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  // From ControlValueAccessor interface
  public registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  public registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  private onBlur() {
    this.onTouchedCallback();
  }

  private onChange(event: any) {
    const files = event.srcElement.files;
    this.uploading = true;
    this.uploadStarted.emit({ status: 'upload_start' });
    this.source(files).subscribe((response: any) => {
      this.uploading = false;
      this.value = response.path;
      this.uploadStarted.emit({ status: 'upload_complete' });
    });

  }

  private clear() {
    this.value = null;
  }
}
