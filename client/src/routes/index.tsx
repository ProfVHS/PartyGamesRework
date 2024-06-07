import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './Home/HomePage';
import { NotFound } from './404Page/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/room',
    element: <div>Room</div>,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
