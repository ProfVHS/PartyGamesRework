import { useState } from 'react';
import './MinigamesListStyle.scss';
import { motion, Reorder, useDragControls } from 'framer-motion';
import { Button } from '../../UI/Button/Button';

type Minigame = {
  id: string;
  name: string;
};

export const MinigamesList = () => {
  const [items, setItems] = useState<Minigame[]>([]);

  const addMinigame = (minigame: Minigame) => {
    setItems([...items, minigame]);
  };

  return (
    <div className="minigames-list">
      <div className="minigames-list__table">
        <span className="minigames-list__title">Minigames</span>
        <AddMinigame
          minigameName="Click The Bomb"
          minigameId="CTB"
          onClick={addMinigame}
        />
      </div>
      <div className="minigames-list__table">
        <span className="minigames-list__title">Your minigames queue</span>
        {items.map((item) => (
          <div className="minigames-list__minigame">{item.name}</div>
        ))}
      </div>
      <div className="minigames-list__footer">
        <Button style={{ width: '30%' }}>Save</Button>
        <Button style={{ width: '30%' }}>Cancel</Button>
      </div>
    </div>
  );
};

type AddMinigameProps = {
  onClick: (id: Minigame) => void;
  minigameName: string;
  minigameId: string;
};
const AddMinigame = ({
  onClick,
  minigameName,
  minigameId,
}: AddMinigameProps) => {
  return (
    <div className="minigames-list__addminigame">
      <span>{minigameName}</span>
      <button onClick={() => onClick({ name: minigameName, id: minigameId })}>
        Add
      </button>
    </div>
  );
};
