import { Link } from "react-router-dom";

const RoomCard = ({
  roomID,
  totalMessages,
  totalUsers,
  professor,
  banner,
}: Room) => {
  return (
    <div>
      <div className="flex max-w-sm rounded shadow-lg">
        <img className="w-140px" src={banner} alt="Sunset in the mountains" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{roomID}</div>
          <div>{professor}</div>
        </div>
        <div className="flex-col">
          <div>Messages: {totalMessages}</div>
          <div>Users: {totalUsers}</div>
          <Link to={`/rooms/${roomID}`}>
            <button className="border" type="button">
              Click Me!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default RoomCard;
