import { Layout, LogIn, LogOut, Pocket } from "react-feather"
import { Link, useHistory } from "react-router-dom"
import styled from "styled-components"
import Logo from '../assets/logo.svg'
// import TextLogo from '../assets/bike-rentals.svg'
import { useAuthStore } from "../store"

const Wrapper = styled.div`
  height: 90px;
  width: 100%;
`
const LogoWrapper = styled.div`
  height: 70px;
  width: fit-content;

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    /* border-radius: 50%; */
  }
`
const ActionWrapper = styled.div``
const Action = styled.div`
  height: 50px;
  width: 50px;

  display: flex;
  align-items: center;
  justify-content: center;
  
  a, button {
    cursor: pointer;
    color: ${props => props.theme.primary};
    &:hover {
      color: ${props => props.theme.active};
    }
  }
`

export const Header: React.FC<{}> = () => {

  const { authenticated, user, logout } = useAuthStore()
  const { push } = useHistory()
  const handleLogout = () => {
    logout()
    push('/login')
  }

  return (
    <Wrapper className='bg-white shadow-sm sticky-top'>
      <div className="container-lg h-100">
        <div className="h-100 d-flex justify-content-between align-items-center">

          <LogoWrapper>
            <Link to='/'>
              <img src={Logo} alt="Bike Rentals" title="Bike Rentals" className="w-100 h-100" />
              {/* <img src={TextLogo} alt="Bike Rentals" title="Bike Rentals" className="w-100 h-100" /> */}
            </Link>
          </LogoWrapper>

          <ActionWrapper className="h-100 d-flex align-items-center justify-content-between gap-lg-3">

            {
              authenticated &&
              <h4 className="m-0 p-0 fw-bolder text-alt">{user?.firstname}</h4>
            }

            {
              authenticated ?
                user?.role === 'user' ?
                  <Action title="Go to Reservations">
                    <Link to='/reservations'>
                      <Pocket size={32} />
                    </Link>
                  </Action>
                  :
                  <Action title="Go to Dashboard">
                    <Link to='/dashboard'>
                      <Layout size={32} />
                    </Link>
                  </Action>
                : <></>
            }

            {
              authenticated ?
                <Action title="Logout">
                  <button onClick={handleLogout} type="button" className="btn btn-sm m-0 p-0">
                    <LogOut size={32} />
                  </button>
                </Action>
                :
                <Action title="Login">
                  <Link to='/login'>
                    <LogIn size={32} />
                  </Link>
                </Action>
            }
          </ActionWrapper>

        </div>
      </div>
    </Wrapper>
  )
}