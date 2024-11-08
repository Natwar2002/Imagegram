import { create } from "zustand";

const store = create( (set) =>({
    email: '',
    username: '',
    password: '',
    setEmail: (newEmail) => set( (state) => {
        return {
            ...state,
            email: newEmail
        }
    }),
    setUsername: (newUsername) => set( (state) => {
        return {
            ...state,
            username: newUsername
        }
    }),
    setPassword: (newPassword) => set( (state) => {
        return {
            ...state,
            password: newPassword
        }
    }),
}));

export default store;