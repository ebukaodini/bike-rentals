import { signInWithEmailAndPassword } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import create, { State } from "zustand";
import { persist } from "zustand/middleware";
import { User, useUserStore, RegisterCredentials } from "./";
import { auth, database } from './firebase'

export type LoginCredentials = {
  email: string
  password: string
}

interface AuthState extends State {
  user?: User
  authenticated: boolean
}

interface AuthMethods extends State {
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
          .then((userCredential) => {
            const { uid } = userCredential.user;

            const userRef = ref(database, 'users/' + uid)
            onValue(userRef, (snapshot) => {
              const user = snapshot.val()
              set({
                authenticated: true,
                user: user
              })
            })
          })
      },
      logout: () => {
        auth.signOut().then(_ => {
          set({
            authenticated: false,
            user: undefined
          })
        })
      }
    }), {
    name: 'auth'
  })
)