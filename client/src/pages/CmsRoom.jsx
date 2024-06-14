import { Link, NavLink } from "react-router-dom";
import { RoomList } from "../components/RoomList";
import { useEffect, useState } from "react";
import axios from "../utils/axios";

export function CmsRoom() {
  const [rooms, setRooms] = useState([]);
  const fetchRooms = async () => {
    try {
      let { data } = await axios({
        method: "GET",
        url: "/rooms",
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      setRooms(
        data.map((el) => ({
          id: el.id,
          name: el.name,
          price: el.price,
          description: el.description,
          availability: el.availability,
          imgUrl: el.Photos[0],
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRooms();
  }, []);
  // console.log(rooms);
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
                        Room
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
                        Description
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
                        Price
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
                     border-r border-transparent
                     "
                      >
                        Register
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((room) => (
                      <RoomList key={room.id} room={room} />
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
