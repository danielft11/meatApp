import { Injectable } from '@angular/core';
import { Order } from 'app/order/order.model'
import { MenuItem } from '../restaurant-detail/menu-item/menu-item.model'
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model'
import { Http, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import { MEAT_API } from 'app/constantes';

import 'rxjs/add/operator/map';

@Injectable()
export class ShoppingCartService {

    items: CartItem[] = []

    constructor(private http: Http) { }

    clear() {
        this.items = []
    }

    addItem(item: MenuItem) {

        let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id)

        if (foundItem)
            this.increaseQty(foundItem)
        else
            this.items.push(new CartItem(item))

    }

    removeItem(item: CartItem) {
        this.items.splice(this.items.indexOf(item), 1)
    }

    total(): number {
        return this.items
            .map(item => item.value())
            .reduce((prev, value) => prev + value, 0)
    }

    increaseQty(item: CartItem) {
        item.quantitity = item.quantitity + 1
    }

    decreaseQty(item: CartItem) {
        item.quantitity = item.quantitity - 1

        if (item.quantitity === 0) {
            this.removeItem(item)
        }

    }

    checkOrder(order: Order): Observable<string> {
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        return this.http.post(`${MEAT_API}/orders`,
            JSON.stringify(order),
            new RequestOptions({ headers: headers }))
            .map(response => response.json())
            .map(order => order.id)
    }

}