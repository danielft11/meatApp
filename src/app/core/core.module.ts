import { NgModule } from '@angular/core';
import { RestaurantsService } from './restaurants.service';
import { ShoppingCartService } from './shopping-cart-service';

@NgModule({
    providers: [ShoppingCartService, RestaurantsService]
})
export class CoreModule {

}
