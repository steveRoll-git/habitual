<script setup lang="ts">
import { useTrackersStore, type Tracker } from '@/stores/trackers'
import { ref } from 'vue'

const store = useTrackersStore()

const name = ref('')

const emit = defineEmits<{
  trackerCreate: [tracker: Tracker]
}>()

const createTracker = () => {
  const newTracker = {
    name: name.value,
    dateCreated: Date.now(),
    dateReset: Date.now()
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
