import React from 'react'

export default function AccountRow({ account, onDelete }) {
    return (
        <tr id="row-{account.accountNo}">
            <td>
                <img src={account.profileImage} alt="profile pic" className="profile-pic" />
            </td>
            <td>{account.accountNo}</td>
            <td>{account.acctType}</td>
            <td>{account.balance}</td>
            <td>
                {account.balance >= 0 ?
                    <button className='btn-delete' onClick={() => onDelete(account.accountNo)}>
                        <i class="fas fa-trash">Delete</i>
                    </button>
                    : ''
                }
                <button className='btn-edit' >
                    <i class="fas fa-edit">Edit</i>
                </button>
            </td>
        </tr >
    )
}
