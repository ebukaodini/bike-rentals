import styled, { useTheme } from "styled-components"
import { Bike, StoreWrapper, } from "../components"
import BikeHero from '../assets/bike-hero.svg'
import { useCallback, useEffect, useState } from "react"
import { availableLocations, Bike as TBike, bikeColors, bikeModels, useAuthStore, useBikeStore, useModalStore, useReservationStore } from "../store"
import { Filter, Star } from "react-feather"

const HeroWrapper = styled.div`
  height: 400px;
  width: 100%;
  
  @media (min-width: 768px) {
    height: 500px;
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
const Title = styled.div`
  height: 40px;
`
const BikeWrapper = styled.div`
  height: auto !important;
`
const FilterWrapper = styled.div`
`
const FilterList = styled.ul`
  max-height: 200px;
  height: auto;
  overflow-y: auto;
`
const BikeList = styled.div`
  transition: cubic-bezier(0.18, 0.89, 0.32, 1.28);
`
const FilterBoxWrapper = styled.div``

type filterType = {
  model: string[],
  color: string[],
  location: string[],
  rating: number
}

const Store: React.FC<{}> = () => {

  const { bikes } = useBikeStore()
  const { authenticated } = useAuthStore()
  const { reservations } = useReservationStore()
  const [dateFilter, setDateFilter] = useState<string>('')
  const [today, setToday] = useState<string>('')
  const [currentBike, setCurrentBike] = useState<number>(0)
  const [availableBikes, setAvailableBikes] = useState<TBike[]>([])
  const [filteredBikes, setFilteredBikes] = useState<TBike[]>([])
  const { primary, grey } = useTheme()
  const [filter, setFilter] = useState<filterType>({
    model: [],
    color: [],
    location: [],
    rating: 0
  })
  const [filterIsCleared, setFilterIsCleared] = useState<boolean>(true)
  const [showFilter, setShowFilter] = useState(false)
  const { modal } = useModalStore()

  useEffect(() => {
    const d = new Date()
    const today = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`
    setToday(today)
    setDateFilter(today)
  }, [])

  useEffect(() => {
    // get unavailable bikes id for the filtered date
    let unavailableBikes: number[] =
      reservations
        // filter Date should fall within reservation period
        .filter(r =>
          (new Date(dateFilter)) >= (new Date(r.reservedFrom)) &&
          (new Date(dateFilter)) <= (new Date(r.reservedTo))
        )
        // confirm that reservation is still active
        .filter(r => r.isActive)
        .map(r => r.bike)

    // remove duplicate bikes
    unavailableBikes = [...new Set(unavailableBikes)]

    // filter out unavailable bikes
    const aBikes = bikes.filter(b => !unavailableBikes.includes(b.id))
    setAvailableBikes(aBikes)

  }, [bikes, reservations, dateFilter])

  useEffect(() => {
    if (filterIsCleared === false) {
      // filter models
      const filterModel = availableBikes.filter(b => filter.model.includes(b.model))
      // filter colors
      const filterColor = availableBikes.filter(b => filter.color.includes(b.color))
      // filter location
      const filterLocation = availableBikes.filter(b => filter.location.includes(b.location))
      // filter ratings
      const filterRating = availableBikes.filter(b => Math.round(b.rating / b.ratingCount) >= filter.rating)

      const filtered: TBike[] = []
      const indexes: number[] = []
      const merge = [
        ...filterModel, ...filterColor, ...filterLocation, ...filterRating
      ]

      merge.forEach(b => {
        if (!indexes.includes(b.id)) {
          filtered.push(b)
          indexes.push(b.id)
        }
      })

      console.log(filter)

      setFilteredBikes(
        (
          filter.color.length === 0 &&
          filter.model.length === 0 &&
          filter.location.length === 0 &&
          filter.rating === 0
        ) ? availableBikes : filtered
      )
    }
  }, [availableBikes, filter, filterIsCleared])

  const clearFilter = () => {
    setFilter({
      model: [],
      color: [],
      location: [],
      rating: 0
    })
    setFilterIsCleared(true)
  }
  const handleFilter = useCallback((key: string, value: string | number, state?: boolean) => {
    let filters: string[] = []
    setFilterIsCleared(false)

    if (key === 'rating') {
      setFilter({
        ...filter,
        rating: Number(value)
      })
    } else {
      switch (key) {
        case 'color':
          filters = filter.color
          break;
        case 'location':
          filters = filter.location
          break;
        case 'model':
          filters = filter.model
          break;
        default:
          break;
      }

      if (state) {
        filters.push(String(value))
      } else {
        filters.splice(filters.findIndex(i => i === String(value)), 1)
      }
      filters = [...new Set(filters)]

      setFilter({
        ...filter,
        [key]: filters
      })
    }
  }, [filter])

  const FilterBox = useCallback(() => {

    return (
      <FilterBoxWrapper>

        {
          showFilter === true &&
          <div className="d-flex mb-1 justify-content-end">
            <button type="button"
              name='Close'
              className="btn-close d-block d-md-none"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setShowFilter(false)}
            />
          </div>
        }

        <Title className="d-flex align-items-center justify-content-between mb-2">
          <h5 className="text-dark m-0">Filter</h5>
          <button aria-label='clear filter' onClick={clearFilter} className="btn m-0 badge bg-primary text-dark fw-normal" title="Clear filter">
            Clear
          </button>
        </Title>

        <div className="bg-white shadow-sm rounded p-3">

          <FilterWrapper className="mb-3">
            <h6>Model</h6>
            <FilterList className="list-group">
              {
                bikeModels.map((model, index) => (
                  <li key={index} className="list-group-item">
                    <label htmlFor={'model_' + model} className='w-100' style={{ cursor: 'pointer' }}>
                      <input
                        onChange={(e) => handleFilter('model', model, e.target.checked)}
                        type="checkbox" checked={filter.model.includes(model)}
                        className="form-check-input me-2" id={'model_' + model}
                      />
                      <small>{model.toUpperCase()}</small>
                    </label>
                  </li>
                ))
              }
            </FilterList>
          </FilterWrapper>

          <hr />

          <FilterWrapper className="mb-3">
            <h6>Color</h6>
            <FilterList className="list-group">
              {
                bikeColors.map((color, index) => (
                  <li key={index} className="list-group-item">
                    <label htmlFor={'color_' + color} className='w-100' style={{ cursor: 'pointer' }}>
                      <input
                        onChange={(e) => handleFilter('color', color, e.target.checked)}
                        type="checkbox" checked={filter.color.includes(color)}
                        className="form-check-input me-2" id={'color_' + color}
                      />
                      <small>{color.toUpperCase()}</small>
                    </label>
                  </li>
                ))
              }
            </FilterList>
          </FilterWrapper>

          <hr />

          <FilterWrapper className="mb-3">
            <h6>Location</h6>
            <FilterList className="list-group">
              {
                availableLocations.map((location, index) => (
                  <li key={index} className="list-group-item">
                    <label htmlFor={'location_' + location} className='w-100' style={{ cursor: 'pointer' }}>
                      <input
                        onChange={(e) => handleFilter('location', location, e.target.checked)}
                        type="checkbox" checked={filter.location.includes(location)}
                        className="form-check-input me-2" id={'location_' + location}
                      />
                      <small>{location.toUpperCase()}</small>
                    </label>
                  </li>
                ))
              }
            </FilterList>
          </FilterWrapper>

          <hr />

          <FilterWrapper className="mb-3">
            <h6>Avg. Ratings</h6>
            <FilterList className="list-group">
              {
                [4, 3, 2, 1].map((rate, index) => (
                  <button
                    onClick={() => handleFilter('rating', rate)}
                    key={index} type="button" className={`list-group-item list-group-item-action ${filter.rating === rate && 'bg-light'}`}>
                    <div className="d-flex gap-2">
                      <span className="d-flex gap-1 align-items-center">
                        <Star size={16} fill={rate > 0 ? primary : grey} color={rate > 0 ? primary : grey} />
                        <Star size={16} fill={rate > 1 ? primary : grey} color={rate > 1 ? primary : grey} />
                        <Star size={16} fill={rate > 2 ? primary : grey} color={rate > 2 ? primary : grey} />
                        <Star size={16} fill={rate > 3 ? primary : grey} color={rate > 3 ? primary : grey} />
                        <Star size={16} fill={rate > 4 ? primary : grey} color={rate > 4 ? primary : grey} />
                      </span>
                      <span>{'&'}&nbsp;above</span>
                    </div>
                  </button>
                ))
              }
            </FilterList>
          </FilterWrapper>

        </div>

      </FilterBoxWrapper>
    )
  }, [filter.color, filter.location, filter.model, filter.rating, grey, handleFilter, primary, showFilter])

  useEffect(() => {
    if (showFilter) {
      modal(<FilterBox />, 'lg', true)
    }
  }, [FilterBox, modal, showFilter])

  return (
    <div>
      <StoreWrapper>
        <>
          <HeroWrapper className="shadow-sm position-relative mb-3 rounded">
            <img loading="eager" src={BikeHero} alt="Hero" className="shadow-sm rounded" />
            <div className="p-3 m-4 text-alt-light fw-bolder rounded">
              Reserve a Bike for any type of Journey.
            </div>
          </HeroWrapper>

          <div className="d-flex gap-0 gap-md-2">

            <div className="d-none d-md-block col-12 col-md-3">
              <FilterBox />
            </div>

            <div className="w-100">

              <Title className="d-flex justify-content-between align-items-center gap-2 mb-2 ps-md-3">
                <div className="">
                  <button aria-label='toggle filter' onClick={() => setShowFilter(true)} className="btn btn-sm p-0 m-0 d-flex d-md-none align-items-center gap-2">
                    <Filter size={20} />
                    <h5 className="m-0">Filter</h5>
                  </button>
                </div>
                {
                  authenticated ?
                    <div className="d-flex justify-content-end align-items-center gap-2">
                      <label htmlFor="date" className="h5 m-0">{availableBikes.length} Bikes</label>
                      <input type="date" min={today} id="date" className="form-control w-auto" defaultValue={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
                    </div>
                    : <></>
                }
              </Title>

              <BikeList className="d-flex flex-wrap gap-0">

                {
                  filterIsCleared === true ?
                    availableBikes.length > 0 ?
                      availableBikes.map((bike, index) => {
                        return (
                          <BikeWrapper key={index} className="col-12 col-md-4 mb-3 ps-md-3">
                            <Bike bike={bike} currentBike={currentBike} setCurrentBike={setCurrentBike} today={today} />
                          </BikeWrapper>
                        )
                      })
                      : <p>No available bikes.</p>
                    :
                    filteredBikes.length > 0 ?
                      filteredBikes.map((bike, index) => {
                        return (
                          <BikeWrapper key={index} className="col-12 col-md-4 mb-3 ps-md-3">
                            <Bike bike={bike} currentBike={currentBike} setCurrentBike={setCurrentBike} today={today} />
                          </BikeWrapper>
                        )
                      })
                      : <p>No bikes match filter.</p>
                }

              </BikeList>

            </div>

          </div>

        </>
      </StoreWrapper  >
    </div >
  )
}

export default Store