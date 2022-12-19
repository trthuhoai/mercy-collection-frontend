import create from 'zustand';

interface SearchState {
  value: string;
  setValue: (v: string) => void;
}

const useSearch = create<SearchState>(set => ({
  value: '',
  setValue: (value: string) =>
    set(() => ({
      value,
    })),
}));

export { useSearch };
