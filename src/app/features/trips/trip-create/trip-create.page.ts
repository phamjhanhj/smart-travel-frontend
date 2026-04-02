import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-trip-create',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './trip-create.page.html',
})
export class TripCreatePage implements OnInit {
  ngOnInit(): void {}
}
