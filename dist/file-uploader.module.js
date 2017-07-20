import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploderComponent } from './components';
import { FileUploaderService } from './services';
var FileUploaderModule = (function () {
    function FileUploaderModule() {
    }
    FileUploaderModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule],
                    providers: [
                        FileUploaderService,
                    ],
                    declarations: [
                        FileUploderComponent,
                    ],
                    exports: [
                        FileUploderComponent,
                    ]
                },] },
    ];
    /** @nocollapse */
    FileUploaderModule.ctorParameters = function () { return []; };
    return FileUploaderModule;
}());
export { FileUploaderModule };
//# sourceMappingURL=file-uploader.module.js.map