import { Link } from 'react-router-dom';
import classes from './StartingPageContent.module.css';

const StartingPageContent = () => {
  return (
    <section className={classes.starting}>
      <h1>Welcome to Expense Tracker!!!</h1>
      <div className={classes.welcome}>
        Please complete your  <Link to='/profile'>profile</Link>
      </div>
      <hr />
    </section>
  );
};

export default StartingPageContent;
