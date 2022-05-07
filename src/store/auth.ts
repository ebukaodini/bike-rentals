import create, { State } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "./user";

interface AuthState extends State {
  user?: User
  authenticated: boolean
}

interface AuthMethods extends State {
  createAccount: () => Promise<any>
  login: () => Promise<any>
}

export const UserStore = create<AuthState & AuthMethods>(
  persist(
    (get, set) => ({
      authenticated: false,
      user: undefined,
      createAccount: async () => {
        return
      },
      login: async () => {
        return
      }
    }), {
    name: 'auth'
  })
)