import axios from "../utils/axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function CmsEditRoom() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [room, setRoom] = useState({
    name: "",
    price: 0,
    description: "",
  });
  const handleChangeInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setRoom({
      ...room,
      [key]: value,
    });
  };

  const fetchRoomData = async () => {
    const { data } = await axios({
      method: "GET",
      url: `/rooms/${id}`,
      headers: {
        Authorization: "Bearer " + localStorage.access_token,
      },
    });
    console.log(data.room);
    setRoom({
      name: data.room.name,
      price: data.room.price,
      description: data.room.description,
    });
  };
  useEffect(() => {
    fetchRoomData();
  }, []);

  const editRoomData = async (e) => {
    e.preventDefault();
    const { data } = await axios({
      method: "PUT",
      url: `/rooms/${id}`,
      data: {
        name: room.name,
        price: room.price,
        description: room.description,
      },
      headers: {
        Authorization: "Bearer " + localStorage.access_token,
      },
    });
    console.log(data.room);
    navigate("/cms/rooms");
  };
  return (
    <>
      <>
        {/* component */}
        <Link className="ml-10 btn" to={"/cms/rooms"}>
          Back
        </Link>
        <div className="flex items-center justify-center p-12">
          {/* Author: FormBold Team */}
          {/* Learn More: https://formbold.com */}
          <div className="mx-auto w-full max-w-[550px]">
            <form onSubmit={editRoomData}>
              <div className="mb-5">
                <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                  Room Name
                </label>
                <input
                  type="text"
                  value={room.name}
                  onChange={handleChangeInput}
                  name="name"
                  id="name"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={room.price}
                  onChange={handleChangeInput}
                  id="price"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="message" className="mb-3 block text-base font-medium text-[#07074D]">
                  Description
                </label>
                <textarea
                  rows={4}
                  name="description"
                  value={room.description}
                  onChange={handleChangeInput}
                  id="description"
                  className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  defaultValue={""}
                />
              </div>
              <div>
                <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </>
    </>
  );
}
