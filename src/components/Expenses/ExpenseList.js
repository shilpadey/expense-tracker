import React from "react";
import classes from './ExpenseList.module.css';

const ExpenseList = (props) => {
    let totalExpense = 0;
    props.items.forEach(element => {
        totalExpense = Number(element.amount) + totalExpense;
    });


    return (
        <>
            <div className={classes.expenses}>
                {props.items.map((item) => (
                    <ul key={item.id}>
                        <li  id={item.id}>
                            <span>{item.category}</span>
                            <span>{item.description}</span>
                            <span>&#8377;{item.amount}</span>
                        </li>
                        <button onClick={() => props.onDelete(item.id)}>Delete</button>
                        <button onClick={() => props.onEdit(item)}>Edit</button>
                    </ul>
                ))}
                
            </div>
            <div className={classes.total}>
                Total Amount: &#8377;{totalExpense}
            </div>
            
        </>
    );
};

export default ExpenseList;