import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Leaflet from 'leaflet';
import { getLayers } from 'src/app/utils/utils';

@Component({
  selector: 'app-geo',
  templateUrl: './geo.component.html',
  styleUrls: ['./geo.component.scss']
})
export class GeoComponent implements OnChanges {
  @Input() public latlng?: {lat: string; lng: string} = {lat: '43.530147', lng: '16.488932'};
  @Input() public invalidate?: any;

  protected title = 'AngularOSM';
  protected options: Leaflet.MapOptions = {
    layers: [...getLayers()],
    zoom: 5,
    center: new Leaflet.LatLng(43.530147, 16.488932)
  };
  private latLng: Leaflet.LatLng = new Leaflet.LatLng(43.530147, 16.488932);
  private map?: Leaflet.Map;
  
  constructor() { }

  async ngOnChanges() {
    if (!this.latlng) return;
    this.latLng = new Leaflet.LatLng(parseFloat(this.latlng?.lat), parseFloat(this.latlng?.lng));
    this.options.center = this.latLng;
    Leaflet.marker(this.latLng, { icon: this.getSvgIcon() }).addTo(this.map as Leaflet.Map)
    this.map?.panTo(this.latLng)

    await this.delay(300);
    this.map?.invalidateSize(false);
  }

  protected async onMapReady(map: Leaflet.Map) {
    this.map = map;
  }

  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  private getSvgIcon() {
    return Leaflet.divIcon({
      html: `
<svg
  width="24"
  height="40"
  viewBox="0 0 100 100"
  version="1.1"
  preserveAspectRatio="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M0 0 L50 100 L100 0 Z" fill="#7A8BE7"></path>
</svg>`,
      className: "svg-icon",
      iconSize: [24, 40],
      iconAnchor: [12, 40],
    });
  }
}
