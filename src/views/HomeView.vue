<script setup lang="ts">
import { useTrackersStore, type Tracker } from '@/stores/trackers'
import NoTrackers from '@/components/NoTrackers.vue'
import NewTrackerForm from '@/components/NewTrackerForm.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

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
  <template v-if="store.trackers.length > 0">
    <div v-for="tracker in store.trackers" :key="tracker.dateCreated">
      <RouterLink :to="`/tracker/${tracker.id}`">
        {{ tracker.name }} created at {{ new Date(tracker.dateCreated).toLocaleDateString() }}
      </RouterLink>
    </div>
  </template>
  <NewTrackerForm
    v-else-if="creatingNewTracker"
    @tracker-create="newTrackerCreated"
    @close="() => (creatingNewTracker = false)"
  />
  <NoTrackers v-else @new-tracker-click="creatingNewTracker = true" />
</template>
