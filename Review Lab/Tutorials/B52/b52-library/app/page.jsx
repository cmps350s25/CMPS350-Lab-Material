'use client'
import 'react'
import Image from "next/image";
import styles from "./page.module.css";
import libraryRepo from "./repo/library-repo";
import { getAllAuthorsAction } from "./actions/server-actions";
import { useEffect, useState } from "react";
import Author from './components/Author';


export default function Home() {
  const [authors, setAuthors] = useState([])
  async function handleSearch(e) {
    const query = e.target.value
    const authorsData = await getAllAuthorsAction()
    if (query.length == 0)
      setAuthors(authorsData)
    else
      setAuthors(authorsData.filter(author => author.name
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase())))
  }

  async function loadAuthors() {
    const authorsData = await getAllAuthorsAction()
    setAuthors(authorsData)
  }

  useEffect(() => {
    loadAuthors()
  }, [])
  return (
    <>
      <h1>Featured Authors</h1>

      <div className="search-container">
        <input type="text" className="search-box" onChange={handleSearch} />
        <div className="grid-container">
          {authors.map((author, index) => <Author author={author} key={index}></Author>)}
        </div>
      </div>
    </>
  );
}
