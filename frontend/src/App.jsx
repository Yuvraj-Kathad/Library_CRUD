// import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
// import Students from "./pages/Students";
// import Books from "./pages/Books";
// import Library from "./pages/Library";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <nav style={{ padding: 10 }}>
//         <NavLink to="/" style={{ marginRight: 10 }}>Students</NavLink>
//         <NavLink to="/books" style={{ marginRight: 10 }}>Books</NavLink>
//         <NavLink to="/library">Library</NavLink>
//       </nav>

//       <Routes>
//         <Route path="/" element={<Students />} />
//         <Route path="/books" element={<Books />} />
//         <Route path="/library" element={<Library />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Students from "./pages/Students";
// import Books from "./pages/Books";
// import Library from "./pages/Library";
// import "./styles.css";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <h1 className="title">CRUD</h1>

//       <div className="grid-2">
//         <Students />
//         <Books />
//       </div>

//       <Library />

//       <Routes />
//     </BrowserRouter>
//   );
// }







import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Students from "./pages/Students";
import Books from "./pages/Books";
import Library from "./pages/Library";

export default function App() {
  return (
    <BrowserRouter>
      <h1 style={{ textAlign: "center" }}>CRUD</h1>

      <nav style={{ textAlign: "center" }}>
        <NavLink to="/students">Student</NavLink>
        <NavLink to="/books">Book</NavLink>
        <NavLink to="/library">Library</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Students />} />
        <Route path="/students" element={<Students />} />
        <Route path="/books" element={<Books />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </BrowserRouter>
  );
}

