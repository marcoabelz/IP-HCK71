import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";
import { Link } from "react-router-dom";

export function DetailRoom() {
  const [room, setRoom] = useState({});
  const { id } = useParams();
  let result;
  const getData = async () => {
    const { data } = await axios({
      method: "GET",
      url: `/rooms/${id}`,
      headers: {
        Authorization: "Bearer " + localStorage.access_token,
      },
    });
    // console.log(data);
    result = data.room;
    setRoom({
      name: result.name,
      price: result.price,
      description: result.description,
      imgUrl: result.Photos,
      availability: result.availability,
    });
  };

  const handleOnPay = async () => {
    // Trigger snap popup. @TODO: Replace TRANSACTION_TOKEN_HERE with your transaction token
    // window.snap.pay("8cbe6942-28f9-46fb-962c-23e8151f9924", {

    const { data } = await axios.get(`/rooms/${id}/payment/midtrans/initiate`, {
      headers: {
        Authorization: "Bearer " + localStorage.access_token,
      },
    });
    window.snap.pay(data.transactionToken, {
      onSuccess: async function (result) {
        /* You may add your own implementation here */
        alert("payment success!");
        console.log(result);
        await axios.patch(
          `/rooms/${id}/payment/success`,
          {
            orderId: data.orderId,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.access_token,
            },
          }
        );
        getData();
      },
      // onPending: function (result) {
      //   /* You may add your own implementation here */
      //   alert("wating your payment!");
      //   console.log(result);
      // },
      // onError: function (result) {
      //   /* You may add your own implementation here */
      //   alert("payment failed!");
      //   console.log(result);
      // },
      // onClose: function () {
      //   /* You may add your own implementation here */
      //   alert("you closed the popup without finishing the payment");
      // },
    });
  };
  useEffect(() => {
    getData();
  }, []);

  // console.log(result);
  // console.log(room);
  // console.log(room?.imgUrl && room.imgUrl[0]);

  return (
    <>
      {/* component */}
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <Link
          to={`/`}
          className="
               inline-block
               py-2
               px-7
               bg-slate-600
               rounded-full
               text-base text-white
               font-medium
               hover:border-primary hover:bg-slate-800 hover:text-white 
               transition
               "
          style={{ marginLeft: "10.5rem", marginTop: "10px" }}
        >
          Back
        </Link>
        <div className="container px-5 py-20 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img style={{ height: "450px" }} className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={room?.imgUrl && room.imgUrl[0].imgUrl} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-10">{room.name}</h1>
              <p className="leading-relaxed mb-10">{room.description}</p>

              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">Rp: {room.price}</span>
                {room.availability ? (
                  <button onClick={handleOnPay} to={`/bookings/${id}`} className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                    Book Now
                  </button>
                ) : (
                  <p style={{ cursor: "not-allowed" }} className=" flex ml-auto text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-500 rounded">
                    Booked
                  </p>
                )}

                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container px-5 mx-auto">
          <div className="justify-center lg:w-4/5 mx-auto flex flex-wrap">
            {room?.imgUrl &&
              room.imgUrl.map((e) => {
                return <img key={e.id} src={e.imgUrl} alt="" width={300} className="m-2 border rounded-lg" />;
              })}
          </div>
        </div>
      </section>
    </>
  );
}
