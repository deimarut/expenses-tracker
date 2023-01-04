import { useEffect, useState } from "react";
import styled from 'styled-components';
import { API_URL, LOGGED_IN_USER } from "../../constants/constants"; 

const ExpensesList = styled.ul`
    display: flex ;
    flex-direction: column ;
    gap: 8px;
    list-style: none;
`;

const ExpensesListItem = styled.li`
    box-shadow: 0 5px 7px -1px rgb(51 51 51 / 23%);
    border-radius: 10px ;
    display: flex;
    justify-content: space-between;
    color: darkblue;
    padding: 10px 30px 10px 10px ;
`;

const ExpenseAmount = styled.span`
    font-size: 34px;
    color: #35d8ac;
    font-weight: 700;
    display: flex;
    align-items: center;
`;

const ExpenseType = styled.span`
    color: #979cb0;
    font-size: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;
    width: 50px;
`;

export const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/expenses?userId=${LOGGED_IN_USER.id}`)
            .then(res => res.json())
            .then(data => {
                setExpenses(data);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <ExpensesList>
            {expenses.map((exp) => (
                <ExpensesListItem key={exp.id}>
                    <ExpenseType>{exp.type}</ExpenseType>
                    <ExpenseAmount>€{exp.amount}</ExpenseAmount>
                </ExpensesListItem>
            ))}
        </ExpensesList>
    );
}