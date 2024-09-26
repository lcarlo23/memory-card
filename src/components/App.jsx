import { useEffect, useState } from 'react';
import Card from './Card';
import GameOverModal from './gameOverModal';
import ScoreBoard from './ScoreBoard';

export default function App() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [clicked, setClicked] = useState(0);
  const [best, setBest] = useState(0);
  const [newGame, setNewGame] = useState(false);
  const [won, setWon] = useState(false);

  //CHECK FOR WIN

  useEffect(() => {
    if (clicked === 8) {
      setWon(true);
      setBest(8);
    }
  }, [clicked]);

  // INITIALIZE CARDS

  useEffect(() => {
    async function createCards() {
      setLoading(true);
      let newCards = [];
      for (let i = 0; i < 8; i++) {
        const gif = await getImage();
        let card = <Card image={gif} key={i} />;
        newCards.push(card);
      }
      setCards(newCards);
      setLoading(false);
      setNewGame(false);
    }
    createCards();
  }, [newGame]);

  // FUNCTIONS

  function handleClick(e) {
    if (e.target.closest('.card')) {
      if (!e.target.closest('.selected')) {
        setClicked(clicked + 1);
        const newCards = [...cards];
        const shuffled = shuffleCards(newCards);
        setCards(shuffled);
      } else {
        setGameOver(true);
        clicked > best ? setBest(clicked) : null;
      }
    }
  }

  function restart() {
    setGameOver(false);
    setClicked(0);
    setNewGame(true);
    setCards([]);
    setWon(false);
  }

  // RESULT

  return (
    <>
      <h1>MEMORY GAME</h1>
      <h2>if you click on the same card twice, you lose...</h2>
      <ScoreBoard currScore={clicked} bestScore={best} />
      <div className='gameboard' onClick={handleClick}>
        {loading ? <p className='loading'>Loading Cards...</p> : cards}
      </div>
      {gameOver ? (
        <GameOverModal
          message={
            <>
              <p>GAME OVER</p>
              <p className='subtext'>You Lose!</p>
            </>
          }
          onClick={restart}
        />
      ) : (
        ''
      )}
      {won ? <GameOverModal message={<p>YOU WON!</p>} onClick={restart} /> : ''}
    </>
  );
}

function shuffleCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function getImage() {
  const response = await fetch(
    'https://api.giphy.com/v1/gifs/random?api_key=8fYW2MnkLPuykaDkJCQ0wgHLmklypizk'
  );
  const json = await response.json();
  const url = await json.data.images.original.webp;

  // preload image

  const img = new Image();
  img.src = url;

  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
  });

  return url;
}

// Temporary function to bypass API requests

// async function getImage() {
//   const cachedGifs = localStorage.getItem('gifs');
//   if (cachedGifs) {
//     const gifs = JSON.parse(cachedGifs);
//     const gif = gifs[Math.floor(Math.random() * gifs.length)];
//     const img = new Image();
//     img.src = gif;
//     await new Promise((resolve, reject) => {
//       img.onload = resolve;
//       img.onerror = reject;
//     });

//     return gif;
//   } else {
//     const response = await fetch(
//       'https://api.giphy.com/v1/gifs/random?api_key=0rJN5qMtgiR6wzpthggjIXvmv6J9w6Bm'
//     );
//     const json = await response.json();
//     const gifs = [json.data.images.original.url];
//     localStorage.setItem('gifs', JSON.stringify(gifs));
//     return gifs[0];
//   }
// }
