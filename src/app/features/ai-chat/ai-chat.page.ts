import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './ai-chat.page.html',
})
export class AiChatPage implements OnInit {
  ngOnInit(): void {}
}
