<script setup lang="ts">
import { useTrackersStore, type Tracker } from '@/stores/trackers'
import NoTrackers from '@/components/NoTrackers.vue'
import NewTrackerForm from '@/components/NewTrackerForm.vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import TrackerPreview from '@/components/TrackerPreview.vue'
import { usePageTitle } from '@/composables/pageTitle'
import IconAdd from '@/components/icons/IconAdd.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import RemoveTrackerForm from '@/components/RemoveTrackerForm.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import RenameTrackerForm from '@/components/RenameTrackerForm.vue'

const router = useRouter()

const store = useTrackersStore()

const trackersExist = computed(() => store.trackers.length > 0)

const creatingNewTracker = ref(false)
const editing = ref(false)
const removingTracker = ref<Tracker | undefined>()
const renamingTracker = ref<Tracker | undefined>()

const newTrackerCreated = (tracker: Tracker) => {
  creatingNewTracker.value = false
  router.push(`/tracker/${tracker.id}`)
}

usePageTitle({ root: true })
</script>

<template>
  <div class="header">
    Habitual
    <div class="header-buttons">
      <IconCheck v-if="editing && trackersExist" @click="editing = false" />
      <template v-else>
        <IconEdit v-if="trackersExist" @click="editing = true" />
        <IconAdd @click="creatingNewTracker = true" />
      </template>
    </div>
  </div>
  <div class="trackers-list" v-if="trackersExist">
    <TrackerPreview
      v-for="tracker in store.trackers"
      :key="tracker.id"
      :tracker="tracker"
      :editing="editing"
      @remove="(t) => (removingTracker = t)"
      @rename="(t) => (renamingTracker = t)"
    />
  </div>
  <NoTrackers v-else @new-tracker-click="creatingNewTracker = true" />
  <NewTrackerForm
    v-if="creatingNewTracker"
    @tracker-create="newTrackerCreated"
    @close="creatingNewTracker = false"
  />
  <RemoveTrackerForm
    v-if="removingTracker"
    :tracker="removingTracker"
    @close="removingTracker = undefined"
  />
  <RenameTrackerForm
    v-if="renamingTracker"
    :tracker="renamingTracker"
    @close="renamingTracker = undefined"
  />
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-frame-background);
  font-size: 1.5em;
  padding: var(--margin-m);
}

.header-buttons {
  display: flex;
  align-items: center;
  gap: var(--margin-m);
}

.trackers-list {
  display: flex;
  flex-direction: column;
  padding: var(--margin-m);
  gap: var(--margin-m);
}
</style>
