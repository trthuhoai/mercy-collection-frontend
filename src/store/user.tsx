import create from 'zustand';
interface User {
  email: string;
  id: string;
  name: string;
  picture?: string;
}

interface UserState {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const useUser = create<UserState>(set => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) =>
    set(() => ({
      isAuthenticated: true,
      user,
    })),
  clearUser: () =>
    set(() => ({
      isAuthenticated: false,
      user: null,
    })),
}));

export { useUser };
