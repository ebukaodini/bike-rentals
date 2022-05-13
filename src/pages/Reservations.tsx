import styled, { useTheme } from "styled-components"
import { StoreWrapper, } from "../components"
import BikeHero from '../assets/bike-hero.svg'
import { Bike, Reservation, useAuthStore, useBikeStore, useModalStore, useReservationStore } from "../store"
import { Star } from "react-feather"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

const HeroWrapper = styled.div`
  height: 400px;
  width: 100%;
  
  @media (min-width: 768px) {
    height: 300px;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  div {
    width: auto;
    position: absolute;
    top: 0%;
    left: 0%;
    background-color: #0000005d;
    font-size: 24px;

    @media (min-width: 768px) {
      width: 30%;
    }
  }
`
const Row = styled.tr`
  cursor: pointer;
`

const Reservations: React.FC<{}> = () => {

  const { bikes, updateBike } = useBikeStore()
  const { user, authenticated } = useAuthStore()
  const { reservations, updateReservation } = useReservationStore()
  const [userReservations, setUserReservations] = useState<Reservation[]>([])
  const [today, setToday] = useState<string>('')
  const { confirm, toast } = useModalStore()
  const { grey, primary } = useTheme()
  const { replace } = useHistory()

  useEffect(() => {
    if (authenticated === false || user?.role !== 'user') {
      toast('Unauthorized access', 'danger')
      replace('/')
    }
  }, [authenticated, replace, toast, user?.role])

  useEffect(() => {
    const d = new Date()
    const today = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`
    setToday(today)
  }, [])

  useEffect(() => {
    setUserReservations(
      reservations.filter(r => r.user === user?.id)
    )
  }, [reservations, user?.id])

  const handleCancelReservation = (reservation: Reservation) => {
    confirm('Cancel reservation?', 'danger', async () => {
      updateReservation({
        ...reservation,
        isActive: false
      })
        .then(_ => {
          toast('Reservation cancelled successfully.')
        })
        .catch(error => {
          toast(error.message, 'danger')
        })
    })
  }

  const handleRateBike = (reservation: Reservation, bike: Bike, rating: number) => {
    confirm(
      <>Rate <b>{bike.description}</b> {rating}?</>,
      'danger', async () => {
        updateReservation({
          ...reservation,
          rating: rating,
          isRated: true
        })
          .then(async _ => {
            // update bike
            updateBike({
              ...bike,
              rating: (bike.rating + rating),
              ratingCount: (bike.ratingCount + 1)
            })
          })
          .then(_ => {
            toast('Rated bike successfully.')
          })
          .catch(error => {
            toast(error.message, 'danger')
          })

      })
  }

  return (
    <div>
      <StoreWrapper>
        <>
          <HeroWrapper className="shadow-sm position-relative mb-3 rounded">
            <img src={BikeHero} alt="Hero" className="shadow-sm rounded" />
            <div className="p-3 m-4 text-alt-light fw-bolder rounded">
              Reserve a Bike for any type of Journey.
            </div>
          </HeroWrapper>

          <div className="">

            <div className="w-100">
              <>
                <div className="w-100 d-flex justify-content-between align-items-center mb-4">
                  <h2 className="text-dark fw-bolder m-0">Reservations</h2>
                </div>

                <div className="w-100 bg-white shadow-sm p-3 overflow-auto">
                  <table className="w-100 table table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Bike</th>
                        <th>Period</th>
                        <th>Bike&nbsp;Rating</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        userReservations.length > 0 ?
                          userReservations.map((reservation, index) => {

                            const bike = bikes.find(b => b.id === reservation.bike)!

                            return (
                              <Row key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  {bike.description} ({bike.color})
                                </td>
                                <td>
                                  <small>
                                    <b>{(new Date(reservation.reservedFrom)).toLocaleDateString()}</b>
                                    &nbsp;to&nbsp;
                                    <b>{(new Date(reservation.reservedTo)).toLocaleDateString()}</b>
                                  </small>
                                </td>
                                <td>
                                  <span className="d-flex gap-1 align-items-center">
                                    {
                                      [0, 1, 2, 3, 4].map((rate, index) => (
                                        <button aria-label={'rake bike ' + rate} key={index}
                                          disabled={reservation.isRated === true || reservation.isActive === false || (new Date(today)) < (new Date(reservation.reservedFrom))}
                                          onClick={() => handleRateBike(reservation, bike, (rate + 1))}
                                          title={`Rate ${(rate + 1)}`} className='btn m-0 p-0'>
                                          <Star size={16} className='mb-1'
                                            fill={reservation.rating > rate ? primary : grey}
                                            color={reservation.rating > rate ? primary : grey} />
                                        </button>
                                      ))
                                    }
                                  </span>
                                </td>
                                <td>
                                  <span className={`badge bg-${reservation.isActive ? 'success' : 'danger'}`}>
                                    {reservation.isActive ? 'active' : 'cancelled'}
                                  </span>
                                </td>
                                <td>
                                  <button
                                    onClick={() => handleCancelReservation(reservation)}
                                    disabled={reservation.isActive === false || (new Date(today)) >= (new Date(reservation.reservedFrom))}
                                    className="btn badge bg-danger text-light" title="Cancel reservation"
                                  >
                                    Cancel
                                  </button>
                                </td>
                              </Row>
                            )
                          })
                          :
                          <Row>
                            <td colSpan={5} className='text-center'>No Reservations.</td>
                          </Row>
                      }
                    </tbody>
                  </table>
                </div>
              </>
            </div>

          </div>

        </>
      </StoreWrapper  >
    </div >
  )
}
export default Reservations