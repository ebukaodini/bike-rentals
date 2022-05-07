import create, { State } from "zustand";
import { persist } from "zustand/middleware";
import { ref, onValue, set as dbSet } from "firebase/database";
import { database } from './firebase'
import { generate, verify } from 'password-hash'

type Role = {
  id: number
  role: string
  access: string[]
}

export type User = {
  id: number
  email: string
  password: string
  role: Role
}

interface UserState extends State {
  users: User[]
}

interface UserMethods extends State {
  getUsers: () => Promise<any>
  createUser: (
    user: User
  ) => Promise<any>
}

export const UserStore = create<UserState & UserMethods>(
  persist(
    (get, set) => ({
      users: [],
      getUsers: async () => {

        const usersRef = ref(database, 'users/')
        onValue(usersRef, (snapshot) => {
          const data = snapshot.val()
          console.log(snapshot, data)
        })

        return []
      },
      createUser: async (user) => {

        const passwordHash = generate(user.password, {
          algorithm: 'sha256',
          saltLength: 32
        })

        dbSet(ref(database, 'users/'), {
          ...user,
          password: passwordHash
        }).then(resp => {
          console.log(resp)
        })

      }
    }), {
    name: 'user'
  })
)