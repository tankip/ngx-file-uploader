import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
@Component({
  selector: 'my-app',
  template: `Image {{dataModel}} <file-uploader  [(ngModel)]="dataModel" [source]="upload">
  </file-uploader>`
})
export class AppComponent {
  public header: string = 'UMD Demo';
  public dataModel: string;
  public upload(formData: any) {
    return Observable.of({
      path: 'http://via.placeholder.com/1000x800'
    });
  }
}
