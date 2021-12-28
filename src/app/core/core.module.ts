import { NgModule } from '@angular/core';
import { NotificationService } from './notification.service';
import { RestaurantsService } from './restaurants.service';
import { ShoppingCartService } from './shopping-cart-service';

@NgModule({
    providers: [ShoppingCartService, RestaurantsService, NotificationService]
})
export class CoreModule {

}
