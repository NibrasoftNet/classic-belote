import { BidStateType } from '@/types';
import { create } from 'zustand';

export const useBidStore = create<BidStateType>((set) => ({
  isDealing: false,
  setIsDealing: (isDealing: boolean) => set({ isDealing }),
}));
