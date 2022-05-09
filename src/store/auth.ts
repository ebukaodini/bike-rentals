import { signInWithEmailAndPassword } from "firebase/auth";
import create, { State } from "zustand";
import { persist } from "zustand/middleware";
import { User, useUserStore, RegisterCredentials } from "./";
import { auth } from './firebase'

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
            console.log(userCredential.user);
          })
          .catch((error) => {
            throw error
          })
      }
    }), {
    name: 'auth'
  })
)