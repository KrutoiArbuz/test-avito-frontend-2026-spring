import { createBrowserRouter, Navigate } from 'react-router';

import App from '@/App';
import AdDetailPage from '@/App/pages/AdDetailPage';
import AdEditPage from '@/App/pages/AdEditPage';
import AdsListPage from '@/App/pages/AdsListPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/ads" replace /> },
      {
        path: 'ads',
        element: <AdsListPage />,
      },
      {
        path: 'ads/:id',
        element: <AdDetailPage />,
      },
      {
        path: 'ads/:id/edit',
        element: <AdEditPage />,
      },
      {
        path: '*',
        element: <Navigate to="/ads" replace />,
      },
    ],
  },
]);
