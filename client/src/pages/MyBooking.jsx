import { Link, NavLink } from "react-router-dom";
import { BookingList } from "../components/BookingList";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
export function MyBooking() {
  const [bookings, setBookings] = useState([]);
  const fetchBookings = async () => {
    try {
      let { data } = await axios({
        method: "GET",
        url: "/myBookings",
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      console.log(data);
      setBookings(
        data.map((el) => ({
          id: el.id,
          room: el.Room.name,
          status: el.paid,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBookings();
  }, []);
  console.log(bookings);

  return (
    <>
      {/* component */}
      <link rel="stylesheet" href="https://cdn.tailgrids.com/tailgrids-fallback.css" />
      {/* ====== Table Section Start */}
      <section className="bg-white py-10">
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="max-w-full overflow-x-auto">
                <table className="table-auto w-full">
                  <thead>
                    <tr className="bg-primary text-center">
                      <th
                        className=" w-1/6
                     min-w-[160px]
                     text-lg
                     font-semibold
                     text-white
                     py-4
                     lg:py-7
                     px-3
                     lg:px-4
                     border-l border-transparent
                     "
                      >
                        Room Name
                      </th>
                      <th
                        className="
                     w-1/6
                     min-w-[160px]
                     text-lg
                     font-semibold
                     text-white
                     py-4
                     lg:py-7
                     px-3
                     lg:px-4
                     "
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <BookingList key={booking.id} booking={booking} fetchBookings={fetchBookings} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ====== Table Section End */}
    </>
  );
}
