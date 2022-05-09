import styled from "styled-components"
import { PageWrapper, Header } from "./"

const Body = styled.div``

type props = {
  children: JSX.Element
}

export const DashboardWrapper: React.FC<props> = ({ children }) => {

  return (
    <PageWrapper>
      <>
        <Header />
        <Body className="container-lg text-dark py-lg-3">
          {children}
        </Body>
      </>
    </PageWrapper>
  )
}