import { defineStore } from 'pinia';
import { NewUser } from '../users';

export const useUsers = defineStore("users", {
    actions: {
        async createUser(user: NewUser) {
            const body = JSON.stringify({
                ...user
            });
            const res = await fetch('http://localhost:8000/users', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body
            });
        }
    }
});