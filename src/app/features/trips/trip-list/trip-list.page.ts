import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './trip-list.page.html',
})
export class TripListPage implements OnInit {
  ngOnInit(): void {}
}
