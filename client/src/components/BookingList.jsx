import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";

export function BookingList(props) {
  console.log(props);
  const navigate = useNavigate();
  const { id, room, status } = props.booking;
  const fetchBookings = props.fetchBookings;
  const handleUpdateStatusPayment = async () => {
    try {
      await axios({
        method: "PUT",
        url: `/bookings/${id}`,
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      fetchBookings();

      navigate("/cms/bookings");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <tr>
        <td
          className="
                     text-center text-dark
                     font-medium
                     text-base
                     py-5
                     px-2
                     bg-white
                     border-b border-[#E8E8E8]
                     "
        >
          {room}
        </td>
        <td
          className="
                     text-center text-dark
                     font-medium
                     text-base
                     py-5
                     px-2
                     bg-white
                     border-b border-[#E8E8E8]
                     "
        >
          {status ? <p className="text-green-400">Paid</p> : <p className="text-red-600">Unpaid</p>}
        </td>
      </tr>
    </>
  );
}
