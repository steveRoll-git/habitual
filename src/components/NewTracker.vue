<script setup lang="ts">
import { useTrackersStore } from '@/stores/trackers'
import { ref } from 'vue'

const store = useTrackersStore()

const name = ref('')

const emit = defineEmits<{
  trackerCreate: []
}>()

const createTracker = () => {
  store.trackers.push({
    name: name.value,
    dateCreated: Date.now(),
    dateReset: Date.now()
  })

  store.writeToStorage()

  emit('trackerCreate')
}
</script>

<template>
  <div>
    <label>Name:<input v-model="name" /></label>
    <button @click="createTracker">Create</button>
  </div>
</template>
