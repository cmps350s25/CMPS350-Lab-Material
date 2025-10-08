'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

export default function AddOrEdit() {

    const searchParams = useSearchParams()
    const accountToEdit = Object.fromEntries(searchParams.entries())
    console.log(accountToEdit);

    const [account, setAccount] = useState(accountToEdit || {})

    const router = useRouter()
    function handleChange(e) {
        setAccount(
            { ...account, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let url = '/api/accounts'
        let method = 'POST'

        if (account.accountNo) {
            url = `/api/accounts/${account.accountNo}`
            method = 'PUT'
        }

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(account)
        }
        const response = await fetch(url, options)
        if (response.ok)
            alert('Account saved successfully')
        else
            alert('Error saving account')

        router.push('/', undefined, { shallow: true })

    }

    return (
        <>

            {(account.accountNo) ? <h3>Edit Account</h3> : <h3>Add Account</h3>}

            <form id="account-form" onSubmit={handleSubmit}>
                <label htmlFor="firstname">First Name</label>
                <input type="text" name="firstname" id="firstname" onChange={handleChange} value={account.firstname} />

                <label htmlFor="lastname">Last Name</label>
                <input type="text" name="lastname" id="lastname" onChange={handleChange} value={account.lastname} />

                <label htmlFor="acctType">Account Type</label>
                <select name="acctType" id="acctType" required onChange={handleChange} value={account.acctType} >
                    <option value=""></option>
                    <option value="Saving">Saving</option>
                    <option value="Current">Current</option>
                </select>

                <label htmlFor="balance">Balance</label>
                <input type="number" name="balance" id="balance" required onChange={handleChange} value={account.balance} />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onChange={handleChange} value={account.email} />

                <label for="dateOpened">Date Opened</label>
                <input type="date" name="dateOpened" id="dateOpened" onChange={handleChange} />

                <label htmlFor="gender">Gender</label>
                <select name="gender" id="gender" required onChange={handleChange} value={account.gender} >
                    <option value=""></option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <label htmlFor="profileImage">Profile Image URL</label>
                <input type="url" name="profileImage" id="profileImage" onChange={handleChange} value={account.profileImage} />

                <button type="Submit">Submit</button>
            </form>
        </>
    )
}