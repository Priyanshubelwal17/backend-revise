export async function addBook(req, res) {
    const book = new Book(req.body)
    await book.save()
    res.status(201).json(book);
}

export async function readBook(req, res) {
    const books = await Book.find();
    res.json(books)
}

export async function readParticuarBook(req, res) {
    const book = await Book.findById(req.params.id);
    if (!book) res.status(404).json({ error: "Book not found" })
    res.json(book)
}
export async function updateBook(req, res) {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) res.status(404).json({ error: "Book not found" })
    res.json(updatedBook)
}

export async function deleteBook(req, res) {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) res.status(404).json({ error: "Book not found" })
    res.json({ message: "Book deleted", deleted: deletedBook })
}