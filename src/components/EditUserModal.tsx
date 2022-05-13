import { useEffect, useState } from "react"
import { UpdateCredentials, useModalStore, User, useUserStore } from "../store"

export const EditUserModal: React.FC<{ user: User, role: string }> = ({ user, role }) => {

  const { updateUser } = useUserStore()
  const [credentials, setCredentials] = useState<UpdateCredentials>({
    firstname: '',
    lastname: ''
  })
  const [errors, setErrors] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { closeModal, toast } = useModalStore()

  const handleChange = (input: string, value: string) => {
    setCredentials({ ...credentials, [input]: value })
  }
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    // validate inputs
    let errorLog = []
    if (credentials.firstname.trim().length === 0) errorLog.push('Please enter a firstname.')
    if (credentials.lastname.trim().length === 0) errorLog.push('Please enter a lastname.')

    setErrors(errorLog)
    if (errorLog.length > 0) return

    setIsSubmitting(true)
    updateUser({
      ...user,
      ...credentials
    })
      .then(_ => {
        setIsSubmitting(false)
        toast('Account updated successfully.')
        closeModal()
      })
      .catch(error => {
        setIsSubmitting(false)
        setErrors([error.message])
      })

  }
  const handleCancel = () => {
    setErrors([])
    setCredentials({
      firstname: '',
      lastname: ''
    })
  }

  useEffect(() => {
    setCredentials({
      firstname: user.firstname,
      lastname: user.lastname
    })
  }, [user.firstname, user.lastname])

  return (
    <form onSubmit={handleSubmit} className="py-2">
      <div className="d-flex justify-content-between mb-lg-3">
        <h4 className="fw-bold">Update {role === 'user' ? 'User' : 'Manager'}</h4>

        <button type="button"
          name="Close"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={handleCancel}
        />
      </div>

      {
        errors.length > 0 &&
        <ul className="w-100 alert alert-danger py">
          {
            errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))
          }
        </ul>
      }

      <div className="bg-white shadow-sm p-3">
        <div className="mb-3">
          <label className="mb-1" htmlFor="firstname">First name</label>
          <input value={credentials.firstname} disabled={isSubmitting} required onChange={(e) => handleChange('firstname', e.target.value)} type="text" className="form-control py-2 px-3 text-dark" id="firstname" placeholder="Jane" />
        </div>

        <div className="mb-3">
          <label className="mb-1" htmlFor="lastname">Last name</label>
          <input value={credentials.lastname} disabled={isSubmitting} required onChange={(e) => handleChange('lastname', e.target.value)} type="text" className="form-control py-2 px-3 text-dark" id="lastname" placeholder="Doe" />
        </div>

        <div className="text-center">
          <button aria-label="Update account" disabled={isSubmitting} type="submit" className="btn btn-primary form-control mb-2">
            {isSubmitting
              ?
              <>
                <span className="spinner-grow spinner-grow-sm me-3" role="status" aria-hidden="true" />
                Updating account...
              </>
              : 'Update'}
          </button>
        </div>
      </div>
    </form>
  )
}