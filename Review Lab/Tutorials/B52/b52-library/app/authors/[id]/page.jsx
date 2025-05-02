import libraryRepo from '@/app/repo/library-repo'
import React from 'react'


export default async function page({ params }) {
    const author = await libraryRepo.getAuthorById(params.id)
    return (
        <div>
            <h1>{author.name}</h1>
            <img src={author.photo} alt="" width={400} />
            <div>
                <h2>Books Authored</h2>
                <ul>
                    {author.books.map((book, index) => <>
                        <li>{book.title}</li>
                    </>)}
                </ul>
            </div>
        </div>
    )
}
