<script setup lang="ts">
import { useTrackersStore } from '@/stores/trackers'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TrackerFullscreen from '@/components/TrackerFullscreen.vue'
import { usePageTitle } from '@/composables/pageTitle'

const route = useRoute()

const store = useTrackersStore()

const tracker = computed(() => store.getTrackerByID(Number(route.params.id)))

usePageTitle({
  subPageTitle: computed(() => tracker.value?.name ?? 'Deleted Tracker')
})
</script>

<template>
  <TrackerFullscreen v-if="tracker" :tracker="tracker" />
  <div v-else>This tracker was deleted.</div>
</template>
