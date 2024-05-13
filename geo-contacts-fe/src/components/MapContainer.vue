<template>
  <div ref="mapContainerRef">
    <div id="map" style="height: 90vh"></div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import type { IMapMarker } from '@/types/IMapMarker';

const mapContainerRef = ref<HTMLElement | null>(null);

export default defineComponent({
  name: 'MapContainer',
  setup() {
    const initialMap = ref<L.Map | null>(null);
    const markersSet: Set<IMapMarker> = new Set([]);

    onMounted(() => {
      initialMap.value = L.map('map', {
        zoomControl: true,
        zoom: 1,
        zoomAnimation: false,
        fadeAnimation: true,
        markerZoomAnimation: true,
      }).setView([22.3193, 114.1694], 12);
      if (initialMap.value instanceof L.Map) {
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(initialMap.value);
      }
    });

    const addMarker = (mapMarker: IMapMarker): boolean => {
      let isAdded: boolean = markersSet.has(mapMarker);
      if (isAdded == false && initialMap.value instanceof L.Map) {
        mapMarker.init(initialMap.value);
        isAdded = !(markersSet.add(mapMarker) !== null);
      }
      return !isAdded;
    };

    const removeMarker = (mapMarker: IMapMarker): boolean => {
      let isDeleted: boolean = markersSet.delete(mapMarker);
      if (isDeleted && initialMap.value instanceof L.Map) {
        mapMarker.dispose(initialMap.value);
      }
      return isDeleted;
    };

    const setMapView = (latitude: number, longitude: number): void => {
      initialMap.value?.setView([latitude, longitude]);
    };

    return {
      addMarker,
      removeMarker,
      setMapView,
      mapContainerRef,
    };
  },
});
</script>

<style scoped></style>
