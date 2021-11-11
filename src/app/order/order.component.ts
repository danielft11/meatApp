import { Component, OnInit } from '@angular/core';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { ShoppingCartService } from 'app/restaurant-detail/shopping-cart/shopping-cart-service';
import { RadioOption } from 'app/shared/radio/radio-option.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'},
  ]

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
  }

  cartItems(): CartItem[] {
    return this.shoppingCartService.items
  }

  increaseQty(item: CartItem): void {
    return this.shoppingCartService.increaseQty(item)
  }

  decreaseQty(item: CartItem): void {
    return this.shoppingCartService.decreaseQty(item)
  }

  remove(item: CartItem): void{
    return this.shoppingCartService.removeItem(item)
  }

}
