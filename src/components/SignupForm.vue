<script lang="ts" setup>
import FormInput from '../components/FormInput.vue';
import { computed, ref } from '@vue/reactivity';
import { validate, length, required } from '../validation';
import { NewUser } from '../users';
import { useUsers } from '../stores/users';
import { useModal } from '../composables/modal';

const username = ref('');

const usernameStatus = computed(() => {
    return validate(username.value, [required, length({ min: 5, max: 10 })])
});

const password = ref('');

const passwordStatus = computed(() => {
    return validate(password.value, [required, length({ min: 10, max: 40 })])
});

const isInvalid = computed(() => {
    return !usernameStatus.value.valid || !passwordStatus.value.valid;
});

const usersStore = useUsers();

const modal = useModal();

async function handleSubmit(event: Event) {
    // to prevent page from reloading, either to this
    // or submit.prevent = action 
    event.preventDefault();
    const newUser: NewUser = {
        username: username.value,
        password: password.value
    };
    try {
        await usersStore.createUser(newUser);
    } catch(e) {}

    modal.hideModal();
}

</script>
<template>
    <form action="" class="form" @submit.prevent="handleSubmit">
        <FormInput type="text" v-model="username" name="Username" :status="usernameStatus" />
        <FormInput type="password" v-model="password" name="password" :status="passwordStatus" />
        <button class="button" :disabled="isInvalid">Submit</button>
    </form>
</template>

<style scoped>
.form {
    background: white;
    padding: 30px;
    margin-top: 40px;
}
</style>