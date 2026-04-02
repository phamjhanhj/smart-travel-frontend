import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [IonicModule],
  template: `
    <ion-list>
      <ion-item *ngFor="let i of items">
        <ion-skeleton-text [animated]="true" style="width: 100%; height: 80px; border-radius: 8px;"></ion-skeleton-text>
      </ion-item>
    </ion-list>
  `,
})
export class SkeletonLoaderComponent {
  @Input() count = 3;
  get items() { return Array(this.count); }
}
