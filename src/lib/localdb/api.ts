import axios from 'axios';

const localApi = axios.create({
  baseURL: import.meta.env.VITE_LOCAL_API,
});

type ListItem = {
  id: string;
  name: string;
  count: number;
};

export async function addToList(name: string) {
  const response = await localApi.post<ListItem>('list', { name, count: 1 });
  return response.data;
}

export async function incOnList(item: ListItem) {
  const response = await localApi.put<ListItem>(`list/${item.id}`, {
    ...item,
    count: item.count + 1,
  });
  return response.data;
}

export async function getList() {
  const response = await localApi.get<ListItem[]>('list');
  return response.data;
}
