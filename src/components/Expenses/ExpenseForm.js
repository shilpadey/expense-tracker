import React, { useRef, useState } from "react";
import ExpenseList from "./ExpenseList";

import classes from './ExpenseForm.module.css';

const ExpenseForm = () => {
    const [ expenses , setExpenses ] = useState([]);
    const amountInputRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();

    const addExpenseHandler = (event) => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredDesc = descriptionRef.current.value;
        const enteredCategory = categoryRef.current.value;

        const expenseData = {
            amount : enteredAmount,
            description : enteredDesc,
            category : enteredCategory,
        };

        setExpenses((prevState) => {
           return [expenseData , ...prevState];
        });

        amountInputRef.current.value = "";
        descriptionRef.current.value = "";
        categoryRef.current.value = "Choose a Category";
    };


    return (
        <section>
            <div className={classes.date}>
                <input type="date"/>
            </div>
            <div className={classes.form}>
                <h1>Expense Tracker</h1>
                <form onSubmit={addExpenseHandler}>
                    <div className={classes.control}>
                        <input type="number" placeholder="Amount" ref={amountInputRef}/>
                    </div>
                    <div className={classes.control}>
                     <input type="text" placeholder="Description" ref={descriptionRef}/>
                    </div>
                    <div className={classes.control}>
                        <select ref={categoryRef} placeholder="Category">
                            <option>Choose a Category</option>
                            <option>Food</option>
                            <option>Electricity</option>
                            <option>Shopping</option>
                            <option>Groceries</option>
                            <option>Kitchen Utilites</option>
                            <option>Vacation</option>
                            <option>Miscellanous</option>
                        </select>
                    </div>
                    <div className={classes.actions}>
                        <button>Add Expense</button>
                    </div>
                </form>
            </div>
            <div>
                <ExpenseList items={expenses}/>
            </div>
        </section>
    );
};

export default ExpenseForm;