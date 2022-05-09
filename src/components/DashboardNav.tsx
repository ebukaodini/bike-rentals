import { ChevronRight } from "react-feather"
import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"

const Wrapper = styled.div`
  height: 500px;
  width: 300px;
`
const Action = styled.div`
  :hover {
    background-color: ${props => props.theme.light};
    color: ${props => props.theme.active};
  }
  &.active {
    background-color: ${props => props.theme.light};
    color: ${props => props.theme.active};
  }
`

export const DashboardNav: React.FC<{}> = () => {

  const { pathname } = useLocation()
  const actions = [
    {
      title: 'Dashboard',
      route: '/dashboard'
    },
    {
      title: 'Users',
      route: '/dashboard/users'
    },
    {
      title: 'Managers',
      route: '/dashboard/managers'
    },
    {
      title: 'Bikes',
      route: '/dashboard/bikes'
    },
    {
      title: 'Reservations',
      route: '/dashboard/reservations'
    },
  ]

  return (
    <Wrapper className='bg-white shadow-sm rounded sticky-start'>
      <div className="list-unstyled h-100 d-flex gap-lg-2 flex-column align-items-center p-3">
        {
          actions.map((action, index) => (
            <Link key={index} className="w-100 text-primary text-decoration-none" to={action.route}>
              <Action className={`w-100 p-2 d-flex border border-light justify-content-between align-content-center ${pathname === action.route && 'active'}`}>
                {action.title}
                <ChevronRight className="pt-1" size={20} />
              </Action>
            </Link>
          ))
        }
      </div>
    </Wrapper>
  )
}