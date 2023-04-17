<script lang="ts" setup>
import { TimelinePost } from '../posts';
import { ref, onMounted, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { marked } from 'marked';
import highlightjs from 'highlight.js';
import debounce from 'lodash/debounce';
import { usePosts } from '../stores/posts';

const posts = usePosts();

const props = defineProps<{
    post: TimelinePost
}>();

const title = ref(props.post.title);
const contentEditable = ref<HTMLDivElement>();
const content = ref(props.post.markdown);
const html = ref('');
const router = useRouter();

function parseHtml(markdown: string) {
    marked.parse(markdown, {
        gfm: true,
        breaks: true,
        highlight: (code) => {
            return highlightjs.highlightAuto(code).value
        }
    }, (err, parseResult) => {
        html.value = parseResult;
    });
}

onMounted(() => {
    if (!contentEditable.value) {
        throw Error("ContentEditable DOM node was not found");
    }
    contentEditable.value.innerText = content.value;
});


watch(content, debounce((newContent) => {
    parseHtml(newContent)
}, 250), {
    immediate: true
});

const handleInput = () => {
    if (!contentEditable.value) {
        throw Error('Content Editable DOM node was not found.');
    }
    content.value = contentEditable.value?.innerText;
}

async function handleSave() {
    const newPost: TimelinePost = {
        ...props.post,
        title: title.value,
        markdown: content.value,
        html: html.value
    }
    await posts.createPost(newPost);
    router.push('/');
}

</script>
<template>
    <div class="columns">
        <div class="column">
            <div class="field">
                <div class="label">
                    Post Title
                </div>
                <input type="text" class="input" v-model="title">
            </div>
        </div>
    </div>
    <div class="columns">
        <div class="column">
            <div contenteditable ref="contentEditable" @input="handleInput()" />
        </div>
        <div class="column">
            <div v-html="html" />
        </div>
    </div>
    <div class="columns">
        <div class="column">
            <button class="button is-primary is-pulled-right" @click="handleSave">
                Save Post
            </button>
        </div>
    </div>
</template>