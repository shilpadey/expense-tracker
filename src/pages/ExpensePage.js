import React from "react";
import ExpenseForm from "../components/Expenses/ExpenseForm";

const ExpensePage = (props) => {
    return (
        <React.Fragment>
            <ExpenseForm onChange={props.onChange}/>
        </React.Fragment>
    );
};

export default ExpensePage;