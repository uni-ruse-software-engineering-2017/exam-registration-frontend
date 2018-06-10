import { Component, Input } from '@angular/core';

@Component({
  selector: 'ru-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent {
  @Input('title') title: string;
  @Input('subtitle') subtitle: string;
}
