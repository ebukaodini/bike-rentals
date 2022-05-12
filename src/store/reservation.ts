import { onValue, ref, set as dbSet, update } from "firebase/database";
import create, { State } from "zustand";
import { persist } from "zustand/middleware";
import { Bike } from "./bike";
import { database } from "./firebase";
import { User } from "./user";

export type Reservation = {
  id: number
  bike: Bike['id']
  user: User['id']
  reservedFrom: string
  reservedTo: string
  timestamp: number
  isActive: boolean
}

interface ReservationState extends State {
  reservations: Reservation[]
}

interface ReservationMethods extends State {
  restoreDefault: () => void
  getReservations: () => Promise<void>
  addReservation: (
    reservation: Reservation
  ) => Promise<any>
}

const path = 'reservations/'
export const useReservationStore = create<ReservationState & ReservationMethods>(
  persist((set, get) => ({
    reservations: [],
    restoreDefault: () => {
      set({
        reservations: [],
      })
    },
    getReservations: async () => {
      const usersRef = ref(database, path)
      onValue(usersRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = Object.values(snapshot.val() as Reservation[])
          set({
            reservations: data
          })
        } else {
          set({
            reservations: []
          })
        }
      })
    },
    addReservation: async (reservation) => {
      return await dbSet(ref(database, path + reservation.id), reservation)
        .then(async _=> {
          return await get().getReservations()
        })
    }
  }), {
    name: 'reservation'
  })
)
