import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import { useAuthStore, useModalStore } from "../store"
import { PageWrapper, Header } from "./"
import { DashboardNav } from "./DashboardNav"

const Body = styled.div``
const Content = styled.div``

type props = {
  children: JSX.Element
}

export const DashboardWrapper: React.FC<props> = ({ children }) => {

  const { user } = useAuthStore()
  const { replace } = useHistory()
  const { toast } = useModalStore()

  useEffect(() => {
    if (user?.role === 'user') {
      toast('Unauthorized access', 'danger')
      replace('/')
    }
  }, [replace, toast, user?.role])

  return (
    <PageWrapper>
      <>
        <Header />
        <div className="container-lg text-dark py-lg-3">

          <Body className="d-flex gap-lg-3">
            <DashboardNav />

            <Content className="p-lg-3 w-100">
              {children}
            </Content>

          </Body>

        </div>
      </>
    </PageWrapper>
  )
}