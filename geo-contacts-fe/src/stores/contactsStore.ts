import { defineStore } from 'pinia';
import type { Contact } from '@/types/Contact';
import { ContactsDataProvider } from '@/api/contactsDataProvider';

export const useContactsStore = defineStore({
  id: 'contacts',
  state: () => ({
    contacts: [] as Contact[],
    selectedContactCoordsId: null as string | null,
    selectedContactEmailId: null as string | null,
  }),
  getters: {
    selectedContactCoords({ contacts, selectedContactCoordsId: selectedContactId }): Contact | undefined {
      return contacts.find(contact => contact._id === selectedContactId);
    },
    selectedContactEmail({ contacts, selectedContactEmailId: selectedContactId }): Contact | undefined {
      return contacts.find(contact => contact._id === selectedContactId);
    },
  },
  actions: {
    addContact(contactOrContacts: Contact | Contact[]): void {
      if (Array.isArray(contactOrContacts)) {
        this.contacts.push(...contactOrContacts);
      } else {
        this.contacts.push(contactOrContacts);
      }
    },
    selectContactForCoords(contactId: string): void {
      this.selectedContactCoordsId = contactId;
    },
    selectContactForEmail(contactId: string): void {
      this.selectedContactEmailId = contactId;
    },
    async fetchContacts(dataProvider: ContactsDataProvider<Contact>): Promise<void> {
      const contacts = await dataProvider.fetch();
      this.addContact(contacts);
    },
  },
});
