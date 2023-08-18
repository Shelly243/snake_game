import { useEffect, useState } from 'react';
import styled from 'styled-components';

const GamePlay = () => {
  let totalGridSize = 30;  //total grid size
  
  let initialSnakePosition = [
    {x: totalGridSize/2, y: totalGridSize/2},     //initial food location
    {x: totalGridSize/2 + 1, y: totalGridSize/2}, //initial snake location
  ];

  const [food, setFood] = useState({ x: 5, y: 5});
  const [snake, setSnake] = useState(initialSnakePosition);
  const [direction, setDirection] = useState("LEFT");
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isNewGame, setIsNewGame] = useState(false);

  //rendering board => representing cells ,food, snake
  function renderBoard() {
    let cellArray = [];

    for (let row = 0; row < totalGridSize; row++) {
      for (let col = 0; col <totalGridSize; col++) {
        let className = "cell";

        let isFood = food.x === row && food.y === col;  //checking whether in this position food is
        if(isFood) {
          className += " food";  
        }

        let isSnake = snake.some((ele) => ele.x === row && ele.y === col); //checking whether in this position snake is 
        if(isSnake) {
          className += " snake";
        }

        let isSnakeHead = snake[0].x === row && snake[0].y === col; //checking whether in this position snakeHead is
        if(isSnakeHead){
          className += " snakeHead";
        }

        let cell = <Cell className={className} key={`$(row)-$(col)`} />;
        cellArray.push(cell);
      }
    }
    return cellArray;
  }

  //Game over => resets the game state to its initial values when the game ends 
  function gameOver() {
      setIsGameOver(true);
      setIsNewGame(true);
      setSnake(initialSnakePosition);
      setScore(0);
  }

  //reest game
  function resetGame() {
    setFood({ x: 5, y: 5 });
    setSnake(initialSnakePosition);
    setDirection("LEFT");
    setScore(0);
    setIsGameOver(false);
    setIsNewGame(false);
  }

  //rendering snake =>  game logic
  function updateGame() {
    
    //if snake touching wall game over
    if(                     
      snake[0].x < 0 ||
      snake[0].x > 30 ||
      snake[0].y < 0 ||
      snake[0].y > 30 
    ) {
      gameOver()
      return;
    }
    
    //if snake bit it's tail game over
    let isBit = snake.slice(1).some(ele => ele.x === snake[0].x && ele.y === snake[0].y)
    if(isBit) {  
      gameOver()
      return;
    }

    let newSnake = [...snake];

    //snake movements
    switch(direction){
      case "LEFT":
        newSnake.unshift({x: newSnake[0].x, y: newSnake[0].y - 1});
        break;
      case "RIGHT":
        newSnake.unshift({x: newSnake[0].x, y: newSnake[0].y + 1});
        break;
      case "UP":
        newSnake.unshift({x: newSnake[0].x - 1, y: newSnake[0].y});
        break;
      case "DOWN":
        newSnake.unshift({x: newSnake[0].x + 1, y: newSnake[0].y});
        break;
    }

    //snake eat food
    let isAteFood = newSnake[0].x === food.x && newSnake[0].y === food.y;
    if(isAteFood) {
      setScore((prev) => prev + 1);
      renderFood();
    }else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }

  // listens for keyboard input and updates the direction of the snake's movement accordingly.
  function updateDirection(e) {
    let code = e.code;

    switch(code) {
      case "ArrowUp":
        if(direction !== "DOWN") setDirection("UP");
        break;
      case "ArrowDown":
        if(direction !== "UP") setDirection("DOWN");
        break;
      case "ArrowLeft":
        if(direction !== "RIGHT") setDirection("LEFT");
        break;
      case "ArrowRight":
        if(direction !== "LEFT") setDirection("RIGHT");
        break;
    }
  }

  //generates a random position for the food on the grid.
  function renderFood() {
    let xPosition = Math.floor(Math.random() * totalGridSize);
    let yPosition = Math.floor(Math.random() * totalGridSize);

    setFood({ x: xPosition, y: yPosition });
  }

  useEffect(() => {                                       // manage the game loop 
    let interval = setInterval(updateGame, 250);          //updates the game state every 250 milliseconds
    return () => clearInterval(interval, updateGame);     
  });

  useEffect(() => {                                                        //managing the keyboard input listeners.
    document.addEventListener("keydown", updateDirection);
   return () => document.removeEventListener("keydown", updateDirection);
  });

  return (
    <Container>
      <Score>Score: <span>{score}</span></Score>
      <Board>{renderBoard()}</Board>
      {isGameOver && (
        <GameOverMessage>
          <span>Game Over</span><br />
        </GameOverMessage>
      )}
      {isGameOver && isNewGame && (
        <NewGameButton onClick={resetGame}>New Game</NewGameButton>
      )}
    </Container>
  );
}

export default GamePlay



// styled using styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #263339;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden; /* Prevent scrollbars */
`;

const Score = styled.div`
    padding: 2rem;
    color: #d1eced;
    font-size: 3rem;
    font-family: 'Tektur', cursive;
`;

const Board = styled.div`
    display: grid;
    grid-template-columns: repeat(30, 18px);
    grid-template-rows: repeat(30, 18px);
    gap: 1px;
`;

const Cell = styled.div`
    background-color: #394952;
    width: 18px;
    height: 18px;

    &.food{
      background-color: #e48c50;
      border-radius: 1rem;
    }

    &.snake{
      background-color: #009688;
      border-radius: 1rem;
    }

    &.snakeHead{
      background-color: #47796d;
    }
`;

const GameOverMessage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: #f44237;
  font-size: 8rem;
  font-family: 'Tektur', cursive;
  z-index: 999;
`;

const NewGameButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  background-color: #cddc39;
  text-shadow: 0 0 1rem #909b26;
  font-family: 'Tektur', cursive;
  border-radius: 0.5rem;
  border: none;
  padding: 0.rem 1rem;
  margin-top: 12rem ;
  font-size: 1.5rem;
  width: 12rem;
  z-index: 1000;

  &:hover{
      background-color: #e2f250;
      cursor: pointer;
      box-shadow: 0 0 1.8rem black;
  }
`;