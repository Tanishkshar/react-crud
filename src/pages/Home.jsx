import React, { useEffect, useState } from "react";
import firebase_database from "../firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  // now we have to show real time data on home screen
  const [data, setData] = useState({});
  const [sort, setSort] = useState(false);
  const [sortedData, setSortedData] = useState([]);
  useEffect(() => {
    firebase_database.child("students").on("value", (snapshop) => {
      if (snapshop.val() != null) {
        setData({ ...snapshop.val() });
      } else {
        setData({});
      }
    });
    return () => {
      setData({});
    };
  }, []);

  const ondelete = (id) => {
    if (window.confirm("Are You Sure You Want To Delete This Student?")) {
      firebase_database.child(`students/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Student is Successfully Deleted!");
        }
      });
    }
  };

  const handleChange = (e) => {
    setSort(true);
    firebase_database
      .child("students")
      .orderByChild(`${e.target.value}`)
      .on("value", (snapshot) => {
        let sortedData = [];
        snapshot.forEach((snap) => {
          sortedData.push(snap.val());
        });
        setSortedData(sortedData);
      });
  };
  const handleReset = () => {
    setSort(false);
    firebase_database.child("students").on("value", (snapshop) => {
      if (snapshop.val() != null) {
        setData({ ...snapshop.val() });
      } else {
        setData({});
      }
    });
    return () => {
      setData({});
    };
  };
  const filterdata = (value) => {
    firebase_database
      .child("students")
      .orderByChild("status")
      .equalTo(value)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          setData(snapshot.val());
        }
      });
  };
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

      <h1 style={{ fontFamily: "times new roman", fontWeight: "bold" }}>
        Student Database Register
      </h1>
      <br />

      <label
        style={{
          fontFamily: "times new roman",
          marginRight: "5px",
          fontWeight: "bold",
          fontSize: "25px",
        }}
        htmlFor="sort"
      >
        Sort{" "}
      </label>
      <select
        name="colValue"
        id=""
        className="dropdown"
        onChange={handleChange}
        style={{ marginRight: "10px" }}
      >
        <option value="">Select Any One</option>
        <option value="name">Name</option>
        <option value="contact">Contact</option>
        <option value="email">Email</option>
        <option value="fees">Fees</option>
        <option value="status">Status</option>
      </select>
      <label style={{ marginRight: "5px" }} htmlFor="">
        Status
      </label>
      <button
        type="button"
        class="btn btn-info "
        onClick={() => filterdata("Paid")}
        style={{ marginRight: "5px" }}
      >
        Paid
      </button>
      <button
        type="button"
        class="btn btn-secondary "
        onClick={() => filterdata("Unpaid")}
        style={{ marginRight: "5px" }}
      >
        UnPaid
      </button>
      <button className="btn btn-warning" onClick={handleReset}>
        Reset
      </button>
      <br />
      <br />
      <div className="container w-100">
        <table className="table w-50 mx-auto table-dark table-hover table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th style={{ fontFamily: "times new roman" }} scope="col">
                Name
              </th>
              <th style={{ fontFamily: "times new roman" }} scope="col">
                Email
              </th>
              <th style={{ fontFamily: "times new roman" }} scope="col">
                Contact
              </th>
              <th style={{ fontFamily: "times new roman" }} scope="col">
                Fees
              </th>
              <th style={{ fontFamily: "times new roman" }} scope="col">
                Status
              </th>
              {!sort && (
                <th
                  style={{ fontFamily: "times new roman" }}
                  scope="col"
                  className="w-auto"
                >
                  Action
                </th>
              )}
            </tr>
          </thead>
          {!sort && (
            <tbody>
              {Object.keys(data).map((id, index) => {
                return (
                  <tr>
                    <th style={{ fontFamily: "times new roman" }}>
                      {data[id].name}
                    </th>
                    <th style={{ fontFamily: "times new roman" }}>
                      {data[id].email}
                    </th>
                    <th style={{ fontFamily: "times new roman" }}>
                      {data[id].contact}
                    </th>
                    <th style={{ fontFamily: "times new roman" }}>
                      {data[id].fees}
                    </th>

                    <th style={{ fontFamily: "times new roman" }}>
                      {data[id].status}
                    </th>
                    <th
                      style={{ fontFamily: "times new roman" }}
                      className="w-auto"
                    >
                      <tr>
                        <td>
                          <Link to={`/view/${id}`}>
                            <button type="button" class="btn btn-primary">
                              View
                            </button>
                          </Link>
                        </td>

                        <td>
                          <button
                            type="button"
                            class="btn btn-danger "
                            onClick={() => ondelete(id)}
                          >
                            Delete
                          </button>
                        </td>
                        <td>
                          <Link to={`/update/${id}`}>
                            <button type="button" class="btn btn-success">
                              Update
                            </button>
                          </Link>
                        </td>
                      </tr>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          )}

          {sort && (
            <tbody>
              {sortedData.map((item, index) => {
                return (
                  <tr>
                    <th style={{ fontFamily: "times new roman" }}>
                      {item.name}
                    </th>
                    <th style={{ fontFamily: "times new roman" }}>
                      {item.email}
                    </th>
                    <th style={{ fontFamily: "times new roman" }}>
                      {item.contact}
                    </th>
                    <th style={{ fontFamily: "times new roman" }}>
                      {item.fees}
                    </th>

                    <th style={{ fontFamily: "times new roman" }}>
                      {item.status}
                    </th>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Home;
