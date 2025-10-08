'use client'
import React from 'react'

export default function AccountRow({ acct, handleDeleteAccount }) {
    return (
        <tr id={"row-" + acct.accountNo}>
            <td><img src={acct.profileImage} alt="Profile Image" class="profile-pic" /></td>
            <td>{acct.firstname}</td>
            <td>{acct.lastname}</td>
            <td>{acct.gender}</td>
            <td>{acct.accountNo}</td>
            <td>{acct.acctType}</td>
            <td>{acct.balance} QR</td>
            <td>{acct.email}</td>
            <td>{acct.dateOpened}</td>
            <td>
                {acct.balance >= 0 ?
                    <button onClick={e => handleDeleteAccount(acct.accountNo)} class="btn-delete">
                        <i class="fas fa-trash">Delete</i>
                    </button> : ''}
                <button onclick="handleEditAccount('${acct.accountNo}')" class="btn-edit">
                    <i class="fas fa-edit">Edit</i>
                </button>
            </td>
        </tr>
    )
}
