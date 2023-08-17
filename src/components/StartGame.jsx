import styled from 'styled-components'

// eslint-disable-next-line react/prop-types
const StartGame = ({ toggle }) => {
  return (
    <div>
        <Container>
            <Head>Snake Game</Head>
            <Button onClick={ toggle }>Play Now</Button>
        </Container>
    </div>
  )
}

export default StartGame

const Container = styled.div`
    padding: 10rem 6rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Head = styled.h1`
    font-size: 12rem;
    color: #019788;
    text-shadow: 0 0 1rem black;
    font-family: 'Tektur', cursive;
`
const Button = styled.button`
    margin: 3rem;
    background-color:#ccdd39;
    width: 20rem;
    padding: 0 1rem;
    font-size: 3rem;
    box-shadow: 0 0 0.5rem black;
    text-shadow: 0 0 1rem #909b26;
    font-family: 'Tektur', cursive;
    border-radius: 0.8rem;
    border: none;

    &:hover{
        background-color: #e2f250;
        cursor: pointer;
        box-shadow: 0 0 1.8rem black;
    }
`