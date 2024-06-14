import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";

export function CmsBookingList(props) {
  console.log(props);
  const navigate = useNavigate();
  const { id, orderId, name, room, grandTotal, status } = props.booking;
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
                     bg-[#F3F6FF]
                     border-b border-l border-[#E8E8E8]
                     "
        >
          {orderId}
        </td>
        <td
          className="
                     text-center text-dark
                     font-medium
                     text-base
                     py-5
                     px-2
                     bg-[#F3F6FF]
                     border-b border-l border-[#E8E8E8]
                     "
        >
          {name}
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
          {room}
        </td>
        <td
          className="
                     text-center text-dark
                     font-medium
                     text-base
                     py-5
                     px-2
                     bg-[#F3F6FF]
                     border-b border-[#E8E8E8]
                     "
        >
          Rp. {grandTotal}
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
        {/* <td
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
          {status ? (
            ""
          ) : (
            <button onClick={() => handleUpdateStatusPayment()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Update Payment Status
            </button>
          )}
        </td> */}
      </tr>
    </>
  );
}
