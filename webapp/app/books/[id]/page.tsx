import BooksDetail from "@/components/books/BooksDetail";
import { NextPage } from "next";

const BookDetailPage: NextPage = () => {
    return <BooksDetail params={{
        id: "3"
    }} />
}

export default BookDetailPage;