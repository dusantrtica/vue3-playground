<script setup lang="ts">
import { Post, TimelinePost } from '../posts';

defineProps<{
    post: TimelinePost
}>();

</script>

<template>
    <a class="panel-block is-flex is-flex-direction-column is-align-items-flex-start">
        <a href="">{{ post.title }}</a>
        <div>{{ post.created.toFormat('d MMM') }}</div>
    </a>
</template>