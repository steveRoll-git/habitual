<script setup lang="ts">
const emit = defineEmits<{
  newTrackerClick: []
}>()
</script>

<template>
  <div>Looks like you don't have any trackers yet.</div>
  <button @click="emit('newTrackerClick')">Add Tracker</button>
</template>
