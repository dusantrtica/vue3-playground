import {mount} from '@vue/test-utils';
import { describe, it, expect} from 'vitest';
import FormInput from './FormInput.vue';

describe("FormINput", () => {
    it('renders some errors', () => {
        const wrapper = mount(FormInput, {
            props: {
                name: 'foo',
                modelValue: 'bar',
                status: {
                   valid: false, 
                },
                type: 'input'
            }
        });
        expect(wrapper.find('.is-danger').exists()).toBe(true);
    });

    it('renders no errors', () => {
        const wrapper = mount(FormInput, {
            props: {
                name: 'foo',
                modelValue: 'bar',
                status: {
                   valid: true, 
                },
                type: 'input'
            }
        });
        expect(wrapper.find('.is-danger').exists()).toBe(false);
    });
});