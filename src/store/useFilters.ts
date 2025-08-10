import { create } from 'zustand';

export type TabKey = 'live' | 'all' | 'new' | 'top' | 'volume' | 'scheduled';

interface FiltersState {
  tab: TabKey;
  sort: 'gainers' | 'volume' | null;
  search: string;
  setTab: (tab: TabKey) => void;
  setSort: (sort: FiltersState['sort']) => void;
  setSearch: (q: string) => void;
}

export const useFilters = create<FiltersState>((set) => ({
  tab: 'live',
  sort: null,
  search: '',
  setTab: (tab) => set({ tab, sort: tab === 'top' ? 'gainers' : tab === 'volume' ? 'volume' : null }),
  setSort: (sort) => set({ sort }),
  setSearch: (search) => set({ search }),
}));
