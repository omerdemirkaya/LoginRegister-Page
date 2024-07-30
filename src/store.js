import { create } from 'zustand';

const useStore = create((set) => ({
    user: {
        name: '',
        email: '',
        password: ''
    },
    addUser: (name, email, password) => set((state) => ({
        user: {
            ...state.user,
            name,
            email,
            password
        }
    })),
    clearUser: () => set(() => ({
        user: {
            name: "",
            email: "",
            password: ""
        }
    }))
}));

export default useStore;
