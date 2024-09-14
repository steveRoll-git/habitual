<script setup lang="ts">
import { useTrackersStore } from '@/stores/trackers'
import NoTrackers from '@/components/NoTrackers.vue'
import NewTracker from '@/components/NewTracker.vue'
import { ref } from 'vue'

const store = useTrackersStore()

const creatingNewTracker = ref(false)
</script>

<template>
  <template v-if="store.trackers.length > 0">
    <div v-for="tracker in store.trackers" :key="tracker.dateCreated">
      {{ tracker.name }} created at {{ new Date(tracker.dateCreated).toLocaleDateString() }}
    </div>
  </template>
  <NoTrackers v-else @new-tracker-click="creatingNewTracker = true" />

  <NewTracker v-if="creatingNewTracker" @tracker-create="creatingNewTracker = false" />
</template>

<style scoped></style>
