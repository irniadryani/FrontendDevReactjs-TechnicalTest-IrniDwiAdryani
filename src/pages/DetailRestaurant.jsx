import React from "react";
import { allMenuFn, restaurantByIdFn } from "../api/Restaurant";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { StarRating } from "../components/StarRating";
import { MenuCard } from "../components/MenuCard";

export default function DetailRestaurant() {
  const { restaurantId } = useParams();

  const { data: dataRestaurantById, isLoading: loadingRestaurantById } =
    useQuery(["restaurantById", restaurantId], () =>
      restaurantByIdFn(restaurantId)
    );

  const { data: dataMenu, isLoading: loadingMenu } = useQuery(
    "allMenu",
    allMenuFn
  );

  const filteredMenuByRestaurantId = dataMenu?.filter(
    (item) => item.RestaurantId === restaurantId
  );

  console.log(dataRestaurantById);

  return (
    <div>
      <div className="flex flex-col justify-center items-center mb-10">
        <p className="text-4xl text-black font-serif font-medium  text-center">
          {dataRestaurantById?.restaurant_name}
        </p>
        <p className="text-xs font-light text-center">
          <StarRating rating={dataRestaurantById?.rating} />
        </p>
      </div>

      <div className="carousel w-full p-0">
        <div className="flex relative w-full rounded-xl">
          <img
            src={dataRestaurantById?.restaurant_image}
            className="w-full h-60 rounded-xl object-fill"
          />
        </div>
      </div>
      <p className="text-3xl text-black font-serif font-medium text-left my-5">
        Our Menu
      </p>
      <div
        className={`${
          !loadingMenu &&
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        }  bg-gray-100 p-5 rounded-2xl`}
      >
        {loadingMenu && (
          <div className="flex justify-center items-center flex-col gap-2 w-full">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-r-2 border-sky-950"></div>
            <p>Loading Menu...</p>
          </div>
        )}
        {!loadingMenu &&
          filteredMenuByRestaurantId.map((menu) => (
            <MenuCard
              id={menu.id}
              image={menu.menu_image}
              menuName={menu.menu_name}
              rating={menu.menu_rating}
              description={menu.menu_description}
            />
          ))}
      </div>
    </div>
  );
}
