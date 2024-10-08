import { useEffect, useState, useContext } from 'react';

import '../ColorsMemory/ColorsMemory.scss';

import { socket } from '../../../socket';

import { clientDataContext } from '../../../useContext/clientDataContext';
import { usersDataContext } from '../../../useContext/usersDataContext';

export default function ColorsMemory() {
  const client = useContext(clientDataContext);
  const users = useContext(usersDataContext);

  const buttonsArray = [
    'red',
    'orange',
    'yellow',
    'darkblue',
    'blue',
    'green',
    'purple',
    'pink',
    'darkgreen',
  ];
  const [buttonsSequence, setButtonsSequence] = useState<string[]>([]);
  const [currentButtonClick, setCurrentButtonClick] = useState<number>(0);

  const handleButtonClick = (color: string) => {
    // stopwatch stop
    if (color == buttonsSequence[currentButtonClick]) {
      if (currentButtonClick == buttonsSequence.length - 1) {
        addRandomButtonToSequence();
        // others staff to reset
        setCurrentButtonClick(() => 0);
        return;
      }

      setCurrentButtonClick((prev) => prev + 1);
    } else {
      socket.emit('update_user_alive', client?.room_id, false);
    }
  };

  const addRandomButtonToSequence = () => {
    const newIndex = Math.floor(Math.random() * 9);

    const newColor = buttonsArray[newIndex];

    setButtonsSequence((prev) => [...prev, newColor]);

    // start animation
  };

  useEffect(() => {
    if (buttonsSequence.length === 0) {
      addRandomButtonToSequence();
    }
  }, []);

  useEffect(() => {
    const usersDead = users?.filter((user) => !user.alive);

    if (usersDead?.length === users?.length) {
      if (client?.isHost) {
        socket.emit('end_game_colors_memory', client?.room_id);
      }
    }
  }, [users]);

  return (
    <>
      <div>Colors Memory</div>
      {client?.alive ? (
        <>
          <div>Current - {currentButtonClick}</div>
          <div className="buttons-box">
            {buttonsArray.map((color) => (
              <div
                key={color}
                className="button-color"
                onClick={() => handleButtonClick(color)}
                style={{ backgroundColor: color }}
              >
                {color}
              </div>
            ))}
          </div>
        </>
      ) : (
        <>Wait for others ...</>
      )}
    </>
  );
}
