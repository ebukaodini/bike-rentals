import { onValue, set as dbSet, ref, remove, update } from "firebase/database"
import create, { State } from "zustand"
import { persist } from "zustand/middleware"
import { database } from "./firebase"

// These could be stored in a server and updated by the managers
// but for the sakeof this project, they'd be made constants
export const bikeModels = [
  'Kids Bikes', 'Urban/Trekking Bikes', 'Cross & Gravel Bikes',
  'Road Bikes', 'Mountain Bikes', 'E-Bikes'
]

export const availableLocations = [
  'Tokyo', 'Delhi', 'Shanghai', 'São Paulo', 'Mexico City', 'Lagos',
  'Cairo', 'Mumbai', 'Beijing', 'Dhaka', 'Osaka', 'New York'
]

export const bikeColors = [
  'Black', 'Blue', 'Green', 'Red', 'White', 'Pink', 'Yellow', 'Grey'
]


export type Bike = {
  id: number
  description: string
  model: string
  color: string
  location: string
  rating: number
  ratingCount: number
  isAvailable: boolean
}

interface BikeState extends State {
  bikes: Bike[]
}

interface BikeMethods extends State {
  restoreDefault: () => void
  getBikes: () => Promise<void>
  createBike: (
    bike: Bike
  ) => Promise<any>
  updateBike: (
    bike: Bike
  ) => Promise<any>
  deleteBike: (
    bike: Bike
  ) => Promise<any>
}

const path = 'bikes/'
export const useBikeStore = create<BikeState & BikeMethods>(
  persist((set, get) => ({
    bikes: [],
    restoreDefault: () => {
      set({
        bikes: [],
      })
    },
    getBikes: async () => {
      const usersRef = ref(database, path)
      onValue(usersRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = Object.values(snapshot.val() as Bike[])
          set({
            bikes: data
          })
        } else {
          set({
            bikes: []
          })
        }
      })
    },
    createBike: async (bike) => {
      return await dbSet(ref(database, path + bike.id), bike)
        .then(async _ => {
          return await get().getBikes()
        })
    },
    updateBike: async (bike) => {
      return await update(ref(database, path + bike.id), bike)
        .then(async _ => {
          return await get().getBikes()
        })
    },
    deleteBike: async (bike) => {
      return await remove(ref(database, path + bike.id))
        .then(async _ => {
          return await get().getBikes()
        })
    }
  }), {
    name: 'bike'
  })
)