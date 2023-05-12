import { useEffect, useState } from 'react';
import {
  Link, NavLink, useLocation, useNavigate,
} from 'react-router-dom';
import axios from 'axios';
import { SERVICE_NAME } from '../constants/AppConstants';
import {
  PAGE_ONE_PAGE_NAME,
  PAGE_ONE_URL,
  LANDING_URL,
  SIGN_IN_URL,
  HOME_URL,
} from '../constants/AppUrlConstants';
import { SIGN_OUT_ENDPOINT } from '../constants/AppAPIConstants';
import useUserIsPermitted from '../hooks/useUserIsPermitted';
import Auth from '../utils/Auth';

const Nav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const showNav = useUserIsPermitted();
  const navData = [
    {
      id: 'PageOne',
      urlStem: PAGE_ONE_URL,
      text: PAGE_ONE_PAGE_NAME,
      active: false,
    },
    // {
    //   id: 'Help',
    //   urlStem: LOGGED_IN_HELP,
    //   text: HELP_PAGE_NAME,
    //   active: false,
    // },
  ];
  const [menuState, setMenuState] = useState(false);
  const [navItems, setNavItems] = useState(navData);

  const menuToggle = (e) => {
    e.preventDefault();
    setMenuState(!menuState);
  };

  const setActivePage = (url) => {
    const tempArr = [...navData];
    const newArr = tempArr.map((item) => {
      const currentUrl = !url ? item.urlStem : url;
      if (currentUrl === item.urlStem) {
        return ({
          ...item,
          active: true,
        });
      }
      return ({
        ...item,
        active: false,
      });
    });
    document.activeElement.blur();
    setNavItems(newArr);
  };

  const removeFormData = () => {
    sessionStorage.removeItem('formData');
  };

  const handleSignOut = async () => {
    try {
      const response = await axios.post(SIGN_OUT_ENDPOINT, {}, {
        headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
      });
      if (response.status === 200) {
        Auth.logout();
        navigate(SIGN_IN_URL);
      }
    } catch (err) {
      Auth.logout();
      navigate(SIGN_IN_URL);
    }
  };

  useEffect(() => {
    setActivePage(pathname);
  }, [pathname]);

  return (
    <>
      <div className="thisApp-header__logo">
        <Link
          to={HOME_URL}
          className="thisApp-header__link thisApp-header__link--homepage"
          onClick={() => { removeFormData(); }}
        >
          <span className="thisApp-header__logotype">
            LOGO GOES HERE
          </span>
        </Link>
      </div>
      <div className="thisApp-header__content">
        <Link
          to={LANDING_URL}
          className="thisApp-header__link thisApp-header__service-name"
          data-testid="serviceName"
          onClick={() => { setActivePage(LANDING_URL); removeFormData(); }}
        >
          {SERVICE_NAME}
        </Link>

        {showNav && (
          <nav aria-label="Menu" className="thisApp-header__navigation" id="menu">
            <button
              type="button"
              onClick={(e) => menuToggle(e)}
              className={
                menuState === false
                  ? 'thisApp-header__menu-button thisApp-js-header-toggle'
                  : 'thisApp-header__menu-button thisApp-js-header-toggle thisApp-header__menu-button--open'
              }
              aria-controls="navigation"
              aria-label="Show or hide navigation menu"
              aria-expanded={menuState}
            >
              Menu
            </button>

            <ul
              id="navigation"
              className={
                menuState === false
                  ? 'thisApp-header__navigation-list'
                  : 'thisApp-header__navigation-list thisApp-header__navigation-list--open'
              }
              aria-label="Top Level Navigation"
              hidden={menuState}
            >
              {navItems.map((item) => (
                <li
                  key={item.id}
                  className={item.active ? 'thisApp-header__navigation-item thisApp-header__navigation-item--active' : 'thisApp-header__navigation-item'}
                  data-testid={`listitem-${item.id}`}
                >
                  <Link
                    to={item.urlStem}
                    className="thisApp-header__link"
                    onClick={() => { setActivePage(item.urlStem); removeFormData(); }}
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
              <li className="thisApp-header__navigation-item float">
                <NavLink to={PAGE_ONE_URL} className="thisApp-header__link" onClick={handleSignOut}>Sign out</NavLink>
                {/* Link tag cannot be used as we do not have a signout route */}
              </li>
            </ul>
          </nav>
        )}
      </div>
    </>
  );
};

export default Nav;
