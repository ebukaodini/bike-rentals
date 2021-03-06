import { useEffect, useState } from "react"
import { Menu } from "react-feather"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import { useAuthStore, useModalStore } from "../store"
import { PageWrapper, Header, Footer } from "./"
import { DashboardNav } from "./DashboardNav"

const Body = styled.div`
  height: 100%;
`
const Content = styled.div``

type props = {
  children: JSX.Element
}

export const DashboardWrapper: React.FC<props> = ({ children }) => {

  const { authenticated, user } = useAuthStore()
  const { replace } = useHistory()
  const { toast } = useModalStore()
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    if (authenticated === false || user?.role === 'user') {
      toast('Unauthorized access', 'danger')
      replace('/')
    }
  }, [authenticated, replace, toast, user?.role])

  return (
    <PageWrapper>
      <>
        <Header />
        <div className="container text-dark py-3 mb-5">

          <Body className="h-100 d-flex gap-3 w-100 overflow-hidden">
            <div className={`${showMenu === true ? 'd-block' : 'd-none'} d-md-block`}>
              {
                <DashboardNav />
              }
            </div>

            <Content className="p-md-3 w-100">

              <div className="d-block d-md-none mb-4">
                <button aria-label="Menu" onClick={() => setShowMenu(!showMenu)} className="btn btn-sm p-0 m-0 d-flex d-md-none align-items-center gap-2">
                  <Menu size={20} />
                  <h5 className="m-0">Menu</h5>
                </button>
              </div>

              {children}
            </Content>

          </Body>

        </div>

        <Footer />
      </>
    </PageWrapper>
  )
}