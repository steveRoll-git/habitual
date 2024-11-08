import { defineStore } from 'pinia'
import { reactive } from 'vue'

const STORAGE_KEY = 'trackers'

export type Tracker = {
  id: number
  name: string
  dateCreated: number
  resets: number[]
}

export type TrackerBest = {
  duration: number
  date: number
}

export const useTrackersStore = defineStore('trackers', () => {
  const trackerBests = reactive(new Map<Tracker, TrackerBest>())

  const calculateBest = (tracker: Tracker) => {
    if (tracker.resets.length > 0) {
      const intervals: TrackerBest[] = []
      for (let i = 0; i < tracker.resets.length; i++) {
        intervals.push({
          duration: tracker.resets[i] - (i == 0 ? tracker.dateCreated : tracker.resets[i - 1]),
          date: tracker.resets[i]
        })
      }
      intervals.sort((a, b) => b.duration - a.duration)
      trackerBests.set(tracker, intervals[0])
    }
  }

  const loadedTrackersString = localStorage.getItem(STORAGE_KEY)
  let loadedTrackers: Tracker[] = []
  if (loadedTrackersString) {
    loadedTrackers = JSON.parse(loadedTrackersString)
  }
  const trackers = reactive<Tracker[]>(loadedTrackers)
  trackers.forEach(calculateBest)

  const writeToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trackers))
  }

  const createNewTracker = (name: string) => {
    const newTracker = reactive<Tracker>({
      id: (trackers[trackers.length - 1]?.id ?? 0) + 1,
      name,
      dateCreated: Date.now(),
      resets: []
    })
    trackers.push(newTracker)
    writeToStorage()
    return newTracker
  }

  const removeTracker = (tracker: Tracker) => {
    trackers.splice(trackers.indexOf(tracker), 1)
    writeToStorage()
  }

  const getTrackerByID = (id: number) => {
    return trackers.find((t) => t.id == id)
  }

  const resetTracker = (tracker: Tracker) => {
    tracker.resets.push(Date.now())
    calculateBest(tracker)
    writeToStorage()
  }

  return { trackers, createNewTracker, removeTracker, resetTracker, trackerBests, getTrackerByID }
})
