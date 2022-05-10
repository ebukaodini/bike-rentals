import { deleteUser, signInWithEmailAndPassword } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import create, { State } from "zustand";
import { persist } from "zustand/middleware";
import { User, useUserStore, useBikeStore, RegisterCredentials } from "./";
import { auth, database } from './firebase'
import { useReservationStore } from "./reservation";

export type LoginCredentials = {
  email: string
  password: string
}

interface AuthState extends State {
  user?: User
  authenticated: boolean
}

interface AuthMethods extends State {
  restoreDefault: () => void
  createAccount: (
    user: RegisterCredentials
  ) => Promise<any>
  login: (
    credential: LoginCredentials
  ) => Promise<any>
  logout: () => void
}

export const useAuthStore = create<AuthState & AuthMethods>(
  persist(
    (set, get) => ({
      authenticated: false,
      user: undefined,
      restoreDefault: () => {
        set({
          authenticated: false,
          user: undefined,
        })
      },
      createAccount: async (user) => {
        return useUserStore.getState().createUser(user)
          .then(user => {
            set({
              authenticated: true,
              user: user
            })
          })
      },
      login: async (credential) => {
        return signInWithEmailAndPassword(auth, credential.email!, credential.password!)
          .then(async (userCredential) => {
            const { uid } = userCredential.user;

            const getUser =
              () => new Promise<User>((res, rej) => {
                const userRef = ref(database, 'users/' + uid)
                onValue(userRef, async (snapshot) => {
                  const user = snapshot.val()

                  if (user !== null) {
                    set({
                      authenticated: true,
                      user: user
                    })

                    // get dashboard data
                    if (user.role! !== 'user') {
                      await Promise.all([
                        useUserStore.getState().getUsers(),
                        useBikeStore.getState().getBikes(),
                        useReservationStore.getState().getReservations()
                      ])
                    }

                    res(user)
                  } else {
                    const user = auth.currentUser
                    await deleteUser(user!)
                    rej(new Error('User has been deleted'))
                  }
                })
              })

            return await getUser()
          })
      },
      logout: () => {
        auth.signOut().then(_ => {
          get().restoreDefault()
          useUserStore.getState().restoreDefault()
          useBikeStore.getState().restoreDefault()
          useReservationStore.getState().restoreDefault()
        })
      }
    }), {
    name: 'auth'
  })
)