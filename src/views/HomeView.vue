<script setup lang="ts">
import { useTrackersStore, type Tracker } from '@/stores/trackers'
import NoTrackers from '@/components/NoTrackers.vue'
import NewTrackerForm from '@/components/NewTrackerForm.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import TrackerPreview from '@/components/TrackerPreview.vue'

const router = useRouter()

const store = useTrackersStore()

const creatingNewTracker = ref(false)

const newTrackerCreated = (tracker: Tracker) => {
  creatingNewTracker.value = false
  router.push(`/tracker/${tracker.id}`)
}

onMounted(() => {
  document.title = 'Habitual'
})
</script>

<template>
  <div class="trackers-list" v-if="store.trackers.length > 0">
    <TrackerPreview v-for="tracker in store.trackers" :key="tracker.id" :tracker="tracker" />
  </div>
  <NewTrackerForm
    v-else-if="creatingNewTracker"
    @tracker-create="newTrackerCreated"
    @close="() => (creatingNewTracker = false)"
  />
  <NoTrackers v-else @new-tracker-click="creatingNewTracker = true" />
</template>

<style scoped>
.trackers-list {
  display: flex;
  flex-direction: column;
  padding: var(--margin-m);
  gap: var(--margin-m);
}
</style>
