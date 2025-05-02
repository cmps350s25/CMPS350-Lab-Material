import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

class LibraryRepo {

    // Get all books
    async getAllBooks() {
        return await prisma.book.findMany({
            include: { author: true }
        })
    }

    // Get a specific book by ID
    async getBookById(bookId) {
        return await prisma.book.findUnique({
            where: { id: parseInt(bookId) },
            include: { author: true }

        })
    }

    // Create a new book
    async createBook(bookData) {
        return await prisma.book.create({ data: bookData })
    }

    // Update an existing book
    async updateBook(bookId, updatedData) {
        return await prisma.book.update({ data: updatedData, where: { id: parseInt(bookId) } })
    }

    // Delete a book
    async deleteBook(bookId) {
        return await prisma.book.delete({ where: { id: parseInt(bookId) } })
    }

    // Get all authors
    async getAllAuthors() {
        return await prisma.author.findMany({
            include: { books: true }
        })
    }

    // http://localhost:3000/books?authorid = 1
    // http://localhost:3000/books/1 [id]
    // Get a specific author by ID
    async getAuthorById(authorId) {
        return await prisma.author.findUnique(
            {
                where: { id: parseInt(authorId) },
                include: { books: true }
            })
    }

    // Create a new author
    async createAuthor(authorData) {
        return await prisma.author.create({ data: authorData })
    }

    // Update an existing author
    async updateAuthor(authorId, updatedData) {
        return await prisma.author.update({ data: updatedData, where: { id: parseInt(authorId) } })
    }

    // Delete an author
    async deleteAuthor(authorId) {
        return await prisma.author.delete({ where: { id: parseInt(authorId) } })
    }
}

export default new LibraryRepo()