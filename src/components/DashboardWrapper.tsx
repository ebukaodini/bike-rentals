import styled from "styled-components"
import { PageWrapper, Header } from "./"
import { DashboardNav } from "./DashboardNav"

const Body = styled.div``
const Content = styled.div``

type props = {
  children: JSX.Element
}

export const DashboardWrapper: React.FC<props> = ({ children }) => {

  return (
    <PageWrapper>
      <>
        <Header />
        <div className="container-lg text-dark py-lg-3">

          <Body className="d-flex">
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