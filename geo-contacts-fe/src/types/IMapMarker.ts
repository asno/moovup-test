export interface IMapMarker {
  init: (map: L.Map) => void;
  dispose: (map: L.Map) => void;
  show: () => void;
  hide: () => void;
  updateLatLng: (latitude: number, longitude: number) => void;
  updatePopupMsg: (popupMsg: string) => void;
}
