import { useState } from 'react';
import './MinigamesListStyle.scss';
import { motion, Reorder, useDragControls } from 'framer-motion';
import { Button } from '../../UI/Button/Button';
import { BombIcon } from './SvgIcons';

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
        <AddMinigame
          minigameName="Click The Bomb"
          minigameId="CTB"
          onClick={addMinigame}
        />
      </div>
      <div className="minigames-list__table">
        <span className="minigames-list__title">Your minigames queue</span>
        {items.map((item) => (
          <MinigameItem key={item.id} minigame={item} />
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
  const handleAddMinigame = () => {
    const newMinigame = { id: minigameId, name: minigameName };
    onClick(newMinigame);
  };

  return (
    <div className="minigames-list__minigame">
      <div className="minigames-list__minigame-icon">
        {minigameId === 'CTB' && <BombIcon height={25} />}
      </div>
      <div className="minigames-list__minigame-content">
        <span>{minigameName}</span>
        <Button variant="round" onClick={handleAddMinigame}>
          Add
        </Button>
      </div>
    </div>
  );
};

type MinigameItemProps = {
  minigame: Minigame;
};

const MinigameItem = ({ minigame }: MinigameItemProps) => {
  return (
    <div className="minigames-list__minigame">
      <div className="minigames-list__minigame-icon">
        {minigame.id === 'CTB' && <BombIcon height={25} />}
      </div>
      <div className="minigames-list__minigame-content">
        <span>{minigame.name}</span>
        <Button variant="round">Remove</Button>
      </div>
    </div>
  );
};
