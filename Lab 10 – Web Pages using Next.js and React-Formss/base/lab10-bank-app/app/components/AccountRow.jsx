import React from 'react'

export default function AccountRow({ acct, onDeleteAccount }) {
    return (
        <tr id={"row-" + acct.accountNo}>
            <td><img
                src={acct.profileImage}
                alt="Profile Image"
                className="profile-pic" />
            </td>
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
                    <button onClick={e => onDeleteAccount(acct.accountNo)} className="btn-delete">
                        <i className="fas fa-trash">Delete</i>
                    </button> : ''}
                <button onclick="handleEditAccount('{acct.accountNo}')" className="btn-edit">
                    <i className="fas fa-edit">Edit</i>
                </button>
            </td>
        </tr>
    )
}
