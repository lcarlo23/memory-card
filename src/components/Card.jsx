import { useState } from 'react';

export default function Card({ image }) {
  const [isSelected, setIsSelected] = useState(false);

  function handleSelected() {
    setIsSelected(true);
  }

  return (
    <div
      className={`card ${isSelected ? 'selected' : ''}`}
      onClick={handleSelected}
    >
      <img src={image} alt='Card' />
    </div>
  );
}
