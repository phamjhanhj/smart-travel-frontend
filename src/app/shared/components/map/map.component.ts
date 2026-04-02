import {
  Component, Input, AfterViewInit, OnChanges,
  SimpleChanges, ElementRef, ViewChild, OnDestroy,
} from '@angular/core';
import { Location } from '../../core/models/location.model';

declare const L: typeof import('leaflet');

@Component({
  selector: 'app-map',
  standalone: true,
  template: `<div #mapContainer style="height: 300px; border-radius: 12px;"></div>`,
})
export class MapComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  @Input() center: [number, number] = [16.0544, 108.2022]; // Đà Nẵng default
  @Input() zoom = 13;
  @Input() locations: Location[] = [];

  private map: ReturnType<typeof L.map> | null = null;

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['locations'] && this.map) this.addMarkers();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  private initMap(): void {
    this.map = L.map(this.mapContainer.nativeElement).setView(this.center, this.zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
    this.addMarkers();
  }

  private addMarkers(): void {
    if (!this.map) return;
    this.locations.forEach(loc => {
      if (loc.lat && loc.lng) {
        L.marker([loc.lat, loc.lng])
          .addTo(this.map!)
          .bindPopup(`<b>${loc.name}</b><br>${loc.address ?? ''}`);
      }
    });
  }
}
