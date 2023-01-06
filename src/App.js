import { useEffect } from 'react';
import { BsMoonStarsFill , BsFillSunFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import ExpensePage from './pages/ExpensePage';
import HomePage from './pages/HomePage';
import { themeActions } from './redux-store/theme';
import './App.css';

function App() {
  const dispatch = useDispatch()
  const mode = useSelector(state => state.theme.mode);

  const switchModeHandler = () => {
    dispatch(themeActions.setTheme());
  };

  useEffect(() => {
    document.body.style.background = mode ? "#292c35" : "#fff";
  }, [mode]);

  return (
    <Layout>
      <div
        id="darkmode"
      >
        <input
          type="checkbox"
          className="checkbox"
          id="checkbox"
          onChange={switchModeHandler}
        />
        <label htmlFor="checkbox" className="label">
          <BsMoonStarsFill color="white" />
          <BsFillSunFill color="yellow" />
          <div className="ball"></div>
        </label>
      </div>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/auth' />
        </Route>
        <Route path='/home'>
          <HomePage />
        </Route>
        <Route path='/auth'>
          <AuthPage />
        </Route>
        <Route path='/profile'>
          <UserProfile />
        </Route>
        <Route path='/forget-password'>
          <ForgetPassword />
        </Route>
        <Route path='/expense'>
          <ExpensePage onChange={switchModeHandler}/>
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
