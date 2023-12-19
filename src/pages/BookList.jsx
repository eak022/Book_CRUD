import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const BookList = () => {
  const [bookData, setBookData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://eak022.github.io/databooks.github.io/db.json")
    .then((res) => res.json())
    .then((data) => {
      setBookData(data.book);
    })
    .catch((err) => {
      console.error(err);
    });
  }, []);

  const loadEdit = (id) => {
    navigate("/book/edit/" + id);
  };

  const loadDetail = (id) => {
    navigate("/book/detail/" + id);
  };

  const removeBook = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch("http://localhost:8000/book" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Remove successfully");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
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
                      <a
                        className="btn btn-success"
                        onClick={() => loadEdit(item.id)}
                      >
                        Edit
                      </a>
                      <a
                        className="btn btn-danger"
                        onClick={() => removeBook(item.id)}
                      >
                        Remove
                      </a>
                      <a
                        className="btn btn-primary"
                        onClick={() => loadDetail(item.id)}
                      >
                        Detail
                      </a>
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
