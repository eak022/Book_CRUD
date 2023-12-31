import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const BookList = () => {
  const [bookData, setBookData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://tiny-pear-caiman-hem.cyclic.app/`)
      .then((res) => res.json())
      .then((data) => {
        setBookData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const loadEdit = (id) => {
    navigate(`/book/edit/${id}`);
  };

  const loadDetail = (id) => {
    navigate(`/book/detail/${id}`);
  };

  const removeBook = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch(`https://tiny-pear-caiman-hem.cyclic.app/books/${id}`, {
        method: "DELETE", // หรือ PUT ตามการกำหนด API ของคุณ
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // ส่งข้อมูลลบไปยังเซิร์ฟเวอร์
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then(() => {
          const updatedBooks = bookData.filter((item) => item.id !== id);
          setBookData(updatedBooks);
          alert("Remove successfully");
        })
        .catch((err) => {
          console.error(err);
          // ใส่โค้ดสำหรับการจัดการข้อผิดพลาดหรือแจ้งเตือนผู้ใช้ในกรณีที่ไม่สามารถลบได้
        });
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Book List</h2>
        </div>
        <div className="card-body">
          <div className="divbtn">
            <Link to="/book/create" className="btn btn-success">
              Add New(+)
            </Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>Id</td>
                <td>Name</td>
                <td>Author</td>
                <td>Price</td>
                <td>Genre</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>             
              {bookData &&
                bookData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.author}</td>
                    <td>{item.price}</td>
                    <td>{item.genre}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => loadEdit(item.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeBook(item.id)}
                      >
                        Remove
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => loadDetail(item.id)}
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookList;
