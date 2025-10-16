/**
 * @page NotFoundPage
 * @summary 404 error page
 * @domain core
 * @type page-component
 * @category error
 */

import { useNavigate } from 'react-router-dom';
import { Button } from '@/core/components/Button';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <Button onClick={() => navigate('/')}>Go back home</Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
