import { create } from 'zustand';
import { adminApi } from '../../services/api';

interface AuthState {
    isAuthenticated: boolean | null;
    user: unknown | null;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
    login: (arg0: string, arg1: string)=> Promise<void>
}


export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: null,
    user: null,
    checkAuth: async () => {
        try {
            const response = await adminApi.get("auth/user/", { withCredentials: true });
            set({ isAuthenticated: true, user: response.data });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response?.status !== 401) {
                console.error('Error en la autenticacion: ', error)
            }
            set({ isAuthenticated: false, user: null });
        }
    },
    login: async (username: string, password: string) => {
        try {
            await adminApi.post("auth/login/", {username, password}, { withCredentials: true });
            set({ isAuthenticated: true });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if(error.response.status === 401) {
                throw new Error('Credenciales incorrectas')
            } else if(error.response.status === 403) {
                throw new Error('Usuario no vendedor')
            }
        }
    },
    logout: async () => {
        try {
            await adminApi.post("auth/logout/", {}, { withCredentials: true });
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        } finally {
            set({ isAuthenticated: false, user: null });
        }
    },
}));