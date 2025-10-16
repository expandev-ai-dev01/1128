/**
 * @router AppRouter
 * @summary Main application routing configuration with lazy loading
 * @type router-configuration
 * @category navigation
 */

import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from '@/pages/layouts/RootLayout';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ErrorBoundary } from '@/core/components/ErrorBoundary';

const TasksPage = lazy(() => import('@/pages/Tasks'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

export const AppRouter = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Navigate to="/tasks" replace />} />
          <Route
            path="tasks"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <TasksPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};
