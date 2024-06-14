import { Link } from "react-router-dom";

export default function Card(props) {
  //   console.log(props.room.imgUrl.imgUrl);
  const { id, name, price, description, availability } = props.room;
  const { imgUrl } = props.room.imgUrl;
  return (
    <>
      <div className="w-full md:w-1/2 xl:w-1/3 px-4">
        <div className="bg-white rounded-lg overflow-hidden mb-10">
          <img src={imgUrl} style={{ width: "100%", height: "400px" }} />
          <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
            <h3>
              <a
                href="javascript:void(0)"
                className="
                  font-semibold
                  text-dark text-xl
                  sm:text-[22px]
                  md:text-xl
                  lg:text-[22px]
                  xl:text-xl
                  2xl:text-[22px]
                  mb-4
                  block
                  hover:text-primary
                  "
              >
                {name}
              </a>
            </h3>
            <p className="text-base text-body-color leading-relaxed mb-7">{description}</p>
            <h1 className="mb-5">Rp: {price}</h1>
            <Link
              to={`/rooms/${id}`}
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
            >
              Room Detail
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
