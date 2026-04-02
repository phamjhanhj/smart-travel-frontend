import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
// import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
// import { IonicModule } from '@ionic/angular';
import { IonRouterLink, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, IonRouterOutlet, IonRouterLink],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  tabs = [
    { path: '/tabs/trips', label: 'Chuyến đi', icon: 'airplane-outline' },
    { path: '/tabs/explore', label: 'Khám phá', icon: 'map-outline' },
  ];

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.init();
  }
}
