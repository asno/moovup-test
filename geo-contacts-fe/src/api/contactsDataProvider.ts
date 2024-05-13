import axios, { AxiosError } from 'axios';
import type { IDataProvider } from '@/types/IDataProvider';

export class ContactsDataProvider<Contact> implements IDataProvider<Contact> {
  async fetch(): Promise<Contact[]> {
    try {
      const response = await axios.get<Contact[]>('https://api.json-generator.com/templates/-xdNcNKYtTFG/data', {
        headers: {
          Authorization: 'Bearer b2atclr0nk1po45amg305meheqf4xrjt9a1bo410',
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error('Error response status:', axiosError.response.status);
          console.error('Error response data:', axiosError.response.data);
        } else if (axiosError.request) {
          console.error('Error request:', axiosError.request);
        } else {
          console.error('Error message:', axiosError.message);
        }
      } else {
        console.error('Non-axios error:', error);
      }
      return [];
    }
  }
}
