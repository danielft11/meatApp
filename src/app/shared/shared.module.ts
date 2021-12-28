import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';

@NgModule({
    declarations: [ InputComponent, RadioComponent, SnackbarComponent ],
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    exports: [
        InputComponent, 
        RadioComponent,
        FormsModule, 
        ReactiveFormsModule, 
        CommonModule,
        SnackbarComponent
    ] 

})
export class SharedModule {
    
}