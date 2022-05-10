import randomString from "random-string-gen";
import { useEffect, useState } from "react"
import { Bike, useBikeStore, useModalStore } from "../store"

export const CreateBikeModal: React.FC<{ isEditing?: boolean, bike?: Bike }> = ({ isEditing, bike }) => {

  const { createBike, updateBike, getBikes } = useBikeStore()
  const [credentials, setCredentials] = useState<Bike>({
    id: randomString(7),
    model: '',
    color: '',
    location: '',
    rating: 1,
    ratingCount: 1,
    isAvailable: true
  })
  const [errors, setErrors] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { closeModal, toast } = useModalStore()

  const handleChange = (input: string, value: string | boolean) => {
    setCredentials({ ...credentials, [input]: value })
  }
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    // validate inputs
    let errorLog = []
    if (credentials.model.trim().length === 0) errorLog.push('Please enter a model.')
    if (credentials.color.trim().length === 0) errorLog.push('Please enter a color.')
    if (credentials.location.trim().length === 0) errorLog.push('Please enter a location.')

    setErrors(errorLog)
    if (errorLog.length > 0) return

    setIsSubmitting(true)
    if (isEditing) {
      updateBike(credentials)
        .then(async _ => {
          setIsSubmitting(false)
          await getBikes()
          toast('Bike updated successfully.')
          closeModal()
        })
        .catch(error => {
          setIsSubmitting(false)
          setErrors([error.message])
        })
    } else {
      createBike(credentials)
        .then(async _ => {
          setIsSubmitting(false)
          await getBikes()
          toast('Bike created successfully.')
          closeModal()
        })
        .catch(error => {
          setIsSubmitting(false)
          setErrors([error.message])
        })
    }
  }
  const handleCancel = () => {
    setErrors([])
    setCredentials({
      id: randomString(7),
      model: '',
      color: '',
      location: '',
      rating: 1,
      ratingCount: 1,
      isAvailable: true
    })
  }

  useEffect(() => {
    if (isEditing) {
      console.log('isEditing')
      setCredentials({
        ...bike!
      })
    }
  }, [bike, isEditing])

  return (
    <form onSubmit={handleSubmit} className="py-2">
      <div className="d-flex justify-content-between mb-lg-3">
        <h4 className="fw-bold">{isEditing ? 'Update Bike' : 'Add a New Bike'}</h4>

        <button type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={handleCancel}
        />
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

      <div className="bg-white shadow-sm p-3">
        <div className="mb-3">
          <label className="mb-1" htmlFor="model">Model</label>
          <input value={credentials.model} disabled={isSubmitting} required onChange={(e) => handleChange('model', e.target.value)} type="text" className="form-control py-2 px-3 text-dark" id="model" placeholder="Hammer-E LT1" />
        </div>

        <div className="mb-3">
          <label className="mb-1" htmlFor="color">Color</label>
          <input value={credentials.color} disabled={isSubmitting} required onChange={(e) => handleChange('color', e.target.value)} type="text" className="form-control py-2 px-3 text-dark" id="color" placeholder="Black" />
        </div>

        <div className="mb-3">
          <label className="mb-1" htmlFor="location">Location (City)</label>
          <input value={credentials.location} disabled={isSubmitting} required onChange={(e) => handleChange('location', e.target.value)} type="text" className="form-control py-2 px-3 text-dark" id="location" placeholder="Ikeja, Lagos" />
        </div>

        <div className="mb-4 form-check">
          <label className="form-check-label" htmlFor="isAvailable">Availability</label>
          <input checked={credentials.isAvailable} disabled={isSubmitting} onChange={(e) => handleChange('isAvailable', e.target.checked)} type="checkbox" className="form-check-input" id="isAvailable" placeholder="Bike is available" />
        </div>

        <div className="text-center">
          <button disabled={isSubmitting} type="submit" className="btn btn-primary form-control mb-2">
            {
              isSubmitting
                ?
                <>
                  <span className="spinner-grow spinner-grow-sm me-3" role="status" aria-hidden="true" />
                  {isEditing ? 'Updating bike...' : 'Adding bike...'}
                </>
                : isEditing ? 'Update' : 'Add'
            }
          </button>
        </div>
      </div>
    </form>
  )
}