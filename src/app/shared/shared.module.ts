import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';

@NgModule({
    declarations: [ InputComponent, RadioComponent ],
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    exports: [
        InputComponent, 
        RadioComponent,
        FormsModule, 
        ReactiveFormsModule, 
        CommonModule
    ] 

})
export class SharedModule {
    
}