import "./App.css"
import {AddBook,EditBook,BookDetail,BookList} from "./pages"
import { BrowserRouter, Route,Routes } from "react-router-dom";

function App() {
 
  return (
    <div className="container">
      <h1>React.js CRUD </h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BookList />}></Route>
          <Route path="/book/create" element={<AddBook />}></Route>
          <Route path="/book/edit/:id" element={<EditBook />}></Route>
          <Route path="/book/detail/:id" element={<BookDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
