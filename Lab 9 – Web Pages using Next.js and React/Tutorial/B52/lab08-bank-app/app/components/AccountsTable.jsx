'use client'
import React, { useState } from 'react'
import AccountsRow from './AccountsRow'

export default function AccountsTable({ initialAccounts }) {
    const [accounts, setAccounts] = useState(initialAccounts)

    async function handleTypeChange(type) {
        const BASE_URL = `http://localhost:3000/api/accounts?type=${type}`
        const res = await fetch(BASE_URL)
        const filteredAccounts = await res.json()
        setAccounts(filteredAccounts)
    }
    async function handleDeleteAccount(accountNo) {
        if (!confirm('Are you sure you want to delete this account?')) return

        const BASE_URL = `http://localhost:3000/api/accounts/${accountNo}`
        const res = await fetch(BASE_URL, {
            method: 'DELETE',
        })
        handleTypeChange('All')
    }

    return (
        <>
            <label htmlFor="acctType">
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
                        <th>Profile Image</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>Account No</th>
                        <th>Account Type</th>
                        <th>Balance</th>
                        <th>Email</th>
                        <th>Date Opened</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        accounts.map(account =>
                            <AccountsRow acct={account} onDeleteAccount={handleDeleteAccount} />
                        )
                    }
                </tbody>
            </table>
        </>
    )
}
