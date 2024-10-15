import { useEffect, useState, useContext } from 'react';

import '../ColorsMemory/ColorsMemory.scss';

import { socket } from '../../../socket';

import { clientDataContext } from '../../../useContext/clientDataContext';
import { usersDataContext } from '../../../useContext/usersDataContext';

import { Button } from '../../features/colorsmemory/Button';

export default function ColorsMemory() {
  const client = useContext(clientDataContext);
  const users = useContext(usersDataContext);

  const [lightButton, setLightButton] = useState<string>('');
  const [gameStatus, setGameStatus] = useState<string>('animation');

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
    if (lightButton !== '' || gameStatus == 'animation') return;

    setLightButton(() => color);

    setTimeout(() => {
      setLightButton(() => '');
    }, 500);

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
  };

  useEffect(() => {
    if (buttonsSequence.length === 0) {
      setTimeout(() => {
        addRandomButtonToSequence();
      }, 1000);
    }
  }, []);

  useEffect(() => {
    setGameStatus(() => 'animation');

    let index = 0;

    const animationInterval = setInterval(() => {
      if (index == buttonsSequence.length) {
        clearInterval(animationInterval);
        setGameStatus(() => 'game');
        return;
      }

      const color = buttonsSequence[index];

      setLightButton(() => color);

      setTimeout(() => {
        setLightButton(() => '');
      }, 500);

      index++;
    }, 1000);
  }, [buttonsSequence]);

  useEffect(() => {
    const usersDead = users?.filter((user) => !user.alive);

    if (usersDead!.length + 1 === users?.length) {
      if (client?.isHost) {
        socket.emit('end_game_colors_memory', client?.room_id);
      }
    }
  }, [users]);

  return (
    <>
      {client?.alive ? (
        <>
          <div className="colorsmemory">
            {buttonsArray.map((button) => (
              <Button
                key={button}
                color={button}
                isLight={lightButton == button}
                onClick={handleButtonClick}
              />
            ))}
          </div>
        </>
      ) : (
        <>Wait for others ...</>
      )}
    </>
  );
}
