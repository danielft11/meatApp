import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';

@Component({
  selector: 'mt-order-items',
  templateUrl: './order-items.component.html'
})
export class OrderItemsComponent implements OnInit {

  @Input() items: CartItem[]

  @Output() increaseQtyEmitter = new EventEmitter<CartItem>()
  @Output() decreaseQtyEmitter = new EventEmitter<CartItem>()
  @Output() removeEmitter = new EventEmitter<CartItem>()

  constructor() { }

  ngOnInit() {
  }

  emitIncreaseQty(item: CartItem){
    this.increaseQtyEmitter.emit(item)
  }

  emmitDecreaseQty(item: CartItem){
    this.decreaseQtyEmitter.emit(item)
  }

  emitRemove(item: CartItem){
    this.removeEmitter.emit(item)
  }

}
