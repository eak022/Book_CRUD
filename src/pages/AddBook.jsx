import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const AddBook = () => {
  const [book, setBook] = useState({
    name: "",
    author: "",
    price: 0.0,
    genre: "",
    image: "https://source.unsplash.com/random/200x200/?book",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookData = {
      name: book.name,
      author: book.author,
      price: book.price,
      genre: book.genre,
      image: book.image,
    };
    fetch("http://localhost:8000/book", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(bookData),
    })
      .then((res) => {
        alert("Save successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-title">
                <h2>Add new Book</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        required
                        name="name"
                        id="name"
                        value={book.name}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label htmlFor="author">Author</label>
                      <input
                        type="text"
                        required
                        name="author"
                        id="author"
                        value={book.author}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label htmlFor="price">Price</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        name="price"
                        id="price"
                        value={book.price}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label htmlFor="genre">Genre</label>
                      <input
                        type="text"
                        required
                        name="genre"
                        id="genre"
                        value={book.genre}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label htmlFor="image">Image</label>
                      <input
                        type="text"
                        required
                        name="image"
                        id="image"
                        value={book.image}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Save
                      </button>
                      <Link to="/book/list" className="btn btn-danger">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
