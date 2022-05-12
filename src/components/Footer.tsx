import { Link } from "react-router-dom"
import styled from "styled-components"
import Logo from '../assets/logo.svg'

const Wrapper = styled.div`
  height: 150px;
  width: 100%;

  @media (min-width: 768px) {
    height: 250px;
  }
`
const LogoWrapper = styled.div`
  height: 40px;
  width: fit-content;

  @media (min-width: 768px) {
    height: 60px;
  }


  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`

export const Footer: React.FC<{}> = () => {

  return (
    <Wrapper className='bg-alt text-light shadow-sm sticky-bottom'>
      <div className="container-lg h-100">
        <div className="h-100 d-flex justify-content-between align-items-start">

          <div className="h-100 d-flex gap-2 align-items-center">
            <LogoWrapper>
              <Link to='/' className="">
                <img src={Logo} alt="Bike Rentals" title="Bike Rentals" className="w-100 h-100" />
              </Link>
            </LogoWrapper>
            <div className="text-light h2 m-0 p-0 fw-bold">Bike Rentals</div>
          </div>

        </div>
      </div>
    </Wrapper>
  )
}