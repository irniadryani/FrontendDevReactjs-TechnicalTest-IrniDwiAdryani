import React, { useState } from "react";
import DetailRestaurant from "./DetailRestaurant";
import { Link } from "react-router-dom";
import { RestaurantCard } from "../components/RestaurantCard";
import { allRestaurantFn } from "../api/Restaurant";
import { useQuery } from "react-query";
import { BiLogoHeroku } from "react-icons/bi";
import { Navigation } from "../components/NavigationTwo";

export default function index() {
  const [selectedIsOpen, setSelectedIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(8);

  const { data: dataRestaurant, isLoading: loadingRestaurant } = useQuery(
    "allRestaurant",
    allRestaurantFn
  );

  console.log(selectedCategory);

  const filteredDataRestaurant = dataRestaurant?.filter((data) => {
    const matchingStatus = data.isOpen === selectedIsOpen;
    const matchingCategory = selectedCategory.includes(
      data.restaurant_category
    );
    const matchingPrice = selectedPrice.includes(Math.round(data.price));

    if (
      selectedIsOpen !== false &&
      selectedCategory.length > 0 &&
      selectedPrice.length > 0
    ) {
      return matchingStatus && matchingCategory && matchingPrice;
    }

    if (
      selectedIsOpen === false &&
      selectedCategory.length > 0 &&
      selectedPrice.length === 0
    ) {
      return matchingCategory;
    }

    if (
      selectedIsOpen !== false &&
      selectedCategory.length === 0 &&
      selectedPrice.length === 0
    ) {
      return matchingStatus;
    }

    if (
      selectedIsOpen === false &&
      selectedCategory.length === 0 &&
      selectedPrice.length > 0
    ) {
      return matchingPrice;
    }

    if (
      selectedIsOpen === false &&
      selectedCategory.length === 0 &&
      selectedPrice.length === 0
    ) {
      return dataRestaurant;
    }

    if (
      selectedIsOpen === true &&
      selectedCategory.length > 0 &&
      selectedPrice.length === 0
    ) {
      return matchingStatus && matchingCategory;
    }

    if (
      selectedIsOpen !== false &&
      selectedCategory.length === 0 &&
      selectedPrice.length > 0
    ) {
      return matchingStatus && matchingPrice;
    }

    if (
      selectedIsOpen === false &&
      selectedCategory.length > 0 &&
      selectedPrice.length > 0
    ) {
      return matchingPrice && matchingCategory;
    }
  });

  return (
    <div>
      <div className="flex flex-col justify-start mt-10">
        <p className="text-4xl text-black font-serif font-medium text-left">
          Restaurant
        </p>
        <p className="text-xl text-black font-serif font-medium text-left">
          Find a restaurant that matches your unique palate
        </p>
      </div>
      <Navigation
        setSelectedIsOpen={setSelectedIsOpen}
        selectedIsOpen={selectedIsOpen}
        setSelectedCategory={setSelectedCategory}
        setSelectedPrice={setSelectedPrice}
      />
      <p className="text-3xl text-black font-serif font-medium text-left my-5">
        All Restaurant
      </p>

      <div className="bg-gray-100 p-5 rounded-2xl">
        <div
          className={`${
            !loadingRestaurant &&
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          }`}
        >
          {loadingRestaurant && (
            <div className="flex justify-center items-center flex-col gap-2 w-full">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-r-2 border-sky-950"></div>
              <p>Loading Restaurant...</p>
            </div>
          )}
          {!loadingRestaurant &&
            filteredDataRestaurant
              ?.slice(0, itemsToShow)
              .map((data, id) => (
                <RestaurantCard
                  id={data.id}
                  name={data.restaurant_name}
                  image={data.restaurant_image}
                  status={data.isOpen}
                  category={data.restaurant_category}
                  price={data.price}
                  rating={data.rating}
                />
              ))}
        </div>

        {!loadingRestaurant && filteredDataRestaurant.length === 0 ? (
          <div className="flex justify-center items-center flex-col gap-2 w-full">
            <p className="text-2xl text-black font-bold">
              No Restaurant Available
            </p>
          </div>
        ) : null}

        {!loadingRestaurant && itemsToShow < filteredDataRestaurant?.length && (
          <div className="w-full flex items-center justify-center my-10">
            <button
              onClick={() =>
                setItemsToShow(
                  itemsToShow +
                    Math.min(8, filteredDataRestaurant.length - itemsToShow)
                )
              }
              className="py-3 w-full border border-sky-950 rounded-lg hover:bg-[rgb(8_47_73/var(--tw-border-opacity))] hover:text-white text-black"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* <Detail/> */}
    </div>
  );
}
