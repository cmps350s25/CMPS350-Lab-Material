'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


export default function Transactions() {
    const router = useRouter()
    const [accounts, setAccounts] = useState([])
    // let accounts = []
    async function getAccounts() {
        const response = await fetch('/api/accounts')
        const data = await response.json()
        setAccounts(data)
    }

    useEffect(() => {
        getAccounts()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const transaction = Object.fromEntries(formData)

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        }
        await fetch(`/api/accounts/${transaction.accountNo}/trans`, options)
        // navigate to the home page
        router.push('/')

    }
    return (
        <>
            <h3>Add Transaction</h3>
            <form id="trans-form" onSubmit={handleSubmit}>
                <label htmlFor="accountNo">Account No</label>
                <select name="accountNo" id="accountNo" required>
                    {accounts.map((acct, index) =>
                        <option key={index}
                            value={acct.accountNo}>
                            {acct.accountNo} - {acct.firstname} {acct.lastname} - {acct.balance} QR
                        </option>
                    )}

                </select>

                <label htmlFor="type">Transaction Type</label>
                <select name="transType" id="transType" required>
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
