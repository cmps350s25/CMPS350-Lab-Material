'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'


export default function Transactions() {
    const [accounts, setAccounts] = useState([])
    const router = useRouter();

    async function getAccounts() {
        const url = '/api/accounts';
        const res = await fetch(url);
        const data = await res.json();
        setAccounts(data)
    }
    useEffect(() => {
        getAccounts()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const transaction = Object.fromEntries(formData);

        const url = `/api/accounts/${transaction.accountNo}/trans`;
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        })
        const message = await res.json();
        alert(message.message)

        router.push('/', undefined, { shallow: true });


    }

    return (
        <>
            <h3>Add Transaction</h3>
            <form id="trans-form" onSubmit={handleSubmit}>
                <label for="accountNo">Account No</label>
                <select name="accountNo" id="accountNo" required>
                    {
                        accounts.map(account =>
                            <option key={account.accountNo} value={account.accountNo}>
                                {account.accountNo} - {account.firstname} {account.lastname} - {account.balance}
                            </option>)
                    }
                </select>

                <label for="type">Transaction Type</label>
                <select name="transType" id="transType" required>
                    <option></option>
                    <option value="Deposit">Deposit</option>
                    <option value="Withdraw">Withdraw</option>
                </select>

                <label for="amount">Amount</label>
                <input type="number" id="amount" name="amount" required />
                <button type="Submit">Submit</button>
            </form>
        </>
    )
}
