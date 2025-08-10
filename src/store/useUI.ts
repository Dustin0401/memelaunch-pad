import { create } from 'zustand';

interface UIState {
  rightRailOpen: boolean;
  sideCollapsed: boolean;
  setRightRailOpen: (open: boolean) => void;
  toggleSide: () => void;
}

export const useUI = create<UIState>((set, get) => ({
  rightRailOpen: false,
  sideCollapsed: false,
  setRightRailOpen: (open) => set({ rightRailOpen: open }),
  toggleSide: () => set({ sideCollapsed: !get().sideCollapsed }),
}));
