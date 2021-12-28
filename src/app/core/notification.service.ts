import { EventEmitter } from '@angular/core';

export class NotificationService {
    notifier = new EventEmitter<any>()

    notify(messageNotification: string){
        this.notifier.emit(messageNotification)
    }
}