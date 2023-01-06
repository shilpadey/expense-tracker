import { useHistory } from 'react-router-dom';
import classes from './StartingPageContent.module.css';
import VerifyEmail from './VerifyEmail';

const StartingPageContent = () => {
  const history = useHistory();

  const profileButtonHandler = () => {
    history.replace('/profile');
  }

  return (
    <section className={classes.starting}>
      <h1>Welcome to Expense Tracker!!!</h1>
      <div className={classes.welcome}>
        <button onClick={profileButtonHandler}>Please complete your profile</button>
      </div>
      <hr />
      <VerifyEmail />
    </section>
  );
};

export default StartingPageContent;
