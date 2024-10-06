import { useContext } from 'react';
import { usersDataContext } from '../../useContext/usersDataContext';

export default function Leaderboard() {
  const users = useContext(usersDataContext);

  const newSortedUsers = users?.sort((a, b) => b.score - a.score);
  return (
    <>
      <div>LeaderBoard</div>
      <div>
        {newSortedUsers?.map((user, index) => (
          <div key={user.id}>
            Users {index} - {user.nickname}, {user.score}
          </div>
        ))}
      </div>
    </>
  );
}
