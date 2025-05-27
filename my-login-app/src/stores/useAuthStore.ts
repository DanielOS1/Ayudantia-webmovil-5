import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware'; // ← Importar devtools

// Tipado más específico
interface UserProfile {
  id: string;
  name: string;
  rut: string;
}

interface AuthState {
  token: string | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  login: (token: string, profile: UserProfile) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        token: null,
        profile: null,
        isAuthenticated: false,
        
        login: (token, profile) => {
          set(
            { 
              token, 
              profile, 
              isAuthenticated: true 
            },
            false, // shallow merge
            'auth/login' // ← Nombre de la acción para DevTools
          );
        },
        
        logout: () => {
          set(
            { 
              token: null, 
              profile: null, 
              isAuthenticated: false 
            },
            false,
            'auth/logout' // ← Nombre de la acción para DevTools
          );
        },
      }),
      {
        name: 'auth-storage',
      }
    ),
    {
      name: 'auth-store', // ← Nombre del store en DevTools
    }
  )
);