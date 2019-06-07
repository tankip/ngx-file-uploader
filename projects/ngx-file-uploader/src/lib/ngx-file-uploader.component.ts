import {
  Component, OnInit, Input, forwardRef,
  OnChanges, Output, EventEmitter, ɵConsole, ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import * as pdfMake from 'pdfmake/build/pdfmake';
import jsPDF from 'jspdf';


const noop = () => {
  // placeholder call backs
};

@Component({
  selector: 'file-uploader',
  styleUrls: ['./ngx-file-uploader.component.scss'],
  templateUrl: './ngx-file-uploader.component.html',
  encapsulation: ViewEncapsulation.Native,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // tslint:disable-next-line:no-forward-ref
      useExisting: forwardRef(() => NgxFileUploaderComponent), multi: true
    }
  ]
})
export class NgxFileUploaderComponent implements ControlValueAccessor, OnInit {
  public urls = new Array<any>();
  public selectFileType = true;
  public fileList = new Array<any>();
  public fileType: string;
  public pdfAvailable = false;
  public mobile = false;
  public UploadCaptions = false;
  @Input() public singleFile: any;
  public multiple = true;
  public fileUpload = false;
  public backButton = false;
  @Input() public source: any;
  @Output() public fileChanged: EventEmitter<any> = new EventEmitter();
  @Output () public liveCamera: EventEmitter<any> = new EventEmitter();
  @Output() public uploadData: EventEmitter<any> = new EventEmitter();
  @Output() public _onClear: EventEmitter<any> = new EventEmitter();
  public _imagePath: string;
  public uploading = false;
  // The internal data model
  private innerValue: any = '';

  // Placeholders for the callbacks which are later providesd
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;


  public ngOnInit() {
    if (this.singleFile) {
      this.multiple = false;
    }
    if (window.screen.width <= 692) { // 768px portrait
      this.mobile = true;
    }
  }

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

  public onBlur() {
    this.onTouchedCallback();
  }

  public onChange(event: any) {
    const files = event.srcElement.files;
    this.uploading = true;
    // const fileToLoad = files;

    if (files) {
      for (const file of files) {
        const fileReader = new FileReader();

        fileReader.onload = (fileLoadedEvent: any) => {
          const data = fileReader.result;
          const name = file.name;
          const fileSize = Math.round(file.size / 1024);

          const payload = {
            data,
            id: this.urls.length + 1,
            name: name,
            size: fileSize
          };
          if (!this.singleFile) {
            this.urls.push(payload);
            this.fileList.push(payload);
          } else {
            this.fileChanged.emit(payload);
            this.back();
          }
        };
        fileReader.readAsDataURL(file);
      }

    }
  }

  public clear() {
    this.value = '';
    this.onChangeCallback(this.value);
    this.urls = [];
    this.back();
    this._onClear.emit();
  }
  public back() {
    this.selectFileType = true;
    this.urls = [];
    this.backButton = false;
    this.fileList = [];
    this.UploadCaptions = false;
    this.fileUpload = false;
    this.liveCamera.emit();
  }
  public toggleVisibility(filetype: string) {
    if (filetype === 'image') {
      this.fileType = 'image/png, image/jpeg, image/gif';
      this.fileUpload = true;

    } else if (filetype === 'pdf') {
      this.fileType = 'application/pdf';
      this.pdfAvailable = true;
      this.fileUpload = true;

    } else if (filetype === 'both') {
      this.fileType = 'image/png, image/jpeg, image/gif , application/pdf';
      this.pdfAvailable = true;
      this.fileUpload = true;
    } else if (filetype === 'liveCamera') {
      this.liveCamera.emit();
    }
    this.selectFileType = false;
    this.backButton = true;

  }

  public upload() {
    this.uploadData.emit(this.fileList);
    this.back();
  }

  public MergeImages() {
    const doc = new jsPDF();
    doc.page = 1;
    for (let i = 0; i < this.fileList.length; i++) {
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
    const data = doc.output('datauristring');
    const payload = {
      data,
    };
    this.fileList.push(payload);
    this.urls.push(payload);
    doc.output('dataurlnewwindow');
    // doc.save('Test.pdf');

  }
  public delete(urls: any) {
    for (let i = 0; i <= this.urls.length; i++) {
      if (urls.data) {
        if (this.urls[i].data === urls.data) {
          this.urls.splice(i, 1);
          this.fileList.splice(i, 1);
          break;
        }
      } else if (urls.imageAsDataUrl) {
        if (this.urls[i].imageAsDataUrl === urls.imageAsDataUrl) {
          this.urls.splice(i);
          this.fileList.splice(i, 1);
          break;
        }
      }
    }
  }
}