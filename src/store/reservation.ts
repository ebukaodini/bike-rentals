import create, { State } from "zustand";
import { persist } from "zustand/middleware";
import { Bike } from "./bike";
import { User } from "./user";

export type Reservation = {
  id: number
  bike: Bike['id']
  user: User['id']
  reservedFrom: Date
  reservedTo: Date
  timestamp: Date
  isActive: boolean
}

interface ReservationState extends State {
  reservations: Reservation[]
}

interface ReservationMethods extends State {
  getReservations: () => Promise<any>
}

export const ReservationStore = create<ReservationState & ReservationMethods>(
  persist((get, set) => ({
    reservations: [],
    getReservations: async () => {
      return []
    }
  }), {
    name: 'reservation'
  })
)
