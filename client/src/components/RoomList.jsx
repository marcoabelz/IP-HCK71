import { Link } from "react-router-dom";

export function RoomList(props) {
  // console.log(props);
  const { id, name, price, description, availability } = props.room;
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
          {description}
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
          Rp. {price}
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
          {availability ? "Available" : "Booked"}
        </td>
        <td
          className="
                     text-center text-dark
                     font-medium
                     text-base
                     py-5
                     px-2
                     bg-white
                     border-b border-r border-[#E8E8E8]
                     "
        >
          <Link
            to={`/cms/rooms/${id}/edit`}
            className="mr-3
                        border border-success
                        py-2
                        text-sm
                        px-6
                        text-primary
                        inline-block
                        rounded
                        hover:bg-success hover:text-white
                        "
          >
            Edit
          </Link>
          <Link
            to={`/cms/rooms/${id}/upload`}
            className="
                        border border-primary
                        text-sm
                        py-2
                        px-6
                        text-primary
                        inline-block
                        rounded
                        hover:bg-primary hover:text-white
                        "
          >
            Upload Photos
          </Link>
        </td>
      </tr>
    </>
  );
}
