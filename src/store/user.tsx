import { getInfoUser } from 'apis/users';
import { EGender, ERoles } from 'constant/types';
import create from 'zustand';
interface User {
  email: string;
  id: string;
  name: string;
  picture?: string;
  cover?: string;
  tel?: string;
  address?: string;
  birthday?: string;
  gender?: EGender;
  permission: ERoles;
}

interface UserState {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  getUser: () => void;
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
  getUser: async () => {
    const dataUser = await getInfoUser();
    set({
      user: dataUser,
    });
  },
  clearUser: () =>
    set(() => ({
      isAuthenticated: false,
      user: null,
    })),
}));

export { useUser };
