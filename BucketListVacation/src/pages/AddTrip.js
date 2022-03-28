import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import decode from "jwt-decode";
import cities from "../data/cities";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function AddTrip() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const { name, city, description, startDate, endDate } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let token = localStorage.getItem("token");
    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    let data = {
      name: name,
      city: city,
      description: description,
      startDate: startDate,
      endDate: endDate,
    };
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/trips/",
        data,
        config
      );

      navigate("/trip");
    } catch (err) {
      console.log(err.response);
    }
  };
  return (
    <div className="p-20">
      <div className="mt-8 max-w-md mx-auto">
        <div className="border-b-2">Add Trip</div>
        <form onSubmit={(e) => onSubmit(e)}>
          <label className="text-left">Name:</label>
          <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => handleChange(e)}
            placeholder="name"
            className={
              "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            }
          />
         
          {/* <input
            name="city"
            type="text"
            value={city}
            onChange={(e) => handleChange(e)}
            placeholder="city"
            className={
              "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            }
          /> */}

          <Autocomplete
            id="combo-box-demo"
            getOptionLabel={(cities) => `${cities.city}`}
            options={cities}
            sx={{ width: 300 }}
            isOptionEqualToValue={}
            noOptionsText={"no city available"}
            renderInput={(params) => <TextField {...params} label="Select City" />}
          />

          <label>Description:</label>
          <input
            name="description"
            type="text"
            value={description}
            onChange={(e) => handleChange(e)}
            placeholder="desc"
            className={
              "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            }
          />

          <label>Start Date:</label>
          <input
            name="startDate"
            type="date"
            value={startDate}
            onChange={(e) => handleChange(e)}
            placeholder="desc"
            className={
              "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            }
          />

          <label>End Date:</label>
          <input
            name="endDate"
            type="date"
            value={endDate}
            onChange={(e) => handleChange(e)}
            placeholder="desc"
            className={
              "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            }
          />

          <div className="flex items-center mt-3 justify-center">
            <button
              className={
                "bg-blue-700 hover:bg-blue-500 py-2 px-4 text-md text-white rounded border border-blue focus:outline-none focus:border-black"
              }
              type="submit"
              value="Register"
            >
              Add Car
            </button>
          </div>
        </form>
        <div className="flex items-center mt-3 justify-center">
          <Link to="/trip">Check all Trips</Link>
        </div>
      </div>
    </div>
  );
}

export default AddTrip;

{
  /* <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            /> */
}
