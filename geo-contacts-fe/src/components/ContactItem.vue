<template>
  <div class="contact-card">
    <div class="contact-info" @click="revealEmail">
      <div
        class="contact-avatar"
        :style="{
          '--bg-image': `url(${contact.picture?.trim()?.length > 0 ? contact.picture : blankProfilePhoto})`,
        }"
      >
        <div class="inner_circle"></div>
      </div>
      <div class="contact-details">
        <h3>{{ contact.name.first }} {{ contact.name.last }}</h3>
        <p v-if="isEmailRevealed" class="email">{{ contact.email }}</p>
        <p v-else class="email" :style="{ opacity: '0', 'pointer-events': 'none' }">
          {{ contact.email }}
        </p>
      </div>
    </div>
    <div>
      <img src="@/components/icons/copy-link-icon.svg" alt="Copy Email" @click="copyEmail" class="button-icon" />
    </div>
    <div>
      <img
        v-if="contact.location.latitude !== null && contact.location.longitude !== null"
        src="@/components/icons/marker-link-icon.svg"
        alt="Geolocate"
        @click="geolocate"
        class="button-icon"
      />
      <img
        v-else
        src="@/components/icons/marker-link-icon.svg"
        alt="Geolocate"
        class="button-icon"
        :style="{ opacity: '0.1', 'pointer-events': 'none' }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useContactsStore } from '@/stores/contactsStore';
import type { Contact } from '@/types/Contact';
import blankProfilePhoto from '@/assets/images/blank-profile-photo.png';

export default defineComponent({
  setup(props) {
    const contactsStore = useContactsStore();
    const { selectedContactEmailId: selectedContactId } = storeToRefs(contactsStore);
    const isEmailRevealed = ref<boolean>(false);

    watch(
      () => selectedContactId,
      () => {
        if (props.contact._id !== contactsStore.selectedContactEmailId) {
          isEmailRevealed.value = false;
        }
      },
      { deep: true },
    );
    return {
      contactsStore,
      blankProfilePhoto,
      isEmailRevealed: isEmailRevealed,
    };
  },
  props: {
    contact: {
      type: Object as () => Contact,
      required: true,
    },
  },
  methods: {
    revealEmail() {
      this.contactsStore.selectContactForEmail(this.contact._id);
      this.isEmailRevealed = true;
    },
    copyEmail() {
      navigator.clipboard.writeText(this.contact.email);
    },
    geolocate() {
      this.contactsStore.selectContactForCoords(this.contact._id);
    },
  },
});
</script>

<style scoped>
.contact-card {
  border: none;
  border-radius: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
}

.contact-card:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.contact-info {
  width: 100%;
  display: flex;
  cursor: pointer;
  align-items: center;
}

.contact-info h3 {
  margin: 0 0 5px;
  font-family: 'Segoe UI';
}

.contact-info p {
  margin: 0;
  color: #888;
}

.contact-details {
  flex: 1;
  margin-left: 15px;
}

.contact-avatar {
  position: relative;
  margin: 10px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-image: var(--bg-image);
  background-size: cover;
  background-position: center;
}

.inner_circle {
  background-image: linear-gradient(140deg, indigo 0%, coral 100%);
  content: '';
  position: absolute;
  top: -3px;
  bottom: -3px;
  right: -3px;
  left: -3px;
  z-index: -1;
  border-radius: inherit;
}

.button-icon {
  height: 20px;
  cursor: pointer;
  margin-right: 30px;
}

.button-icon:active {
  transform: scale(0.75);
}
</style>
