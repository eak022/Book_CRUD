import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const BookDetail = () => {
  const { id } = useParams();
  const [bookData, setBookData] = useState({});

  useEffect(() => {
    fetch("https://eak022.github.io/databooks.github.io/db.json")
      .then((res) => res.json())
      .then((data) => {
        // ค้นหาหนังสือตาม ID ที่รับมาจาก params
        const book = data.find((book) => book.id === parseInt(id));
        // ตั้งค่าข้อมูลหนังสือ
        setBookData(book || {});
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
            {bookData && Object.keys(bookData).length > 0 && (
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
