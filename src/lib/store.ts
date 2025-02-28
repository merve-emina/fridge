import { proxy, useSnapshot } from 'valtio';

export const store = proxy<{ orders: string[] }>({ orders: [] });

export function useOrderCount() {
  return useSnapshot(store.orders).length;
}

export function addToOrders(id: string) {
  store.orders.push(id);
}
