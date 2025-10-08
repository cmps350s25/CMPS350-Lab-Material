'use client'
import { React, useState } from 'react'
import AccountRow from './AccountRow';


export default function AccountsTable({ initialAccounts }) {

    const [accounts, setAccounts] = useState(initialAccounts)
    const [type, setType] = useState('All')

    async function handleDeleteAccount(accountNo) {
        if (!confirm('Are you sure you want to delete this account?')) {
            return;
        }
        const BASE_URL = `http://localhost:3000/api/accounts/${accountNo}`;
        const response = await fetch(BASE_URL, { method: 'DELETE' });
        handleLoadAccounts(type);
    }

    async function handleLoadAccounts(type) {
        const BASE_URL = `http://localhost:3000/api/accounts?type=${type}`;
        const response = await fetch(BASE_URL);
        const filteredAccounts = await response.json();
        console.log(filteredAccounts)
        setAccounts(filteredAccounts);
        setType(type);

    }
    return (
        <>
            <label htmlFor="acctType">
                Account Type
            </label>
            <select id="acctType" onChange={e => handleLoadAccounts(e.target.value)} className={"filter-dropdown"} value={type}>
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
                    {accounts.map(acct =>
                        <AccountRow acct={acct}
                            handleDeleteAccount={handleDeleteAccount} />
                    )}
                </tbody>
            </table>
        </>
    )
}
