import React from "react";
import classes from './ExpenseList.module.css';

const ExpenseList = (props) => {
    let totalExpense = 0;
    props.items.forEach(element => {
        totalExpense = Number(element.amount) + totalExpense;
    });

    const expenseList = (
        <ul>
            {props.items.map((item) => (
                <li key={item.id} id={item.id}>
                    <span>{item.category}</span>
                    <span>{item.description}</span>
                    <span>&#8377;{item.amount}</span>
                </li>
            ))}
        </ul>
    );

    return (
        <>
            <div className={classes.expenses}>
                {expenseList}
            </div>
            <div className={classes.total}>
                Total Amount: &#8377;{totalExpense}
            </div>
        </>
    );
};

export default ExpenseList;