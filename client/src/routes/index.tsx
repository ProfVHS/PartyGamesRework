import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './Home/HomePage';
import { NotFound } from './404Page/NotFound';
import { RoomPage } from './Room/RoomPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/room',
    element: <RoomPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
