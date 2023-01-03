import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { authActions } from '../../redux-store/auth';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const history = useHistory()

  const logoutHandler = (event) => {
    event.preventDefault();

    localStorage.removeItem('token');
    dispatch(authActions.logout());
    history.replace('/auth');
  };

  return (
    <header className={classes.header}>
        <div className={classes.logo}>Expense Tracker</div>
      <nav>
        <ul>
          <li>
            {!isAuth && <Link to='/auth'>Login</Link>}
          </li>
          <li>
            {isAuth && <Link to='/profile'>Profile</Link>}
          </li>
          <li>
            {isAuth && <Link to='/expense'>Expense</Link>}
          </li>
          <li>
            {isAuth && <button onClick={logoutHandler}>Logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
