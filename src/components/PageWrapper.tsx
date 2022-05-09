import styled from "styled-components"

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
`
const Body = styled.div`
  height: 100%;
`

type props = {
  children: JSX.Element
}

export const PageWrapper: React.FC<props> = ({ children }) => {

  return (
    <Wrapper className='bg-alt-light'>
      <Body className="container-lg text-dark">
        {children}
      </Body>
    </Wrapper>
  )
}