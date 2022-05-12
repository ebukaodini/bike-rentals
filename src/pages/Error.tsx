import styled from "styled-components"
import { PageWrapper } from "../components"
import Logo from '../assets/logo.svg'
import { useHistory } from "react-router-dom"

const LogoWrapper = styled.div`
  height: 60px;
  width: fit-content;
`

export const Error: React.FC<{}> = () => {

  const { goBack } = useHistory()

  return (
    <div>
      <PageWrapper className="container text-dark vh-100">

        <div className="h-100 pt-5 d-flex justify-content-center">
          <div className="pt-5">

            <LogoWrapper className="w-100 d-flex justify-content-center mb-3">
              <img src={Logo} alt="Bike Rentals" title="Bike Rentals" className="mb-5 w-100 h-100 text-primary" />
            </LogoWrapper>

            <div className="text-center">
              <h1 className="fw-bold">Unknown Page</h1>
              <p>You've reached an unknown page. Go back to reserve a bike.</p>
              <button className="btn btn-dark btn-sm" onClick={goBack}>Go back</button>
            </div>

          </div>
        </div>

      </PageWrapper>
    </div>
  )
}