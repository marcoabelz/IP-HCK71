import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { Link } from "react-router-dom";

export function BookingForm() {
  const navigate = useNavigate();
  const [room, setRoom] = useState("");
  const [grandTotal, setgrandTotal] = useState(0);
  const { id } = useParams();
  let result;
  const getData = async () => {
    const { data } = await axios({
      method: "GET",
      url: `/rooms/${id}`,
    });
    result = data.room;
    setRoom({
      name: result.name,
      grandTotal: result.price,
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const handlePayment = async () => {
    try {
      await axios({
        method: "POST",
        url: `bookings/${id}`,
        data: {
          grandTotal: grandTotal,
        },
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(room);
  return (
    <>
      {/* component */}
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
      {/* <link rel="stylesheet" href="./assets/styles/styles.css" /> */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n      .form-select {\n        background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\");\n        background-repeat: no-repeat;\n        background-position: right 0.5rem center;\n        background-size: 1.5em 1.5em;\n        -webkit-tap-highlight-color: transparent;\n      }\n\n      .submit-button:disabled {\n        cursor: not-allowed;\n        background-color: #D1D5DB;\n        color: #111827;\n      }\n\n      .submit-button:disabled:hover {\n        background-color: #9CA3AF;\n      }\n\n      .credit-card {\n        max-width: 420px;\n        margin-top: 3rem;\n      }\n\n      @media only screen and (max-width: 420px)  {\n        .credit-card .front {\n          font-size: 100%;\n          padding: 0 2rem;\n          bottom: 2rem !important;\n        }\n\n        .credit-card .front .number {\n          margin-bottom: 0.5rem !important;\n        }\n      }\n    ",
        }}
      />
      <div className="m-4">
        <div className="credit-card w-full sm:w-auto shadow-lg mx-auto rounded-xl bg-white" x-data="creditCard">
          <header className="flex flex-col justify-center items-center">
            <div className="relative" x-show="card === 'front'" x-transition:enter="transition ease-out duration-300" x-transition:enter-start="opacity-0 transform scale-90" x-transition:enter-end="opacity-100 transform scale-100">
              <img className="w-full h-auto" src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/svg-cards/card-visa-front.png" alt="front credit card" />
              <div className="front bg-transparent text-lg w-full text-white px-12 absolute left-0 bottom-12">
                <p className="number mb-5 sm:text-xl" x-text="cardNumber !== '' ? cardNumber : '0000 0000 0000 0000'" />
                <div className="flex flex-row justify-between">
                  <p x-text="cardholder !== '' ? cardholder : 'Card holder'" />
                  <div className="">
                    <span x-text="expired.month" />
                    <span x-show="expired.month !== ''">/</span>
                    <span x-text="expired.year" />
                  </div>
                </div>
              </div>
            </div>
            <ul className="flex">
              <li className="mx-2">
                <img className="w-16" src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/computop.png" alt="" />
              </li>
              <li className="mx-2">
                <img className="w-14" src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/verified-by-visa.png" alt="" />
              </li>
              <li className="ml-5">
                <img className="w-7" src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/mastercard-id-check.png" alt="" />
              </li>
            </ul>
          </header>
          <main className="mt-4 p-4">
            <h1 className="text-xl font-semibold text-gray-700 text-center">Invoice</h1>
            <div className="">
              <div className="my-3">
                <h1>
                  Room Name: <b>{room.name}</b>
                </h1>
              </div>
              <div className="my-3">
                <h1>
                  Grand Total: Rp <b>{room.grandTotal}</b>
                </h1>
              </div>
            </div>
          </main>
          <footer className="mt- p-4">
            <button
              onClick={() => handlePayment()}
              className="submit-button px-4 py-3 rounded-full bg-blue-300 text-blue-900 focus:ring focus:outline-none w-full text-xl font-semibold transition-colors"
              x-bind:disabled="!isValid"
              x-on:click="onSubmit()"
            >
              Pay now
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}
