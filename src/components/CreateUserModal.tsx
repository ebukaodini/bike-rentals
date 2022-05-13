import { useState } from "react"
import { Eye, EyeOff } from "react-feather"
import isEmail from "validator/lib/isEmail"
import { RegisterCredentials, useModalStore, useUserStore } from "../store"

export const CreateUserModal: React.FC<{ role: string }> = ({ role }) => {

  const { createUser, getUsers } = useUserStore()
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: role
  })
  const [errors, setErrors] = useState<string[]>([])
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { closeModal, toast } = useModalStore()

  const toggleShowPassword = () => setShowPassword(!showPassword)
  const handleChange = (input: string, value: string) => {
    setCredentials({ ...credentials, [input]: value })
  }
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    // validate inputs
    let errorLog = []
    if (credentials.firstname.trim().length === 0) errorLog.push('Please enter a firstname.')
    if (credentials.lastname.trim().length === 0) errorLog.push('Please enter a lastname.')
    if (!isEmail(credentials.email)) errorLog.push('Please enter a valid email.')
    if (credentials.password.trim().length < 6) errorLog.push('Password must be atleast 6 characters.')

    setErrors(errorLog)
    if (errorLog.length > 0) return

    setIsSubmitting(true)
    createUser(credentials)
      .then(async _ => {
        setIsSubmitting(false)
        await getUsers()
        toast('Account created successfully.')
        toast(
          <>
            <b>Login Credentials</b>
            <p className="m-0">
              Email: {credentials.email} <br />
              Password: {credentials.password}
            </p>
          </>,
          'danger', false
        )
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
      lastname: '',
      email: '',
      password: '',
      role: role
    })
  }

  return (
    <form onSubmit={handleSubmit} className="py-2">
      <div className="d-flex justify-content-between mb-lg-3">
        <h4 className="fw-bold">Create {role === 'user' ? 'User' : 'Manager'}</h4>

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
          <input disabled={isSubmitting} required onChange={(e) => handleChange('firstname', e.target.value)} type="text" className="form-control py-2 px-3 text-dark" id="firstname" placeholder="Jane" />
        </div>

        <div className="mb-3">
          <label className="mb-1" htmlFor="lastname">Last name</label>
          <input disabled={isSubmitting} required onChange={(e) => handleChange('lastname', e.target.value)} type="text" className="form-control py-2 px-3 text-dark" id="lastname" placeholder="Doe" />
        </div>

        <div className="mb-3">
          <label className="mb-1" htmlFor="email">Email address</label>
          <input disabled={isSubmitting} required onChange={(e) => handleChange('email', e.target.value)} type="email" className="form-control py-2 px-3 text-dark" id="email" placeholder="jane.doe@example.com" />
        </div>

        <div className="mb-4">
          <label className="mb-1" htmlFor="password">Password</label>

          <div className="position-relative">
            <input disabled={isSubmitting} required onChange={(e) => handleChange('password', e.target.value)} type={showPassword ? 'text' : 'password'} className="form-control py-2 px-3 text-dark" id="password" placeholder="********" />
            <button aria-label="Toggle password" type="button" onClick={toggleShowPassword} title='Toggle password' className="bg-transparent border-0 position-absolute top-50 end-0 translate-middle p-0 pb-1">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

        </div>

        <div className="text-center">
          <button aria-label="Create account" disabled={isSubmitting} type="submit" className="btn btn-primary form-control mb-2">
            {isSubmitting
              ?
              <>
                <span className="spinner-grow spinner-grow-sm me-3" role="status" aria-hidden="true" />
                Creating account...
              </>
              : 'Create'}
          </button>
        </div>
      </div>
    </form>
  )
}