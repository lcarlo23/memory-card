export default function GameOverModal({ onClick, message }) {
  return (
    <div className='modal-container'>
      <div className='modal'>
        {message}
        <button onClick={onClick}>RESTART</button>
      </div>
    </div>
  );
}
