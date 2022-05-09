import styled from "styled-components"
import { PageWrapper } from "../components"
import Logo from '../assets/logo.svg'
import { useState } from "react"
import { useAuthStore, LoginCredentials } from "../store"
import { Eye, EyeOff } from "react-feather"
import isEmail from 'validator/lib/isEmail'
import { Link, useHistory } from "react-router-dom"

const FormWrapper = styled.div`
  @media (min-width: 768px) {
    width: 45%;
    margin: auto;
  }
`
const LogoWrapper = styled.div`
  height: 70px;
  width: fit-content;
`
const Form = styled.form``

export const Login: React.FC<{}> = () => {
  const { login } = useAuthStore()
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<string[]>([])
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { push } = useHistory()

  const toggleShowPassword = () => setShowPassword(!showPassword)
  const handleChange = (input: string, value: string) => {
    setCredentials({ ...credentials, [input]: value })
  }
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    // validate inputs
    let errorLog = []
    if (!isEmail(credentials?.email!)) errorLog.push('Please enter a valid email.')
    if (credentials?.password!.length < 6) errorLog.push('Password must be atleast 6 characters.')

    setErrors(errorLog)
    if (errorLog.length > 0) return

    setIsSubmitting(true)
    login(credentials)
      .then(_ => {
        setIsSubmitting(false)
        const user = useAuthStore.getState().user!
        if (user.role === 'user')
          push('/')
        else push('/dashboard')
      })
      .catch(error => {
        setIsSubmitting(false)
        setErrors([error.message])
      })

  }

  return (
    <div>
      <PageWrapper>

        <FormWrapper className="h-100 d-flex align-items-center justify-content-center">

          <Form onSubmit={handleSubmit} className="w-100 bg-white shadow-sm px-lg-4 pt-lg-4 pb-lg-5">

            <LogoWrapper className="w-100 d-flex justify-content-center mb-lg-3">
              <img src={Logo} alt="Bike Rentals" title="Bike Rentals" className="mb-5 w-100 h-100 text-primary" />
            </LogoWrapper>

            <div className="mb-lg-4 text-center">
              <h1 className="fw-bold">Welcome Back</h1>
              <p>Log into your account to reserve a bike.</p>
            </div>

            {
              errors.length > 0 &&
              <div className="w-100 alert alert-danger py">
                {
                  errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))
                }
              </div>
            }

            <div className="mb-3">
              <label className="mb-1" htmlFor="email">Email address</label>
              <input disabled={isSubmitting} required onChange={(e) => handleChange('email', e.target.value)} type="email" className="form-control py-2 px-3 text-dark" id="email" placeholder="jane.doe@example.com" />
            </div>

            <div className="mb-4">
              <label className="mb-1" htmlFor="password">Password</label>

              <div className="position-relative">
                <input disabled={isSubmitting} required onChange={(e) => handleChange('password', e.target.value)} type={showPassword ? 'text' : 'password'} className="form-control py-2 px-3 text-dark" id="password" placeholder="********" />
                <button type="button" onClick={toggleShowPassword} title='Toggle password' className="bg-transparent border-0 position-absolute top-50 end-0 translate-middle p-0 pb-1">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

            </div>

            <div className="text-center">
              <button disabled={isSubmitting} type="submit" className="btn btn-lg btn-primary form-control mb-2">
                {isSubmitting
                  ?
                  <>
                    <span className="spinner-grow spinner-grow-sm me-3" role="status" aria-hidden="true" />
                    Logging in...
                  </>
                  : 'Login'}
              </button>
              <span>Don't have an account? <Link to='/register' className="text-dark">Create Account</Link>.</span>
            </div>

          </Form>

        </FormWrapper>

      </PageWrapper>
    </div>
  )
}