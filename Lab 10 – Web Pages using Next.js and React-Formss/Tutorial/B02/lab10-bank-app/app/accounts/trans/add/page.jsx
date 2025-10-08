'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Transactions() {
    const [accounts, setAccounts] = useState([])
    const router = useRouter()

    async function getAccounts() {
        const response = await fetch('/api/accounts')
        const data = await response.json()
        setAccounts(data)

    }
    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const transaction = Object.fromEntries(formData)
        const url = `/api/accounts/${transaction.accountNo}/trans`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        }

        await fetch(url, options)
        router.push('/')

    }
    useEffect(() => {
        console.log('useEffect called');
        getAccounts()
    }, [])

    return (
        <>
            {/* {JSON.stringify(accounts)} */}
            <h3>Add Transaction</h3>
            <form id="trans-form" onSubmit={handleSubmit}>
                <label htmlFor="accountNo">Account No</label>
                <select name="accountNo" id="accountNo" required>
                    {accounts.map((account, index) => (
                        <option key={index} value={account.accountNo}>
                            {account.accountNo} - {account.firstname} {account.lastname} - {account.balance}
                        </option>
                    ))}
                </select>

                <label htmlFor="type">Transaction Type</label>
                <select name="transType" id="transType" required>
                    <option></option>
                    <option value="Deposit">Deposit</option>
                    <option value="Withdraw">Withdraw</option>
                </select>

                <label htmlFor="amount">Amount</label>
                <input type="number" id="amount" name="amount" required />
                <button type="Submit">Submit</button>
            </form>
        </>
    )
}
