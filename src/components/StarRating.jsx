import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

export const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<FaStar key={i} className="text-yellow-300" size={24} />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-300" size={24} />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-300" size={24} />);
    }
  }
  return <div className="flex gap-1">{stars}</div>;
};
