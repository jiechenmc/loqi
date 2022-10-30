import { Link } from "react-router-dom";

const RoomCard = ({
  roomID,
  totalMessageCount,
  currentUserCount,
  professor,
  banner,
}: Room) => {
  return (
    <div>
      <div className="flex max-w-sm rounded shadow-lg">
        <img
          width={140}
          height={140}
          src={banner}
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{roomID}</div>
          <div>{professor}</div>
        </div>
        <div className="flex-col">
          <div>Messages: {totalMessageCount}</div>
          <div>Users: {currentUserCount}</div>
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
