export const randomRoomCode = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  while (result.length < 5) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};