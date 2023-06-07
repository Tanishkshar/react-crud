import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import firebase_database from "../firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "bootstrap";

const View = () => {
  const [student, setStudent] = useState({});

  const { id } = useParams();

  useEffect(() => {
    firebase_database
      .child(`students/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setStudent({ ...snapshot.val() });
        } else {
          setStudent({});
        }
      });
  }, [id]);

  return (
    <div
      style={{
        backgroundImage:
          "url('https://edge.99images.com/photos/wallpapers/nature-landscapes/sky%20android-iphone-desktop-hd-backgrounds-wallpapers-1080p-4k-uuotn.jpg')",
        height: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <br />
      <br />
      <br />
      <div className="container">
        <div className="card mx-auto" style={{ width: "40rem" }}>
          <div
            className="card-header active"
            style={{
              fontFamily: "times new roman",
              fontWeight: "bolder",
              fontSize: 30,
            }}
          >
            Student Details
          </div>
          <ul className="list-group list-group-flush">
            <li
              style={{
                fontFamily: "times new roman",
                fontWeight: "bolder",
                fontSize: 30,
              }}
              className="list-group-item list-group-item-primary"
            >
              Name: {student.name}
            </li>
            <li
              style={{
                fontFamily: "times new roman",
                fontWeight: "bolder",
                fontSize: 30,
              }}
              className="list-group-item list-group-item-danger"
            >
              Email: {student.email}
            </li>
            <li
              style={{
                fontFamily: "times new roman",
                fontWeight: "bolder",
                fontSize: 30,
              }}
              className="list-group-item list-group-item-success"
            >
              Contact: {student.contact}
            </li>
            <li
              style={{
                fontFamily: "times new roman",
                fontWeight: "bolder",
                fontSize: 30,
              }}
              className="list-group-item list-group-item-warning"
            >
              Fees: {student.fees}
            </li>
            <li
              style={{
                fontFamily: "times new roman",
                fontWeight: "bolder",
                fontSize: 30,
              }}
              className="list-group-item list-group-item-info"
            >
              Status: {student.status}
            </li>
          </ul>
        </div>
        <br />
        <div className="container">
          <Link to="/">
            <button
              style={{
                fontFamily: "times new roman",
                fontWeight: "bolder",
              }}
              type="button"
              class="btn btn-dark"
            >
              Return
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
