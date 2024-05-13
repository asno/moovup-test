import { mount } from '@vue/test-utils';
import ContactItem from '@/components/ContactItem.vue';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { createApp } from 'vue';
import { setupTestPinia } from '@/test-setup';
import App from '@/App.vue';

describe('ContactItem', () => {
  beforeEach(() => {
    const app = createApp(App);

    setupTestPinia(app);
  });

  it('has a required contacts prop', () => {
    expect(ContactItem.props.contact.required).toBe(true);
  });

  it('throws an error if the contact prop is of the wrong type', () => {
    const contact: any = 'not an object';

    expect(() => {
      mount(ContactItem, { props: { contact } });
    }).toThrow();
  });

  it('renders contact details correctly', () => {
    const contact = {
      _id: '123',
      name: { first: 'John', last: 'Doe' },
      email: 'john.doe@example.com',
      picture: 'https://placebear.com/99/190',
      location: { latitude: 1.23, longitude: 4.56 },
    };

    const wrapper = mount(ContactItem, {
      props: { contact },
    });

    expect(wrapper.find('.contact-card').exists()).toBe(true);
    expect(wrapper.find('.contact-avatar').exists()).toBe(true);
    expect(wrapper.find('.contact-details h3').text()).toBe('John Doe');
    expect(wrapper.find('.contact-details .email').text()).toBe('john.doe@example.com');
    expect(wrapper.find('.button-icon[alt="Copy Email"]').exists()).toBe(true);
    expect(wrapper.find('.button-icon[alt="Geolocate"]').exists()).toBe(true);

    const contactAvatar = wrapper.find('.contact-avatar').element;
    const styleAttribute = contactAvatar.getAttribute('style')?.trim();

    expect(styleAttribute).toContain(`--bg-image: url(${contact.picture})`);
  });

  it('reveals email when contact info is clicked', async () => {
    const contact = {
      _id: '123',
      name: { first: 'John', last: 'Doe' },
      email: 'john.doe@example.com',
      picture: 'https://placebear.com/99/190',
      location: { latitude: 1.23, longitude: 4.56 },
    };

    const wrapper = mount(ContactItem, {
      props: { contact },
    });

    const selectContactSpy = vi.spyOn(wrapper.vm.contactsStore, 'selectContactForEmail');

    await wrapper.find('.contact-info').trigger('click');

    expect(wrapper.vm.isEmailRevealed).toBe(true);
    expect(selectContactSpy).toHaveBeenCalledWith(contact._id);
  });

  it('calls selectContactForCoords method when geolocate button is clicked with available latitude and longitude', async () => {
    const contact = {
      _id: '123',
      name: { first: 'John', last: 'Doe' },
      email: 'john.doe@example.com',
      picture: 'https://placebear.com/99/190',
      location: { latitude: 1.23, longitude: 4.56 },
    };

    const wrapper = mount(ContactItem, {
      props: { contact },
    });

    const selectContactSpy = vi.spyOn(wrapper.vm.contactsStore, 'selectContactForCoords');

    await wrapper.find('.button-icon[alt="Geolocate"]').trigger('click');

    expect(selectContactSpy).toHaveBeenCalledWith(contact._id);
  });

  it('calls navigator.clipboard.writeText with the contact email when copyEmail is called', async () => {
    const contact = {
      _id: '123',
      name: { first: 'John', last: 'Doe' },
      email: 'john.doe@example.com',
      picture: 'https://placebear.com/99/190',
      location: { latitude: 1.23, longitude: 4.56 },
    };

    const wrapper = mount(ContactItem, {
      props: { contact },
    });

    const writeTextMock = vi.fn();
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
    });

    wrapper.vm.copyEmail();

    expect(writeTextMock).toHaveBeenCalledWith(contact.email);
  });
});
