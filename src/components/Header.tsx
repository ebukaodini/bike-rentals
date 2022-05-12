import { Layout, LogIn, LogOut, Pocket } from "react-feather"
import { Link, useHistory } from "react-router-dom"
import styled from "styled-components"
import Logo from '../assets/logo.svg'
import { useAuthStore, useModalStore } from "../store"

const Wrapper = styled.div`
  height: 80px;
  width: 100%;

  @media (min-width: 768px) {
    height: 90px;
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
const ActionWrapper = styled.div``
const Action = styled.div`
  height: 40px;
  width: 40px;

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
  const { confirm } = useModalStore()
  const handleLogout = () => {
    confirm('Confirm Logout?', 'danger', async () => {
      logout()
      push('/login')
    })
  }

  return (
    <Wrapper className='bg-white shadow-sm sticky-top'>
      <div className="container h-100">
        <div className="h-100 d-flex justify-content-between align-items-center">

          <div className="d-flex gap-2 align-items-center">
            <LogoWrapper>
              <Link to='/' className="">
                <img src={Logo} alt="Bike Rentals" title="Bike Rentals" className="w-100 h-100" />
              </Link>
            </LogoWrapper>
            <div className="text-alt h2 m-0 p-0 fw-bold d-none d-md-block">Bike Rentals</div>
          </div>

          <ActionWrapper className="h-100 d-flex align-items-center justify-content-between gap-1">

            {
              authenticated &&
              <h5 className="m-0 p-0 me-4 fw-bold">{user?.firstname}</h5>
            }

            {
              authenticated ?
                user?.role === 'user' ?
                  <Action title="Go to Reservations">
                    <Link to='/reservations'>
                      <Pocket size={24} />
                    </Link>
                  </Action>
                  :
                  <Action title="Go to Dashboard">
                    <Link to='/dashboard'>
                      <Layout size={24} />
                    </Link>
                  </Action>
                : <></>
            }

            {
              authenticated ?
                <Action title="Logout">
                  <button onClick={handleLogout} type="button" className="btn btn-sm m-0 p-0">
                    <LogOut size={24} />
                  </button>
                </Action>
                :
                <Action title="Login">
                  <Link to='/login'>
                    <LogIn size={24} />
                  </Link>
                </Action>
            }
          </ActionWrapper>

        </div>
      </div>
    </Wrapper>
  )
}