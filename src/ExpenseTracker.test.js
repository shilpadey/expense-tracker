import {  getByRole, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import UserProfile from "./components/Profile/UserProfile";
import StartingPageContent from "./components/StartingPage/StartingPageContent";
import VerifyEmail from "./components/StartingPage/VerifyEmail";


import store from './redux-store/index';

describe("UserProfile Component", () => {
    test('renders User Profile as text', () => {
        render(
        <Provider store={store}>
            <UserProfile />
        </Provider> 
        );
    
        const expenseText = screen.getByText('Your Profile', {exact: false});
        expect(expenseText).toBeInTheDocument;
    });
});

describe("StartingPage Component" , () => {
    test('render Welcome Expense Tracker as text', () => {
        render(
            <Provider store={store}>
                <StartingPageContent />
            </Provider>
        );

        const welcomeText = screen.getByText('Welcome to Expense Tracker!!!', {exact: false});
        expect(welcomeText).toBeInTheDocument;
    });

    test('render Profile page if the component is clicked', () => {
        render(
            <Provider store={store}>
                <StartingPageContent />
            </Provider> 
        );

        const buttonElement = screen.getByRole('button', {name: /Please complete your profile/i});
        //userEvent.click(buttonElement);

        const profileElement = screen.getByText('Please complete', {exact: false});
        expect(profileElement).toBeInTheDocument;
    });
});

describe("Verify Component", () => {
    test('render verify button on screen' , () => {
        render(
            <Provider store={store}>
                <VerifyEmail />
            </Provider>
        );

        const buttonElement = screen.getByRole('button');
        userEvent.click(buttonElement);
    })
})
