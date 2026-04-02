import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-day-plan',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './day-plan.page.html',
})
export class DayPlanPage implements OnInit {
  ngOnInit(): void {}
}
