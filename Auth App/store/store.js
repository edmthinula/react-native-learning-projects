import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      email: null,
      isAuthenticated: false,
      _hasHydrated: false,
      userId: null,
      refreshToken: null,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      authenticate: (data) =>
        set({
          token: data.idToken,
          email: data.email,
          isAuthenticated: true,
          userId: data.localId,
          refreshToken: data.refreshToken,
        }),
      logout: () =>
        set({
          token: null,
          email: null,
          isAuthenticated: false,
          userId: null,
          refreshToken: null,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      skipHydration: false, 
      onRehydrateStorage: (state) => {
        return (state, error) => {
          if (error) {
            console.log('an error happened during hydration', error);
          } else {
            console.log('Rehydration finished!');
            state.setHasHydrated(true);
          }
        };
      },
    }
  )
);