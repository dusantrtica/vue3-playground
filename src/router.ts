import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import NewPost from "./views/NewPost.vue";
import { useUsers } from './stores/users';
export const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/posts/new",
        component: NewPost,
        beforeEnter: () => {
            const usersStore = useUsers()
            if (!usersStore.currentUserId) {
                return {
                    path: '/',
                }
            }
        }
    }
]
export const router = createRouter({
    history: createWebHistory(),
    routes
});
