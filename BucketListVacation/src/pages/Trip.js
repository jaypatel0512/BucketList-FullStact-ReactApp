import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link, useNavigate } from "react-router-dom";

function Trip() {
  const [trips, setTrips] = useState([]);

  const sendGetRequest = async () => {
    try {
      let token = localStorage.getItem("token");

      let config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      };

      const response = await axios.get(
        "http://localhost:8000/api/trips/",
        config
      );
      setTrips(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    sendGetRequest();
  }, []);
  return (
    <div className="py-20 h-screen bg-gray-100">
      <div className="p-10">
        <div className="px-10 py-2 border-b-2 border-gray-400 font-normal text-2xl">
          Upcoming Trips
          <Link to="/register">Add Trip</Link>
        </div>
        <div className="pt-10 px-20 grid grid-cols-1 gap-4">
          {trips.map((item) => (
            <TripCard trip={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Trip;

const TripCard = ({ trip }) => {
  var status;
  if (trip.status === "true") {
    status = <span className="text-green-500">{trip.status}</span>;
  } else {
    status = <span className="text-red-500">{trip.status}</span>;
  }

  return (
    <div className="p-4 overflow-hidden shadow-lg rounded-md border-2 border-blue-300 bg-gray-300">
      <div className="grid grid-cols-3">
        <div>
          <img src={trip.img} className="rounded-lg border-2 border-blue-300" />
        </div>
        <div>
          <div className="text-lg font-medium text-blue-500">{trip.name}</div>
          <div>{trip.description}</div>
         
        </div>
        <div className="text-normal font-medium">
          <div>{moment.utc(trip.startDate).format("MMM Do, YYYY")}
                <RemoveIcon/>
               {moment.utc(trip.endDate).format("MMM Do, YYYY")}</div>
          <div ><button className="bg-blue-500"><EditIcon /></button> | <button className="bg-red-700"><DeleteIcon/></button></div>
        </div>
        <div>
        
        </div>
      </div>
    </div>
  );
};
