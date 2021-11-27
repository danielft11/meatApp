import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './about-route';
import { AboutComponent } from './about.component';

@NgModule({
    declarations: [
        AboutComponent
    ],
    imports: [
        RouterModule.forChild(ROUTES)
    ]
})
export class AboutModule {}