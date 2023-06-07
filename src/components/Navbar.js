import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import "./navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const [activeTab, setactiveTab] = useState("Home");
  const location = useLocation();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      setactiveTab("Home");
    } else if (location.pathname === "/About") {
      setactiveTab("About");
    } else if (location.pathname === "/add") {
      setactiveTab("/AddUpdate");
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?name=${search}`);
    setSearch("");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a
          style={{
            fontFamily: "times new roman",
            fontWeight: "bolder",
          }}
          className="navbar-brand"
          href="/"
        >
          Student Management System
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                style={{
                  fontFamily: "times new roman",
                  fontWeight: "bolder",
                }}
                className="nav-link active"
                aria-current="page"
                href="/"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/add">
                Add
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
          </ul>
          <form onSubmit={handleSubmit} className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search Through Name.."
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
