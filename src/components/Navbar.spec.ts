import {mount} from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach} from 'vitest';
import FormInput from './FormInput.vue';
import { defineComponent, computed, ref, createRenderer } from 'vue';
import Navbar from './Navbar.vue';
import { createPinia, setActivePinia } from 'pinia';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '../router';
import { useUsers } from '../stores/users';
import { Router } from 'express';

vi.stubGlobal('fetch', vi.fn(()=>{}));

describe("Navbar", () => {
    let pinia: Pinia
    let router: Router
    beforeEach(() => {
        const el = document.createElement('div');
        el.id = 'modal';
        document.body.appendChild(el);
        pinia = createPinia();
        router = createRouter({
            history: createMemoryHistory(),
            routes
        });
        setActivePinia(pinia);
    });
    it('renders', () => {
        const wrapper = mount(Navbar, {
            global: {
                plugins: [pinia, router]
            }
        });
        expect(wrapper.find("#sign-up").exists()).toBe(true);
        expect(wrapper.find('[data-testid="sign-in"').exists()).toBe(true);
    });

    it('renders signin and sign up when not authenticated', async () => {
        const users = useUsers();
        users.currentUserId = "1";
        const wrapper = mount(Navbar, {
            global: {
                plugins: [pinia, router]
            }
        });

        expect(wrapper.find('a').text()).toBe('New Post');
        expect(wrapper.find('button').text()).toBe('Log Out');

        await wrapper.find("#logout").trigger('click');
    });

    
});