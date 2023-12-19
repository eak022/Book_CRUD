import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const BookDetail = () => {
  const { id } = useParams();
  const [bookData, setBookData] = useState({});

  useEffect(() => {
    fetch(`https://eak022.github.io/databooks.github.io/db.json`) // ลบ query parameter ที่ส่ง id ออก เพราะที่นี่เราจะดึงข้อมูลทั้งหมด
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Debug: ดูข้อมูลที่ได้รับมาจาก API ไม่มีปัญหา

        // Assuming data structure is an object with 'books' as an array of books
        if (data && data.book && Array.isArray(data.book)) {
          const book = data.book.find((book) => book.id === parseInt(id));
          if (book) {
            console.log(book); // Debug: ดูข้อมูลหนังสือที่ได้หลังจากการค้นหา
            setBookData(book);
          } else {
            // Handle if the book with the specified ID is not found
            console.error("Book not found");
          }
        } else {
          console.error("Invalid data structure or missing books array");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6">
        <div className="container">
          <div className="card row">
            <div className="card-title">
              <h2>Book Detail</h2>
            </div>
            {console.log(bookData)} {/* Debug: ดูค่าของ bookData */}
            {bookData && (
              <div className="card-body">
                <img src={bookData.image} alt="book" />
                <div className="card-text">
                  <h3>
                    {bookData.name} - ({bookData.id})
                  </h3>
                  <h4>Author: {bookData.author}</h4>
                  <h4>Price: {bookData.price}</h4>
                  <h4>Genre: {bookData.genre}</h4>
                </div>
                <Link className="btn btn-danger" to="/">
                  Back to Listing
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
