import { Link, NavLink } from "react-router-dom";
import { CmsBookingList } from "../components/CmsBookingList";
import { useEffect, useState } from "react";
import axios from "../utils/axios";

export function CmsBooking() {
  const [bookings, setBookings] = useState([]);
  const fetchBookings = async () => {
    try {
      let { data } = await axios({
        method: "GET",
        url: "/bookings",
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      console.log(data);
      setBookings(
        data.map((el) => ({
          id: el.id,
          orderId: el.orderId,
          name: el.User.fullName,
          room: el.Room.name,
          grandTotal: el.Room.price,
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
                        Order Id
                      </th>
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
                        User Name
                      </th>
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
                        Grand Total
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
                      {/* <th
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
                        Action
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <CmsBookingList key={booking.id} booking={booking} fetchBookings={fetchBookings} />
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
