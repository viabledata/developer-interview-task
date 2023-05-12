import Nav from './Nav';

const Header = () => (
  <header className="thisApp-header" role="banner" data-module="thisApp-header">
    <a href="#content" className="thisApp-skip-link">Skip to main content</a>
    <div className="thisApp-header__container thisApp-width-container">

      <Nav />
    </div>
  </header>
);
export default Header;
