import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import firebase_database from "../firebase";

const Search = () => {
  const [data, setData] = useState({});
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let ans_to_query = useQuery();
  let search = ans_to_query.get("name");

  console.log(search);

  const searchData = (search) => {
    firebase_database
      .child("students")
      .orderByChild("name")
      .equalTo(search)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          setData(snapshot.val());
        }
      });
  };

  useEffect(() => {
    searchData(search);
  }, [search]);
  return (
    <div
      style={{
        backgroundImage:
          "url('https://edge.99images.com/photos/wallpapers/nature-landscapes/sky%20android-iphone-desktop-hd-backgrounds-wallpapers-1080p-4k-uuotn.jpg')",
        height: "94vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <br />
      <br />
      <div className="container w-100">
        {Object.keys(data).length === 0 ? (
          <h2>Oops! No Record founded</h2>
        ) : (
          <table className="table w-auto w-50 mx-auto table-dark table-hover table-bordered table-striped">
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
              </tr>
            </thead>
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <Link to="/">
        <button
          style={{ fontFamily: "times new roman" }}
          className="btn btn-danger"
        >
          Return
        </button>
      </Link>
    </div>
  );
};

export default Search;
