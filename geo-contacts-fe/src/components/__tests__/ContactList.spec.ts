import { mount } from '@vue/test-utils';
import ContactList from '@/components/ContactList.vue';
import type { Contact } from '@/types/Contact';
import { describe, it, expect, beforeEach } from 'vitest';
import { createApp } from 'vue';
import { setupTestPinia } from '@/test-setup';
import App from '@/App.vue';

describe('ContactList.vue', () => {
  beforeEach(() => {
    const app = createApp(App);

    setupTestPinia(app);
  });

  it('has a required contacts prop', () => {
    expect(ContactList.props.contacts.required).toBe(true);
  });

  it('renders contact items for each contact in props.contacts', () => {
    const contacts: Contact[] = [
      {
        _id: '123',
        name: { first: 'John', last: 'Doe' },
        email: 'john.doe@example.com',
        picture: 'https://placebear.com/99/190',
        location: { latitude: 1.23, longitude: 4.56 },
      },
      {
        _id: '456',
        name: { first: 'John', last: 'Doe' },
        email: 'john.doe@example.com',
        picture: 'https://placebear.com/99/190',
        location: { latitude: 1.23, longitude: 4.56 },
      },
    ];

    const wrapper = mount(ContactList, {
      props: { contacts },
    });

    const items = wrapper.findAllComponents({ name: 'ContactItem' });
    expect(items.length).toBe(contacts.length);

    items.forEach((item, index) => {
      expect(item.props().contact).toEqual(contacts[index]);
    });
  });
});
