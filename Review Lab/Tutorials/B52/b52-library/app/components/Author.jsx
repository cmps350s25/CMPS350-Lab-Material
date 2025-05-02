import React from 'react'
import Link from 'next/link'
export default function Author({ author }) {
    return (
        <Link href={`/authors/${author.id}`}>
            <div className="author-card">
                <img src={author.photo} alt="Author Name" className="author-photo" width={200} />
                <div className="author-info">
                    <h2 className="author-name">{author.name}</h2>
                    <p className="author-bio">{author.bio}</p>
                </div>

            </div>
        </Link>
    )
}
