<script setup lang="ts">
import { useTrackersStore, type Tracker } from '@/stores/trackers'
import { computed, onMounted, ref, useTemplateRef } from 'vue'
import ModalWindow from './ModalWindow.vue'

const store = useTrackersStore()

const props = defineProps<{
  tracker: Tracker
}>()

const name = ref(props.tracker.name)

const nameInput = useTemplateRef('tracker-name')

const nameInvalid = computed(() => name.value == null || name.value.match(/^ *$/) !== null)

onMounted(() => {
  nameInput.value?.focus()
})

const emit = defineEmits<{
  close: []
}>()

const renameTracker = (e: Event) => {
  e.preventDefault()
  store.renameTracker(props.tracker, name.value)
  emit('close')
}
</script>

<template>
  <ModalWindow title="Rename Tracker" closable @close="emit('close')">
    <form style="display: contents" @submit="renameTracker">
      <label>Name: <input ref="tracker-name" v-model="name" /></label>
      <input type="submit" class="action-button" value="Rename" :disabled="nameInvalid" />
    </form>
  </ModalWindow>
</template>
