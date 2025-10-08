import Link from 'next/link'
import React from 'react'

export default function NavBar() {
    return (
        <nav>
            <ul className="navbar-nav">
                <li>Alpha Bank</li>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li >
                    <Link href="/accounts/upsert">Add Account</Link>
                </li>
                <li>
                    <Link href="/accounts/trans/add">Add Transaction</Link>
                </li>
            </ul>
        </nav >

    )
}
