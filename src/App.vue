<script setup lang="ts">
import { useTrackersStore, type Tracker } from '@/stores/trackers'
import NoTrackers from '@/components/NoTrackers.vue'
import NewTrackerForm from '@/components/NewTrackerForm.vue'
import TrackerFullscreen from '@/components/TrackerFullscreen.vue'
import { ref } from 'vue'

const store = useTrackersStore()

const creatingNewTracker = ref(false)

const fullscreenTracker = ref<Tracker | null>(store.trackers[0])

const newTrackerCreated = (tracker: Tracker) => {
  creatingNewTracker.value = false
  fullscreenTracker.value = tracker
}
</script>

<template>
  <TrackerFullscreen v-if="fullscreenTracker" :tracker="fullscreenTracker" />
  <template v-else-if="store.trackers.length > 0">
    <div v-for="tracker in store.trackers" :key="tracker.dateCreated">
      {{ tracker.name }} created at {{ new Date(tracker.dateCreated).toLocaleDateString() }}
    </div>
  </template>
  <NoTrackers v-else @new-tracker-click="creatingNewTracker = true" />

  <NewTrackerForm v-if="creatingNewTracker" @tracker-create="newTrackerCreated" />
</template>

<style scoped></style>
