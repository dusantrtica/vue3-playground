<script lang="ts" setup>
import { useModal } from '../composables/modal';
import { useUsers } from '../stores/users';
import SignupForm from './UserForm.vue';

const modal = useModal();
const usersStore = useUsers();

</script>
<template>
    <div class="navbar">
        <div class="navbar-end">
            <div v-if="usersStore.currentUserId" class="buttons">                
                <RouterLink to="/posts/new" class="button">New Post</RouterLink>
                <button id="logout" class="button" @click="usersStore.logout()">Log Out</button>
            </div>

            <div v-else class="buttons">
                <button id="sign-up" class="button" @click="modal.showModal('signUp')">Sign Up</button>
                <button data-testid="sign-in" class="button" @click="modal.showModal('signIn')">Sign In</button>
            </div>

        </div>
    </div>

    <Teleport to="#modal">
        <component :is="modal.component.value" />
    </Teleport>
</template>