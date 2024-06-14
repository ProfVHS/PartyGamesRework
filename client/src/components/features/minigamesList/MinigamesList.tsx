import { useState } from 'react';
import './MinigamesListStyle.scss';
import { Reorder, useDragControls } from 'framer-motion';
import { Button } from '../../UI/Button/Button';
import { BombIcon } from './SvgIcons';

type Minigame = {
  id?: number;
  minigameID: string;
  name: string;
};

export const MinigamesList = () => {
  const [items, setItems] = useState<Minigame[]>([]);

  const addMinigame = (minigame: Minigame) => {
    const id = items.length + 1;
    const newMiniGame: Minigame = { id: id, ...minigame };
    setItems([...items, newMiniGame]);
  };

  console.log(items);

  return (
    <div className="minigames-list">
      <div className="minigames-list__table">
        <span className="minigames-list__title">Minigames</span>
        <MinigameItem
          minigame={{ minigameID: 'CTB', name: 'Click The Bomb' }}
          type="add"
          onClick={addMinigame}
        />
      </div>
      <div className="minigames-list__table">
        <span className="minigames-list__title">Your minigames queue</span>
        <Reorder.Group
          axis="y"
          values={items}
          onReorder={setItems}
          style={{
            listStyle: 'none',
            padding: '0',
            margin: '0',
            width: '100%',
          }}
        >
          {items.map((minigame) => (
            <Reorder.Item
              key={minigame.id}
              value={minigame}
              style={{ listStyle: 'none', padding: '0', marginBottom: '8px' }}
            >
              <MinigameItem minigame={minigame} type="remove" />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
      <div className="minigames-list__footer">
        <Button style={{ width: '30%' }}>Save</Button>
        <Button style={{ width: '30%' }}>Cancel</Button>
      </div>
    </div>
  );
};

type MinigameItemProps = {
  minigame: Minigame;
  type: 'add' | 'remove';
  onClick?: (minigame: Minigame) => void;
};

const MinigameItem = ({ minigame, type, onClick }: MinigameItemProps) => {
  return (
    <div
      className={`minigames-list__minigame ${
        type === 'remove' ? 'draggable' : ''
      }`}
    >
      <div className="minigames-list__minigame-icon">
        {minigame.minigameID === 'CTB' && <BombIcon height={25} />}
      </div>
      <div className="minigames-list__minigame-content">
        <span>{minigame.name}</span>
        <Button
          onClick={() => onClick && onClick(minigame)}
          variant="round"
          color={`${type === 'remove' ? 'remove' : 'primary'}`}
        >
          {type}
        </Button>
      </div>
    </div>
  );
};
