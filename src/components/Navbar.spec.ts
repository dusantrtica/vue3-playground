import {mount} from '@vue/test-utils';
import { describe, it, expect} from 'vitest';
import FormInput from './FormInput.vue';
import { defineComponent, computed, ref, createRenderer } from 'vue';
import Navbar from './Navbar.vue';
import { createPinia, setActivePinia } from 'pinia';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '../router';
import { useUsers } from '../stores/users';

describe("Navbar", () => {
    it('renders', () => {
        const el = document.createElement('div');
        el.id = 'modal';
        document.body.appendChild(el);
        const pinia = createPinia();
        const router = createRouter({
            history: createMemoryHistory(),
            routes
        });
        const wrapper = mount(Navbar, {
            global: {
                plugins: [pinia, router]
            }
        });
        expect(wrapper.find("#sign-up").exists()).toBe(true);
        expect(wrapper.find('[data-testid="sign-in"').exists()).toBe(true);
    });

    it('renders signin and sign up when not authenticated', () => {
        const el = document.createElement('div');
        el.id = 'modal';
        document.body.appendChild(el);
        const pinia = createPinia();
        setActivePinia(pinia);
        const router = createRouter({
            history: createMemoryHistory(),
            routes
        });
        const users = useUsers();
        users.currentUserId = "1";
        const wrapper = mount(Navbar, {
            global: {
                plugins: [pinia, router]
            }
        });

        expect(wrapper.find('a').text()).toBe('New Post');
        expect(wrapper.find('button').text()).toBe('Log Out');
    });
});