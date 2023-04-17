import { ref, shallowRef } from 'vue';
import SignupFormVue from '../components/SignupForm.vue';
import HelloWorldVue from '../components/HelloWorld.vue';

const show = ref(false);

const component = shallowRef();

export function useModal() {
    return {
        show,
        component,
        showModal: (type: 'signUp' | 'signIn') => {
            show.value = true
            switch(type) {
                case 'signIn': return component.value = HelloWorldVue;
                case 'signUp': return component.value = SignupFormVue;
            }
        },
        hideModal: () => show.value = false
    }
}