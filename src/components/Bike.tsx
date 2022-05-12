import styled, { useTheme } from "styled-components";
import { Bike as TBike, Reservation, useAuthStore, useModalStore, useReservationStore } from "../store";
import BikeThumbnail from '../assets/bike-thumbnail.svg'
import { Circle, Star } from "react-feather";
import { useState } from "react";

const BikeWrapper = styled.div`
  height: max-content;
  cursor: pointer;
  :hover {
    margin-top: -2px;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%) !important;
    transition: cubic-bezier(0.18, 0.89, 0.32, 1.28);
  }
`
const BikeThumbnailWrapper = styled.div`
  height: 120px;
  width: 100%;
  
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`
const BikeDetails = styled.div``


export const Bike: React.FC<{ bike: TBike, currentBike: number, setCurrentBike: Function, today: string }> = ({ bike, currentBike, setCurrentBike, today }) => {
  const { primary, grey } = useTheme()
  const rating = Math.floor(bike.rating / bike.ratingCount)
  const [toReserve, setToReserve] = useState<boolean>(false)
  const [isReserving, setIsReserving] = useState<boolean>(false)
  const [dateFrom, setDateFrom] = useState<string>('')
  const [dateTo, setDateTo] = useState<string>('')
  const { user } = useAuthStore()
  const { addReservation } = useReservationStore()
  const { toast } = useModalStore()

  const handleReserveBike = () => {

    setIsReserving(true)

    const reservation: Reservation = {
      id: Date.now(),
      bike: bike.id,
      user: user?.id!,
      reservedFrom: dateFrom,
      reservedTo: dateTo,
      timestamp: Date.now(),
      isActive: true
    }

    addReservation(reservation)
      .then(_ => {
        setIsReserving(false)
        toast(
          <>
            Bike has been reserved from <br />
            <b>{(new Date(dateFrom)).toLocaleDateString()}</b>
            &nbsp;to&nbsp;
            <b>{(new Date(dateTo)).toLocaleDateString()}</b>
          </>, 'success', false
        )
        setToReserve(false)
        setCurrentBike(0)
        setDateFrom('')
        setDateTo('')
      })
      .catch(error => {
        setIsReserving(false)
        toast(error.message, 'danger')
      })
  }

  const handleCancel = () => {
    setToReserve(false)
    setCurrentBike(0)
    setDateFrom('')
    setDateTo('')
  }

  return (
    <BikeWrapper className="shadow-sm bg-white rounded">
      <BikeThumbnailWrapper>
        <img src={BikeThumbnail} alt="Bike Thumbnail" className="rounded-top" />
      </BikeThumbnailWrapper>
      <BikeDetails className="p-2 pb-3">
        {
          toReserve === false || currentBike !== bike.id ?
            <>
              <div className="d-flex align-items-center justify-content-between">
                <h6 className="m-0 fw-bolder">{bike.description} ({bike.color})</h6>
                <span title={bike.color}>
                  <Circle fill={bike.color} size={20} className='shadow-sm rounded-circle text-dark' />
                </span>
              </div>
              <div className="">{bike.model}</div>
              <div className="d-flex gap-2 align-items-center">
                <span className="d-flex gap-1 align-items-center">
                  <Star size={16} fill={rating > 0 ? primary : grey} color={rating > 0 ? primary : grey} />
                  <Star size={16} fill={rating > 1 ? primary : grey} color={rating > 1 ? primary : grey} />
                  <Star size={16} fill={rating > 2 ? primary : grey} color={rating > 2 ? primary : grey} />
                  <Star size={16} fill={rating > 3 ? primary : grey} color={rating > 3 ? primary : grey} />
                  <Star size={16} fill={rating > 4 ? primary : grey} color={rating > 4 ? primary : grey} />
                </span>
                <span>{bike.ratingCount} {bike.ratingCount > 1 ? 'reviews' : 'review'}</span>
              </div>
              <div className="mb-2">{bike.location}</div>
              {
                user?.role === 'user' &&
                <button onClick={() => { setToReserve(true); setCurrentBike(bike.id) }} className="btn btn-primary btn-sm w-100">Reserve Bike</button>
              }
            </>
            :
            <>
              <div className="d-flex flex-column gap-1 mb-2">

                <div className="w-100">
                  <label htmlFor="dateFrom" className="fw-bold">
                    From
                  </label>
                  <input disabled={isReserving} type="date" id="dateFrom" min={today} className="form-control" defaultValue={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                </div>

                <div className="w-100">
                  <label htmlFor="dateTo" className="fw-bold">
                    To
                  </label>
                  <input disabled={isReserving} type="date" id="dateTo" min={dateFrom} className="form-control" defaultValue={dateTo} onChange={(e) => setDateTo(e.target.value)} />
                </div>

              </div>

              <div className="w-auto d-flex justify-content-between align-items-center gap-2">

                <button disabled={isReserving} onClick={handleCancel} className="btn btn-muted btn-sm w-100">Cancel</button>

                <button disabled={isReserving} onClick={handleReserveBike} className="btn btn-primary btn-sm w-100">
                  {
                    isReserving ?
                      <>
                        <span className="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true" />
                        Reserving...
                      </>
                      : 'Reserve'
                  }
                </button>

              </div>

            </>
        }

      </BikeDetails>
    </BikeWrapper>
  )

}