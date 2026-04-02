import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Trip } from '../../core/models/trip.model';
import { CurrencyVndPipe } from '../pipes/currency-vnd.pipe';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, IonicModule, CurrencyVndPipe],
  template: `
    <ion-card button (click)="clicked.emit(trip)">
      <img *ngIf="trip.cover_image_url" [src]="trip.cover_image_url" alt="cover" />
      <ion-card-header>
        <ion-card-subtitle>{{ trip.destination }}</ion-card-subtitle>
        <ion-card-title>{{ trip.title }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <p>{{ trip.start_date }} → {{ trip.end_date }}</p>
        <p>{{ trip.budget | currencyVnd }} · {{ trip.num_travelers }} người</p>
        <ion-badge [color]="statusColor">{{ trip.status }}</ion-badge>
      </ion-card-content>
    </ion-card>
  `,
})
export class TripCardComponent {
  @Input({ required: true }) trip!: Trip;
  @Output() clicked = new EventEmitter<Trip>();

  get statusColor(): string {
    return { draft: 'medium', active: 'primary', completed: 'success' }[this.trip.status] ?? 'medium';
  }
}
