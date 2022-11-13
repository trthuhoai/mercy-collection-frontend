import create from 'zustand';
interface User {
  name: string;
  avatar: string;
}

interface UserState {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
}

const useUser = create<UserState>(set => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) =>
    set(() => ({
      isAuthenticated: true,
      user,
    })),
}));

export { useUser };
