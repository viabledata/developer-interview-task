import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AppRouter from './AppRouter';
import Header from './layout/Header';
// utils
import { NO_BACK_LINKS, TOP_LEVEL_PAGES } from './constants/AppUrlConstants';

const App = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const topLevelPage = TOP_LEVEL_PAGES.includes(pathname);
  const pageWithoutBackLink = NO_BACK_LINKS.includes(pathname);

  useEffect(() => {
    // Removes formData in sessionStorage when on a top level page
    if (topLevelPage) {
      sessionStorage.removeItem('formData');
    }
  }, [pathname]);

  return (
    <>
      <Header />
      <div className="thisApp-width-container">
        {/* Back link with logic as to when it should/should not show; */}
        {!pageWithoutBackLink
          && (
            <nav aria-label="Back link" id="backLink">
              <a
                href="#back"
                className="thisApp-back-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                }}
              >
                Back
              </a>
            </nav>
          )}
        <main className="thisApp-main-wrapper thisApp-main-wrapper--auto-spacing" id="content" role="main">
          <AppRouter />
        </main>
      </div>
    </>
  );
};

export default App;
