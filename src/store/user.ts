import create, { State } from "zustand";
import { persist } from "zustand/middleware";
import { ref, onValue, set as dbSet, update, remove } from "firebase/database";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { database, auth } from './firebase'

// type Role = {
//   id: number
//   role: string
//   access: string[]
// }

export type User = {
  id: string
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

export type UpdateCredentials = {
  firstname: string
  lastname: string
}

interface UserState extends State {
  users: User[]
  managers: User[]
}

interface UserMethods extends State {
  restoreDefault: () => void
  getUsers: () => Promise<void>
  // getUser: (
  //   uid: string
  // ) => any
  createUser: (
    user: RegisterCredentials
  ) => Promise<any>
  updateUser: (
    user: User
  ) => Promise<any>
  deleteUser: (
    uid: string
  ) => Promise<any>
}

const path = 'users/'
export const useUserStore = create<UserState & UserMethods>(
  persist(
    (set, get) => ({
      users: [],
      managers: [],
      restoreDefault: () => {
        set({
          users: [],
        })
      },
      getUsers: async () => {
        const usersRef = ref(database, path)
        onValue(usersRef, (snapshot) => {
          const data = Object.values(snapshot.val() as User[]) ?? []
          set({
            users: data.filter(u => u.role === 'user'),
            managers: data.filter(u => u.role !== 'user')
          })
        })
      },
      // getUser: (uid) => {
      //   const userRef = ref(database, path + uid)
      //   onValue(userRef, (snapshot) => {
      //     snapshot.val()
      //   });
      // },
      createUser: async (user) => {
        return createUserWithEmailAndPassword(auth, user.email, user.password)
          .then(async (userCredential) => {

            const { uid } = userCredential.user;

            // check if user is the first user
            const getNewUser =
              () => new Promise<RegisterCredentials>((res, rej) => {
                const userRef = ref(database, path)
                onValue(userRef, (snapshot) => {
                  const users = snapshot.val()

                  // make first user the super admin
                  if (Boolean(users) === false) {
                    user.role = 'super-admin'
                  }

                  res(user)
                })
              })

            const { firstname, lastname, email, role } = await getNewUser()
            const newUser = {
              id: uid,
              firstname, lastname, email, role
            }

            dbSet(ref(database, path + uid), newUser)
            return newUser
          })
      },
      updateUser: async (user) => {
        return update(ref(database, path + user.id), user)
      },
      deleteUser: async (uid) => {
        return remove(ref(database, path + uid))
      }
    }), {
    name: 'user'
  })
)