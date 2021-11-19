import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard";
import CreateUser from "./pages/CreateUser";
import UserList from "./pages/UserList";
import CreateBook from "./pages/CreateBook";
import BookList from "./pages/BookList";
import BorrowBook from "./pages/BorrowBook";
import ReturnBook from "./pages/ReturnBook";
import BookRecord from "./pages/BookRecord";

import './App.css'

function App() {
  return (
    <>
      
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/user" element={<CreateUser />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/book" element={<CreateBook />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/borrow" element={<BorrowBook />} />
          <Route path="/return" element={<ReturnBook />} />
          <Route path="/records" element={<BookRecord />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
