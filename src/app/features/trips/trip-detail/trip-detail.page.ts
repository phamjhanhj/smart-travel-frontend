import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './trip-detail.page.html',
})
export class TripDetailPage implements OnInit {
  ngOnInit(): void {}
}
