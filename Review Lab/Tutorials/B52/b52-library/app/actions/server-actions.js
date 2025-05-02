'use server'

import libraryRepo from "../repo/library-repo"


export async function getAllAuthorsAction() {
    return libraryRepo.getAllAuthors()
}
export async function deleteAuthorAction(authorId) {
    await libraryRepo.deleteAuthor(authorId)
}