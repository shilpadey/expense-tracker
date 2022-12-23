import React, { useEffect, useRef, useState } from "react";
import ExpenseList from "./ExpenseList";
import axios from "axios";

import classes from './ExpenseForm.module.css';

const ExpenseForm = () => {
    const [ expenses , setExpenses ] = useState([]);
    const amountInputRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();

    const getExpenseHandler = async() => {
        try{
            const res = await axios.get('https://expense-5eae2-default-rtdb.firebaseio.com/expense.json')
            console.log(res.data);
            const expenseArr = [];
            for(const key in res.data){
                expenseArr.push({
                    id: key,
                    amount : res.data[key].amount,
                    description : res.data[key].description,
                    category : res.data[key].category
                })
            }
            console.log(expenseArr);
            setExpenses(expenseArr);
            
        }catch (err){
            console.log(err);
        }
    };

    useEffect(() => {
        getExpenseHandler();
    },[]);

    const addExpenseHandler = async(event) => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredDesc = descriptionRef.current.value;
        const enteredCategory = categoryRef.current.value;

        const expenseData = {
            amount : enteredAmount,
            description : enteredDesc,
            category : enteredCategory,
        };

        try{
            const response = await axios.post('https://expense-5eae2-default-rtdb.firebaseio.com/expense.json',expenseData)
            if(response.status === 201){
                console.log(response);
                getExpenseHandler();
            }
        }catch (err){
            console.log(err);
        }


        amountInputRef.current.value = "";
        descriptionRef.current.value = "";
        categoryRef.current.value = "Choose a Category";
    };


    return (
        <section>
            
            <div className={classes.form}>
                <h1>Expense Tracker</h1>
                <form onSubmit={addExpenseHandler}>
                    <div className={classes.date}>
                        <input type="date"/>
                    </div>
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