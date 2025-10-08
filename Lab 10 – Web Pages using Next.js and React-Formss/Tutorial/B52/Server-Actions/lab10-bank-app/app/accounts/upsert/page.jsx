'use client'
import { addOrEditAccountAction } from '@/app/actions/server-actions'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function AddOrEdit() {

    const searchParams = useSearchParams()
    const account = Object.fromEntries(searchParams)

    return (
        <>
            <h3> {(!account.accountNo) ? 'Add Account' : 'Edit Account'}</h3>

            < form id="account-form" class="form" action={addOrEditAccountAction} >

                <input type="text" name="accountNo" id="accountNo" defaultValue={account.accountNo} hidden />

                <label htmlFor="firstname">First Name</label>
                <input type="text" name="firstname" id="firstname" defaultValue={account.firstname} />

                <label htmlFor="lastname">Last Name</label>
                <input type="text" name="lastname" id="lastname" defaultValue={account.lastname} />

                <label htmlFor="acctType">Account Type</label>
                <select name="acctType" id="acctType" required defaultValue={account.acctType}>
                    <option value=""></option>
                    <option value="Saving">Saving</option>
                    <option value="Current">Current</option>
                </select>

                <label htmlFor="balance">Balance</label>
                <input type="number" name="balance" id="balance" required defaultValue={account.balance} />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" defaultValue={account.email} />

                <label htmlFor="dateOpened">Date Opened</label>
                <input type="date" name="dateOpened" id="dateOpened" defaultValue={account.dateOpened} />

                <label htmlFor="gender">Gender</label>
                <select name="gender" id="gender" required defaultValue={account.gender}>
                    <option value=""></option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <label htmlFor="profileImage">Profile Image URL</label>
                <input type="url" name="profileImage" id="profileImage" defaultValue={account.profileImage} />

                <button type="Submit">Submit</button>
            </form>
        </>
    )
}
