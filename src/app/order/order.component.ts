import { Component, OnInit } from '@angular/core';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { ShoppingCartService } from 'app/restaurant-detail/shopping-cart/shopping-cart-service';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup
  delivery: number = 8

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão Refeição', value: 'REF' },
  ]

  constructor(private shoppingCartService: ShoppingCartService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control(''),
      email: this.formBuilder.control(''),
      emailConfirmation: this.formBuilder.control(''),
      address: this.formBuilder.control(''),
      number: this.formBuilder.control(''),
      optionalAddress: this.formBuilder.control(''),
      paymentOptions: this.formBuilder.control(''),
    })
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

  remove(item: CartItem): void {
    return this.shoppingCartService.removeItem(item)
  }

  itemsValue(): number {
    return this.shoppingCartService.total()
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantitity, item.menuItem.id))

    this.shoppingCartService.checkOrder(order)
      .subscribe((orderId: string) => {
        this.router.navigate(['/order-summary', orderId])
        this.shoppingCartService.clear()
      })

  }

}
