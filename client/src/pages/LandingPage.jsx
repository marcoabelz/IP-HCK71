import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Card from "../components/Card";

export function LandingPage() {
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
  console.log(rooms);
  return (
    <>
      {/* component */}
      <link rel="stylesheet" href="https://cdn.tailgrids.com/tailgrids-fallback.css" />
      {/* ====== Cards Section Start */}
      <section className="pt-20 lg:pt-[120px] pb-10 lg:pb-20 bg-[#F3F4F6]">
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            {rooms.map((room) => (
              <Card key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
