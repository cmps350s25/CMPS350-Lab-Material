'use client'
import React, { useState } from 'react'
import AccountRow from './AccountRow'



export default function AccountsTable({ initialAccounts }) {
    const [accounts, setAccounts] = useState(initialAccounts)

    async function deleteAccount(accountNo) {
        // create a confirmation dialog
        if (!confirm('Are you sure you want to delete this account?')) {
            return
        }
        const response = await fetch(`http://localhost:3000/api/accounts/${accountNo}`, {
            method: 'DELETE'
        })
        if (response.ok) {
            // 
            const r = await fetch(`http://localhost:3000/api/accounts/`)
            const newAccounts = await r.json()
            setAccounts(newAccounts)
        }
    }

    async function handleTypeChange(type) {
        const response = await fetch(`http://localhost:3000/api/accounts?type=${type}`)
        const accounts = await response.json()
        setAccounts(accounts)
    }

    return (
        <>
            <label for="acctType">
                Account Type
            </label>
            <select id="acctType" onChange={e => handleTypeChange(e.target.value)} className="filter-dropdown">
                <option value="All">All</option>
                <option value="Saving">Saving</option>
                <option value="Current">Current</option>
            </select>
            <table id="accounts">
                <thead>
                    <tr>
                        <th>Profile Pic</th>
                        <th>Account No</th>
                        <th>Account Type</th>
                        <th>Balance</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map(acct => <AccountRow account={acct} onDelete={deleteAccount} />
                    )}
                </tbody>
            </table>
        </>
    )
}
