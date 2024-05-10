import { Link } from "react-router-dom";
import { StarRating } from "./StarRating";

export const RestaurantCard = ({
  id,
  name,
  image,
  status,
  category,
  price,
  rating,
}) => {

  const convertPriceToSymbol = (price) => {
    // Round the price to the nearest whole number
    const roundedPrice = Math.round(price);
  
    // Create a string with a dollar sign repeated 'roundedPrice' times
    const priceSymbol = "$".repeat(roundedPrice);
  
    return priceSymbol;
  };

  const priceSymbol = convertPriceToSymbol(price);

  return (
    <div class="card card-compact w-full bg-white shadow-xl p-0">
      <figure>
        <img
          src={image}
          alt={`restaurant-image-${id}`}
          className="w-full h-44"
        />
      </figure>
      <div class="card-body items-start">
        <h2 class="card-title text-black">{name}</h2>
        <div>
          <StarRating rating={rating} />
        </div>
        <div className="flex justify-between items-center w-full gap-5">
          <p className="text-xs text-gray-500 font-medium text-left">
            {category} - {priceSymbol}
          </p>
          <div className="flex items-center gap-2">
            <div
              className={`${
                status === true ? "bg-green-500" : "bg-red-500"
              } w-2 h-2 rounded-full`}
            ></div>
            <p className="uppercase text-xs text-gray-500">
              {status === true ? "Open Now" : "Close"}
            </p>
          </div>
        </div>
        <Link to={`/detail_restaurant/${id}`} className="w-full">
          <div class="card-actions">
            <button class="btn bg-sky-950 text-white  w-full max-w-xl hover:bg-white hover:text-black border border-sky-950">
              Learn More
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};
