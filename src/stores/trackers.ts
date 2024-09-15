import { defineStore } from 'pinia'
import { reactive } from 'vue'

const STORAGE_KEY = 'trackers'

export type Tracker = {
  name: string
  dateCreated: number
  dateReset: number
}

export const useTrackersStore = defineStore('trackers', () => {
  const loadedTrackersString = localStorage.getItem(STORAGE_KEY)
  let loadedTrackers: Tracker[] = []
  if (loadedTrackersString) {
    loadedTrackers = JSON.parse(loadedTrackersString)
  }
  const trackers = reactive<Tracker[]>(loadedTrackers)

  const writeToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trackers))
  }

  const createNewTracker = (tracker: Tracker) => {
    trackers.push(tracker)
    writeToStorage()
  }

  const resetTracker = (tracker: Tracker) => {
    tracker.dateReset = Date.now()
    writeToStorage()
  }

  return { trackers, writeToStorage, createNewTracker, resetTracker }
})
