<template>
  <div class="home-view">
    <div class="contacts-list">
      <ContactList :contacts="contacts" />
    </div>
    <div class="map-container">
      <MapContainer ref="mapContainerRef" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import ContactList from '@/components/ContactList.vue';
import MapContainer from '@/components/MapContainer.vue';
import { useContactsStore } from '@/stores/contactsStore';
import { MapMarker } from '@/mapMarker';
import { ContactsDataProvider } from '@/api/contactsDataProvider';

export default defineComponent({
  name: 'HomeView',
  components: {
    ContactList,
    MapContainer,
  },
  setup() {
    const contactsStore = useContactsStore();
    const { selectedContactCoordsId: selectedContactId } = storeToRefs(contactsStore);
    const mapContainerRef = ref<typeof MapContainer | null>(null);
    const mapMarker = ref<MapMarker>(new MapMarker());

    watch(
      () => selectedContactId,
      () => {
        let latitude = contactsStore.selectedContactCoords?.location.latitude;
        let longitude = contactsStore.selectedContactCoords?.location.longitude;
        if (latitude && longitude) {
          mapContainerRef.value?.addMarker(mapMarker.value);
          mapMarker.value?.updateLatLng(latitude, longitude);
          mapMarker.value?.updatePopupMsg(
            `${contactsStore.selectedContactCoords?.name.first} ${contactsStore.selectedContactCoords?.name.last}`,
          );
          mapMarker.value?.show();
          mapContainerRef.value?.setMapView(latitude, longitude);
        } else {
          mapMarker.value?.hide();
        }
      },
      { deep: true },
    );

    onMounted(() => {
      fetchContacts();
    });

    const fetchContacts = async () => {
      await contactsStore.fetchContacts(new ContactsDataProvider());
    };

    return {
      contacts: contactsStore.contacts,
      mapContainerRef,
    };
  },
});
</script>

<style scoped>
.home-view {
  display: flex;
  gap: 20px;
}

.contacts-list {
  flex: 1;
}

.map-container {
  flex: 2;
}
</style>
