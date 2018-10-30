import { NgModule } from '@angular/core';

import { AsambeSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [AsambeSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [AsambeSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class AsambeSharedCommonModule {}
