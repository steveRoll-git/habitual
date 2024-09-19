<script setup lang="ts">
import { useTrackersStore, type Tracker } from '@/stores/trackers'
import { computed, onMounted, ref, useTemplateRef } from 'vue'
import ModalWindow from './ModalWindow.vue'

const store = useTrackersStore()

const name = ref('')

const nameInput = useTemplateRef('tracker-name')

const nameInvalid = computed(() => name.value == null || name.value.match(/^ *$/) !== null)

onMounted(() => {
  nameInput.value?.focus()
})

const emit = defineEmits<{
  trackerCreate: [tracker: Tracker]
}>()

const createTracker = (e: Event) => {
  e.preventDefault()
  const newTracker = store.createNewTracker(name.value.trim())
  emit('trackerCreate', newTracker)
}
</script>

<template>
  <ModalWindow title="Create New Tracker" closable>
    <form style="display: contents" @submit="createTracker">
      <label>I want to stop <input ref="tracker-name" v-model="name" /></label>
      <input type="submit" class="action-button" value="Create" :disabled="nameInvalid" />
    </form>
  </ModalWindow>
</template>
