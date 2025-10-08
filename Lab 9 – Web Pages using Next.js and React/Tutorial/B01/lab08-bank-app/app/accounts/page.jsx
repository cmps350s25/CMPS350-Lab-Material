import React from 'react'


const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export default function Accounts() {
    return (
        <ul>
            {numbers.map(num => <li className='red'>${num}</li>)}
        </ul>
    )
}
