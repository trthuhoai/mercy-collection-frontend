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
  isAdmin:boolean;
  isLocked: boolean;
  user: User | null;
  setUser: (user: User) => void;
  getUser: () => void;
  clearUser: () => void;
  setLocked: (locked: boolean) => void;
}

const useUser = create<UserState>(set => ({
  isLocked: false,
  isAuthenticated: false,
  isAdmin:false,
  user: null,
  setUser: (user: User) =>
    set(() => ({
      isAuthenticated: true,
      isAdmin: user.permission ===  ERoles.ADMIN,
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
      isAdmin:false,
      user: null,
    })),
  setLocked: (locked: boolean) =>
    set(() => ({
      isLocked: locked,
    })),
}));

export { useUser };
