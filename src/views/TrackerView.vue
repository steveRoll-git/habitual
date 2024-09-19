<script setup lang="ts">
import { useTrackersStore } from '@/stores/trackers'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import TrackerFullscreen from '@/components/TrackerFullscreen.vue'

const route = useRoute()

const store = useTrackersStore()

const tracker = computed(() => store.getTrackerByID(Number(route.params.id)))

watch(
  tracker,
  (t) => {
    if (t) {
      document.title = `${t.name} | Habitual`
    }
  },
  { immediate: true }
)
</script>

<template>
  <TrackerFullscreen v-if="tracker" :tracker="tracker" />
  <div v-else>This tracker was deleted.</div>
</template>
