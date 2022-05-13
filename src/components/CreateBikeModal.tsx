import { useEffect, useState } from "react"
import { availableLocations, Bike, bikeColors, bikeModels, useBikeStore, useModalStore } from "../store"

export const CreateBikeModal: React.FC<{ isEditing?: boolean, bike?: Bike }> = ({ isEditing, bike }) => {

  const bikeDefault: Bike = {
    id: Date.now(),
    description: '',
    model: bikeModels[0],
    color: bikeColors[0],
    location: availableLocations[0],
    rating: 0,
    ratingCount: 0,
    isAvailable: true
  }

  const { createBike, updateBike } = useBikeStore()
  const [credentials, setCredentials] = useState<Bike>(bikeDefault)
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
        .then(_ => {
          setIsSubmitting(false)
          toast('Bike updated successfully.')
          setCredentials(bikeDefault)
          closeModal()
        })
        .catch(error => {
          setIsSubmitting(false)
          setErrors([error.message])
        })
    } else {
      createBike(credentials)
        .then(_ => {
          setIsSubmitting(false)
          toast('Bike created successfully.')
          setCredentials(bikeDefault)
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
    setCredentials(bikeDefault)
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
          <label className="mb-1" htmlFor="description">Description</label>
          <input type="text" defaultValue={credentials.description} disabled={isSubmitting} required onChange={(e) => handleChange('description', e.target.value)} id="description" className="form-control py-2 px-3 text-dark" aria-label="Description" placeholder="Hammer-E LT1" />
        </div>

        <div className="mb-3">
          <label className="mb-1" htmlFor="model">Model</label>
          <select value={credentials.model} disabled={isSubmitting} required onChange={(e) => handleChange('model', e.target.value)} id="model" className="form-select py-2 px-3 text-dark" aria-label="Model">
            {
              bikeModels.map((model, index) => (
                <option key={index} value={model}>{model}</option>
              ))
            }
          </select>
        </div>

        <div className="mb-3">
          <label className="mb-1" htmlFor="color">Color</label>
          <select value={credentials.color} disabled={isSubmitting} required onChange={(e) => handleChange('color', e.target.value)} id="color" className="form-select py-2 px-3 text-dark" aria-label="Color">
            {
              bikeColors.map((color, index) => (
                <option key={index} value={color}>{color}</option>
              ))
            }
          </select>
        </div>

        <div className="mb-3">
          <label className="mb-1" htmlFor="location">Location (City)</label>
          <select value={credentials.location} disabled={isSubmitting} required onChange={(e) => handleChange('location', e.target.value)} id="location" className="form-select py-2 px-3 text-dark" aria-label="Location">
            {
              availableLocations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))
            }
          </select>
        </div>

        <div className="mb-4 form-check">
          <label className="form-check-label" htmlFor="isAvailable">Availability</label>
          <input checked={credentials.isAvailable} disabled={isSubmitting} onChange={(e) => handleChange('isAvailable', e.target.checked)} type="checkbox" className="form-check-input" id="isAvailable" placeholder="Bike is available" />
        </div>

        <div className="text-center">
          <button aria-label={isEditing ? 'Update' : 'Add'} disabled={isSubmitting} type="submit" className="btn btn-primary form-control mb-2">
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