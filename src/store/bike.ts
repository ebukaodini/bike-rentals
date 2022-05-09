import create, { State } from "zustand"
import { persist } from "zustand/middleware"

export type Bike = {
  id: number
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
  getBikes: () => Promise<any>
}

export const useBikeStore = create<BikeState & BikeMethods>(
  persist((get, set) => ({
    bikes: [],
    getBikes: async () => {
      return []
    }
  }), {
    name: 'bike'
  })
)