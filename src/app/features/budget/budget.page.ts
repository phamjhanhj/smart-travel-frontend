import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './budget.page.html',
})
export class BudgetPage implements OnInit {
  ngOnInit(): void {}
}
