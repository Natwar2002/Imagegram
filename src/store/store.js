import { create } from "zustand";

const store = create( (set) =>({
    email: '',
    username: '',
    password: '',
    error: '',
    success: '',
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
    setError: (newError) => set( (state) => {
        return {
            ...state,
            error: newError
        }
    }),
    setSuccess: (newSuccess) => set( (state) => {
        return {
            ...state,
            success: newSuccess
        }
    }),
}));

export default store;