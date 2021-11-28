import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DeliveryCostsComponent } from 'app/delivery-costs/delivery-costs.component';
import { MascaraCepDirective } from 'app/directives/mascara-cep.directive';
import { SharedModule } from 'app/shared/shared.module';
import { OrderItemsComponent } from './order-items/order-items.component';
import { ROUTES } from './order-routes';
import { OrderComponent } from './order.component';

@NgModule({
    declarations:[
        OrderComponent, 
        OrderItemsComponent, 
        DeliveryCostsComponent, 
        MascaraCepDirective,
    ],
    imports: [
        SharedModule, 
        RouterModule.forChild(ROUTES)]
})
export class OrderModule {
    
}