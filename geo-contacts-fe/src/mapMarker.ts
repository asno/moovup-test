import * as L from 'leaflet';
import type { IMapMarker } from './types/IMapMarker';
import icon from '@/assets/images/marker.png';
import markerShadow from '@/assets/images/marker-shadow.png';

export class MapMarker implements IMapMarker {
  private readonly markerIcon: L.Icon;
  private marker: L.Marker;

  constructor() {
    this.markerIcon = L.icon({
      iconUrl: icon,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [-3, -76],
      shadowUrl: markerShadow,
      shadowSize: [60, 30],
      shadowAnchor: [15, 30],
    });
    this.marker = L.marker([0, 0], { icon: this.markerIcon });
    this.marker.setOpacity(0);
  }
  init(map: L.Map): void {
    this.marker.addTo(map);
    this.marker.bindPopup('');
  }
  dispose(map: L.Map): void {
    this.marker.unbindPopup();
    this.marker.removeFrom(map);
  }
  show(): void {
    this.marker.closePopup();
    this.marker.setOpacity(1);
  }
  hide(): void {
    this.marker.closePopup();
    this.marker.setOpacity(0);
  }
  updateLatLng(latitude: number, longitude: number): void {
    if (latitude && longitude) {
      this.marker.setLatLng([latitude, longitude]);
    }
  }
  updatePopupMsg(popupMsg: string): void {
    if (popupMsg) {
      this.marker.setPopupContent(popupMsg);
    }
  }
}
