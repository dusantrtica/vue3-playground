<script setup lang="ts">
import { ref, computed } from 'vue';
import { DateTime } from 'luxon';
import TimelineItem from './TimelineItem.vue';
import { usePosts } from '../stores/posts';
import { today, thisWeek, thisMonth, Post, TimelinePost } from '../posts';
import { periods, Period} from '../constants';
const postsStore = usePosts()

await postsStore.fetchPosts()

</script>

<template>        
    <nav class="is-primary panel">
        <span class="panel-tabs">
            <a v-for="period in periods" :key="period" :class="{ 'is-active': period === postsStore.selectedPeriod }"
                @click="postsStore.setSelectedPeriod(period)">{{ period }}</a>
        </span>
        <TimelineItem v-for="post of postsStore.filteredPosts" :key="post.id" :post="post" />
    </nav>
</template>
