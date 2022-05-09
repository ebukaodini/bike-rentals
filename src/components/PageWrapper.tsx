import styled from "styled-components"

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
`
const Body = styled.div`
  height: 100%;
`

type props = {
  children: JSX.Element
  className?: string
}

export const PageWrapper: React.FC<props> = ({ children, className }) => {
  return (
    <Wrapper className='bg-alt-light'>
      <Body className={className}>
        {children}
      </Body>
    </Wrapper>
  )
}