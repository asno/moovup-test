import { ContactsDataProvider } from '@/api/contactsDataProvider';
import axios from 'axios';
import { describe, it, expect, vi, type Mock } from 'vitest';

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    isAxiosError: vi.fn(),
  },
}));

describe('ContactsDataProvider', () => {
  it('fetches data successfully when the request succeeds', async () => {
    const mockData = [
      {
        _id: '123',
        name: { last: 'Doe', first: 'John' },
        email: 'john.doe@example.com',
        picture: 'https://placebear.com/225/210',
        location: { latitude: 22.38, longitude: null },
      },
    ];
    (axios.get as Mock).mockResolvedValue({ data: mockData });

    const dataProvider = new ContactsDataProvider();
    const data = await dataProvider.fetch();

    expect(data).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith('https://api.json-generator.com/templates/-xdNcNKYtTFG/data', {
      headers: {
        Authorization: 'Bearer b2atclr0nk1po45amg305meheqf4xrjt9a1bo410',
      },
    });
  });

  it('returns an empty array when the request fails', async () => {
    (axios.get as any).mockRejectedValueOnce(new Error('Network error'));

    const dataProvider = new ContactsDataProvider();
    const data = await dataProvider.fetch();

    expect(data).toEqual([]);
  });
});
