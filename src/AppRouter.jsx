/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { lazy, Suspense } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import useUserIsPermitted from './hooks/useUserIsPermitted';
import ProtectedRoutes from './utils/ProtectedRoutes';
import ScrollToTopOnNewPage from './utils/ScrollToTopOnNewPage';
import { SERVICE_NAME } from './constants/AppConstants';

// URLs
import {
  REGISTER_ACCOUNT_URL,
  REGISTER_EMAIL_URL,
  SIGN_IN_URL,
  PAGE_ONE_URL,
} from './constants/AppUrlConstants';

import LoadingSpinner from './components/LoadingSpinner';

// Lazy loaded routes (js loads on demand)
// Register/Sign in pages
const RegisterEmailAddress = lazy(() => import('./pages/Register/RegisterEmailAddress'));
const SignIn = lazy(() => import('./pages/SignIn/SignIn'));
// Regulatory pages
const Landing = lazy(() => import('./pages/Landing/Landing'));
// Downloadable templates pages
// Main pages
const YourPageOne = lazy(() => import('./pages/SamplePages/YourPageOne'));
const YourPageTwo = lazy(() => import('./pages/SamplePages/YourPageTwo'));
const YourPageThree = lazy(() => import('./pages/SamplePages/YourPageThree'));
const YourPageFour = lazy(() => import('./pages/SamplePages/YourPageFour'));
const YourPageFive = lazy(() => import('./pages/SamplePages/YourPageFive'));
const YourPageSix = lazy(() => import('./pages/SamplePages/YourPageSix'));
const APage = lazy(() => import('./pages/SamplePages/APage'));
const NewItem = lazy(() => import('./pages/SamplePages/NewItem'));
const ItemSample = lazy(() => import('./pages/SamplePages/ItemSample'));
const ItemDetailed = lazy(() => import('./pages/SamplePages/ItemDetailed'));
const ItemMixed = lazy(() => import('./pages/SamplePages/ItemMixed'));
const ItemAlone = lazy(() => import('./pages/SamplePages/ItemAlone'));
const MultiFileUploader = lazy(() => import('./pages/SamplePages/MultiFileUploader'));

const AppRouter = () => {
  document.title = SERVICE_NAME;
  const isPermittedToView = useUserIsPermitted();

  return (
    <ScrollToTopOnNewPage>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route path={REGISTER_ACCOUNT_URL} element={<RegisterEmailAddress />} />
          <Route path={REGISTER_EMAIL_URL} element={<RegisterEmailAddress />} />
          <Route path={SIGN_IN_URL} element={<SignIn />} />
          <Route path="sample-path/5" element={<APage />} />
          <Route path="sample/multi-file" element={<MultiFileUploader />} />

          <Route element={<ProtectedRoutes isPermittedToView={isPermittedToView} />}>
            <Route path={PAGE_ONE_URL} element={<YourPageOne />} />
            <Route path="sample-path" element={<YourPageTwo />} />
            <Route path="sample-path/c" element={<ItemAlone />} />
            <Route path="sample-path/3" element={<YourPageFive />} />
            <Route path="sample-path/4" element={<YourPageSix />} />
            <Route path="sample-path/7" element={<ItemSample />} />
            <Route path="sample-path/1" element={<YourPageThree />} />
            <Route path="sample-path/2" element={<YourPageFour />} />
            <Route path="sample-path/a" element={<ItemDetailed />} />
            <Route path="sample-path/6" element={<NewItem />} />
            <Route path="sample-path/b" element={<ItemMixed />} />

          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ScrollToTopOnNewPage>
  );
};

export default AppRouter;
