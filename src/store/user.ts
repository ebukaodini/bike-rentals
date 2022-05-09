import create, { State } from "zustand";
import { persist } from "zustand/middleware";
import { ref, onValue, set as dbSet } from "firebase/database";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { database, auth } from './firebase'

// type Role = {
//   id: number
//   role: string
//   access: string[]
// }

export type User = {
  id: number
  firstname: string
  lastname: string
  email: string
  role: string
}

export type RegisterCredentials = {
  firstname: string
  lastname: string
  email: string
  password: string
  role: string
}

interface UserState extends State {
  users: User[]
}

interface UserMethods extends State {
  getUsers: () => Promise<any>
  createUser: (
    user: RegisterCredentials
  ) => Promise<any>
}

export const useUserStore = create<UserState & UserMethods>(
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

        return createUserWithEmailAndPassword(auth, user.email, user.password)
          .then((userCredential) => {
            const { uid } = userCredential.user;
            const { firstname, lastname, email, role } = user
            const newUser = {
              id: uid,
              firstname, lastname, email, role
            }

            dbSet(ref(database, 'users/' + uid), newUser)
            return newUser
          })
          .catch((error) => {
            throw error
          });
      },
    }), {
    name: 'user'
  })
)