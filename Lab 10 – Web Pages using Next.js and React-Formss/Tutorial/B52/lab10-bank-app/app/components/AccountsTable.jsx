'use client'
import React from 'react'
import AccountRow from './AccountRow'
import { useState } from 'react'

export default function AccountsTable({ initialAccounts }) {
    const [accounts, setAccounts] = useState(initialAccounts)

    async function handleLoadAccounts(acctType) {
        const response = await fetch(`http://localhost:3000/api/accounts?type=${acctType}`)
        const filteredAccounts = await response.json()
        setAccounts(filteredAccounts)
    }
    async function handleDeleteAccount(accountNo) {
        if (!confirm('Are you sure you want to delete this account?')) return

        const response = await fetch(`http://localhost:3000/api/accounts/${accountNo}`, {
            method: 'DELETE'
        })
        if (response.ok) handleLoadAccounts('All')

    }

    return (
        <>
            <label for="acctType">
                Account Type
            </label>
            <select id="acctType" onChange={e => handleLoadAccounts(e.target.value)} className="filter-dropdown">
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
                        accounts.map(acct =>
                            <AccountRow
                                key={acct.id}
                                acct={acct}
                                onDeleteAccount={handleDeleteAccount}
                            />
                        )}
                </tbody>
            </table>
        </>
    )
}
