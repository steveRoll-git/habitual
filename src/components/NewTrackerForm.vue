<script setup lang="ts">
import { useTrackersStore, type Tracker } from '@/stores/trackers'
import { ref } from 'vue'

const store = useTrackersStore()

const name = ref('')

const emit = defineEmits<{
  trackerCreate: [tracker: Tracker]
}>()

const createTracker = () => {
  const newTracker: Tracker = {
    id: (store.trackers[store.trackers.length - 1]?.id ?? 0) + 1,
    name: name.value,
    dateCreated: Date.now(),
    resets: []
  }
  store.createNewTracker(newTracker)

  emit('trackerCreate', newTracker)
}
</script>

<template>
  <div>
    <label>Name:<input v-model="name" /></label>
    <button @click="createTracker">Create</button>
  </div>
</template>
