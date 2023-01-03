import React, {   useCallback, useEffect, useRef, useState } from "react";
import ExpenseList from "./ExpenseList";
import axios from "axios";
import { expenseActions } from "../../redux-store/expense";

import classes from './ExpenseForm.module.css';
import { useDispatch, useSelector } from "react-redux";

const ExpenseForm = () => {
    const [color , setColor] = useState('white');
    const [download,setDownload] = useState(false);
    const dispatch = useDispatch();
    const setPremium = useSelector(state => state.expense.premium);
    //const mode = useSelector(state => state.theme.mode);
    const [ expenseObj , setExpenseObj ] = useState({});
    const [ expenses , setExpenses ] = useState([]);
    const amountInputRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();


    const getExpenseHandler = useCallback(async() => {
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
            dispatch(expenseActions.storeExpense(expenseArr));
            
        }catch (err){
            console.log(err);
        }
    }, [dispatch])

    useEffect(() => {
        getExpenseHandler();
    },[getExpenseHandler])


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

        if(expenseObj.id){

            let expObj = {
                category : categoryRef.current.value,
                description : descriptionRef.current.value,
                amount : amountInputRef.current.value,
            }
            try{
                const putResponse = await axios.put(`https://expense-5eae2-default-rtdb.firebaseio.com/expense/${expenseObj.id}.json`,expObj)
                console.log(putResponse.data);
                setExpenseObj({});
                getExpenseHandler();
            }catch (err){
                console.log(err);
            }
        }else{
            try{
                const response = await axios.post('https://expense-5eae2-default-rtdb.firebaseio.com/expense.json',expenseData)
                    console.log(response);
                    getExpenseHandler();
            }catch (err){
                console.log(err);
            }
        }

        amountInputRef.current.value = "";
        descriptionRef.current.value = "";
        categoryRef.current.value = "Choose a Category";
    };

    const deleteExpenseHandler = async(id) => {
        try{
            const deleteRes = await axios.delete(`https://expense-5eae2-default-rtdb.firebaseio.com/expense/${id}.json`)
            setExpenses(expenses.filter((item) => item.id !== id))
            console.log(deleteRes);
            console.log("Successfully expense deleted");
        }catch (err){
            console.log(err);
        }
    };

    const editExpenseHandler = (item) => {
        amountInputRef.current.value = item.amount;
        descriptionRef.current.value = item.description;
        categoryRef.current.value = item.category; 
        setExpenseObj(item)
    };

    const activePremiumButtonHandler = (color) => {
        setDownload(true);
        setColor(color);
    }

    useEffect(() => {
        document.body.style.backgroundColor = color;
    }, [color]);

    const downloadHandler = () => {
        const data = JSON.stringify(expenses);
        let blob = new Blob([data]);
        console.log("blob", blob);
        let file = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.download = "mydata.csv";
        a.href = file;
        a.click();   
      };


    return (
        <>
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
                    <ExpenseList 
                        items={expenses}
                        onDelete={deleteExpenseHandler}
                        onEdit= {editExpenseHandler}
                    />
                </div>
            </section>
            <div className={classes.actions}>
                {setPremium && (
                    <button onClick={() => {activePremiumButtonHandler("gray")}}>Activate Premium</button>
                )}
                {download && <button onClick={downloadHandler}>Download Expense File</button>}
            </div>
        </>
    );
};

export default ExpenseForm;