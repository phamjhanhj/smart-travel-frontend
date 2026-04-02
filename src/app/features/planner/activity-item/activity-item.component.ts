import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Activity } from '../../../core/models/activity.model';
import { CurrencyVndPipe } from '../../../shared/pipes/currency-vnd.pipe';

@Component({
  selector: 'app-activity-item',
  standalone: true,
  imports: [CommonModule, IonicModule, CurrencyVndPipe],
  template: `
    <ion-item>
      <ion-icon [name]="iconName" slot="start" [color]="iconColor"></ion-icon>
      <ion-label>
        <h3>{{ activity.title }}</h3>
        <p>{{ activity.start_time }} – {{ activity.end_time }}</p>
        <p>{{ activity.estimated_cost | currencyVnd }}</p>
      </ion-label>
      <ion-button fill="clear" slot="end" (click)="edit.emit(activity)">
        <ion-icon name="pencil-outline" slot="icon-only"></ion-icon>
      </ion-button>
      <ion-button fill="clear" slot="end" color="danger" (click)="delete.emit(activity.id)">
        <ion-icon name="trash-outline" slot="icon-only"></ion-icon>
      </ion-button>
    </ion-item>
  `,
})
export class ActivityItemComponent {
  @Input({ required: true }) activity!: Activity;
  @Output() edit = new EventEmitter<Activity>();
  @Output() delete = new EventEmitter<string>();

  get iconName(): string {
    const icons: Record<string, string> = {
      meal: 'restaurant-outline',
      attraction: 'camera-outline',
      hotel: 'bed-outline',
      transport: 'car-outline',
      other: 'ellipsis-horizontal-outline',
    };
    return icons[this.activity.type] ?? 'ellipsis-horizontal-outline';
  }

  get iconColor(): string {
    const colors: Record<string, string> = {
      meal: 'warning',
      attraction: 'primary',
      hotel: 'tertiary',
      transport: 'success',
      other: 'medium',
    };
    return colors[this.activity.type] ?? 'medium';
  }
}
