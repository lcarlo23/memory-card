export default function ScoreBoard({ currScore, bestScore }) {
  return (
    <div className='scoreboard'>
      <p>
        Current Score: <span className='score'>{currScore}</span>
      </p>
      <p>
        Best Score: <span className='score'>{bestScore}</span>
      </p>
    </div>
  );
}
