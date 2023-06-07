import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import firebase_database from "../firebase";
import { useNavigate, useParams } from "react-router-dom";

const initState = {
  name: "",
  email: "",
  contact: "",
  fees: "120000",
  status: "",
};

const AddUpdate = () => {
  const [state, setState] = useState(initState);
  const [data, setData] = useState(initState);

  const navigate = useNavigate();
  const { id } = useParams();

  const { name, email, contact, fees, status } = state;

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

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initState });
    }
  }, [id, data]);

  // for getting values from input e is event
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // when there is id means for update
    if (!id) {
      if (!name || !email || !contact || !fees || !status) {
        // toastify library is used for displaying error
        toast.error("All fields are Compulsory!");
      } else {
        firebase_database.child("students").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Student is Added Successfully");
          }
        });
      }
    } else {
      firebase_database.child(`students/${id}`).set(state, (err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Student Updated Successfully!");
        }
      });
    }
    // connecting react to firebase

    setTimeout(() => navigate("/"), 500);
  };

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
      <br />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              style={{
                fontFamily: "times new roman",
                fontWeight: "bolder",
                fontSize: 30,
              }}
              htmlFor="name"
              className="form-label"
            >
              Name
            </label>

            <input
              type="text"
              style={{
                fontFamily: "times new roman",
                fontWeight: "bolder",
              }}
              onChange={handleInputChange}
              className="form-control"
              id="name"
              placeholder="Enter Your Name"
              aria-describedby="emailHelp"
              value={name || ""}
              name="name"
            />
          </div>
          <div className="mb-3">
            <label
              style={{
                fontFamily: "times new roman",
                fontWeight: "bolder",
                fontSize: 30,
              }}
              htmlFor="exampleInputPassword1"
              className="form-label"
            >
              Email
            </label>
            <input
              style={{
                fontFamily: "times new roman",
                fontWeight: "bolder",
              }}
              type="email"
              onChange={handleInputChange}
              className="form-control"
              id="email"
              placeholder="Enter Your Email"
              value={email || ""}
              name="email"
            />
          </div>
          <div className="mb-3">
            <label
              style={{
                fontFamily: "times new roman",
                fontWeight: "bolder",
                fontSize: 30,
              }}
              htmlFor="exampleInputPassword1"
              className="form-label"
            >
              Contact
            </label>
            <input
              style={{
                fontFamily: "times new roman",
                fontWeight: "bolder",
              }}
              type="number"
              placeholder="Enter Your Contact Number"
              onChange={handleInputChange}
              className="form-control"
              id="contact"
              name="contact"
              value={contact || ""}
            />
          </div>

          <div className="mb-3">
            <label
              style={{
                fontFamily: "times new roman",
                fontWeight: "bolder",
                fontSize: 30,
              }}
              htmlFor="exampleInputPassword1"
              className="form-label"
            >
              Fees
            </label>
            <input
              style={{
                fontFamily: "times new roman",
                fontWeight: "bolder",
              }}
              type="text"
              placeholder="120000"
              onChange={handleInputChange}
              className="form-control"
              id="fees"
              value={fees || ""}
              name="fees"
            />
          </div>

          <div className="mb-3">
            <label
              style={{
                fontFamily: "times new roman",
                fontWeight: "bolder",
                fontSize: 30,
              }}
              htmlFor="exampleInputPassword1"
              className="form-label"
            >
              Status
            </label>
            <input
              style={{
                fontFamily: "times new roman",
                fontWeight: "bolder",
              }}
              type="text"
              onChange={handleInputChange}
              className="form-control"
              id="status"
              value={status || ""}
              name="status"
              placeholder="Enter Your Status of Payment"
            />
          </div>

          <button
            style={{
              fontFamily: "times new roman",
              fontWeight: "bolder",
            }}
            type="submit"
            value="Save"
            className="btn btn-primary"
          >
            {id ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUpdate;
