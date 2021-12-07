import { Component, OnInit } from '@angular/core';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { ShoppingCartService } from 'app/core/shopping-cart-service';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

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

  emailPattern: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  
  numberPattern: RegExp = /^[0-9]*$/

  constructor(private shoppingCartService: ShoppingCartService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      cep: this.formBuilder.control('', [Validators.required]),
      paymentOptions: this.formBuilder.control('', [Validators.required]),
    }, 
    {validator: OrderComponent.equalsTo})
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

  static equalsTo(group: AbstractControl) : {[key: string]: boolean} {
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')

    if (!email || !emailConfirmation){
      return undefined
    }

    if (email.value !== emailConfirmation.value){
      return {emailsNotMath: true}
    }
  }

}
