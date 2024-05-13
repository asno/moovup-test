<template>
  <div class="contact-list-container">
    <div class="list-header">All Friends</div>
    <div class="list-group">
      <ContactItem
        v-for="contact in contacts"
        :key="contact._id"
        :contact="contact"
        class="list-group-item list-group-item-action"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ContactItem from './ContactItem.vue';
import type { Contact } from '@/types/Contact';

export default defineComponent({
  components: {
    ContactItem,
  },
  props: {
    contacts: {
      type: Array as () => Contact[],
      required: true,
    },
  },
});
</script>

<style scoped>
.contact-list-container {
  border: 1px solid #ccc;
  height: 90vh;
  overflow-y: auto;
  position: relative;
}

.list-header {
  position: sticky;
  top: 0;
  background-color: #343a40;
  color: #fff;
  padding: 10px;
  text-align: center;
  font-family: 'Segoe UI';
  font-size: 1.2rem;
  font-weight: bold;
  z-index: 1;
}
</style>
