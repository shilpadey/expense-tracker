import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const history = useHistory()
  const authCntx = useContext(AuthContext);

  const logoutHandler = () => {
    authCntx.logout();
    history.replace('/auth');
  };

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Expense Tracker</div>
      </Link>
      <nav>
        <ul>
          <li>
            {!authCntx.isLoggedIn && <Link to='/auth'>Login</Link>}
          </li>
          <li>
            {authCntx.isLoggedIn && <Link to='/profile'>Profile</Link>}
          </li>
          <li>
            {authCntx.isLoggedIn && <Link to='/expense'>Expense</Link>}
          </li>
          <li>
            {authCntx.isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
