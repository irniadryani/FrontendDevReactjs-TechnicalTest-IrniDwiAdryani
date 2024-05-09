import React, { useState } from "react";
import { useQuery } from "react-query";
import { allRestaurantFn } from "../api/Restaurant";

export const Navigation = ({
  setSelectedIsOpen,
  selectedIsOpen,
  setSelectedCategory,
  setSelectedPrice,
}) => {
  const [isChecked, setIsChecked] = useState([]);
  const [isCheckedPrice, setIsCheckedPrice] = useState([]);
  const [isCheckedStatus, setIsCheckedStatus] = useState(false);

  // const handleCheckboxChange = (data) => {
  //   setIsChecked(!isChecked);
  //   setSelectedCategory(isChecked ? data : null);
  // };

  const categories = [
    {
      name: "Indonesian",
    },
    {
      name: "Fast Food",
    },
    {
      name: "Japan",
    },
    {
      name: "Korean",
    },
  ];

  const prices = [
    {
      value: 1,
      name: "$",
    },
    {
      value: 2,
      name: "$$",
    },
    {
      value: 3,
      name: "$$$",
    },
    {
      value: 4,
      name: "$$$$",
    },
    {
      value: 5,
      name: "$$$$$",
    },
  ];

  const handleCheckboxChange = (categoryName) => {
    if (isChecked.includes(categoryName)) {
      setIsChecked(isChecked.filter((category) => category !== categoryName));
      setSelectedCategory(
        isChecked.filter((category) => category !== categoryName)
      );
    } else {
      setIsChecked([...isChecked, categoryName]);
      setSelectedCategory([...isChecked, categoryName]);
    }
  };

  const handleCheckboxPriceChange = (restaurantPrice) => {
    if (isCheckedPrice.includes(restaurantPrice)) {
      setIsCheckedPrice(
        isCheckedPrice.filter((price) => price !== restaurantPrice)
      );
      setSelectedPrice(
        isCheckedPrice.filter((price) => price !== restaurantPrice)
      );
    } else {
      setIsCheckedPrice([...isCheckedPrice, restaurantPrice]);
      setSelectedPrice([...isCheckedPrice, restaurantPrice]);
    }
  };

  const handleClearFilter = () => {
    setIsCheckedPrice([])
    setIsChecked([])
    setIsCheckedStatus(false)
    setSelectedIsOpen(false);
    setSelectedCategory([]);
    setSelectedPrice([]);
  };

  return (
    <div className="mt-10 flex flex-col justify-center items-start lg:flex-row gap-5 lg:justify-start lg:items-center">
      <div className="w-20 pb-1">Filter By:</div>
      <div className="flex flex-col justify-center lg:flex-row lg:justify-between lg:items-center gap-5 w-full">
        <div class="flex items-center gap-2">
          <div class="flex items-center border-b border-gray-400 pb-1">
            <input
              type="radio"
              class="form-radio"
              name="radioDefault"
              id="radioOpenNow"
              checked={isCheckedStatus}
              onChange={() => setSelectedIsOpen(!selectedIsOpen)}
              onClick={() => {
                setIsCheckedStatus(!isCheckedStatus);
                setSelectedIsOpen(!selectedIsOpen);
              }}
            />
            <label
              class="ml-3 text-black text-sm font-medium"
              for="radioOpenNow"
            >
              Open Now
            </label>
          </div>
          <div class="relative">
            <details class="group [&_summary::-webkit-details-marker]:hidden">
              <summary class="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                <span class="text-sm font-medium"> Price </span>

                <span class="transition group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-4 w-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </summary>

              <div class="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2 text-left">
                <div class="w-64 rounded border border-gray-200 bg-white">
                  <ul className="space-y-1 border-t border-gray-200 p-4">
                    {prices.map((price) => (
                      <li key={price.name}>
                        <label
                          htmlFor={price.name}
                          class="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            value={price.value}
                            checked={isCheckedPrice.includes(price.value)}
                            onChange={() =>
                              handleCheckboxPriceChange(price.value)
                            }
                            class="size-5 rounded border-gray-300"
                          />
                          <span class="text-sm font-medium text-gray-700">
                            {price.name}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </details>
          </div>

          <div class="relative">
            <details class="group [&_summary::-webkit-details-marker]:hidden">
              <summary class="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                <span class="text-sm font-medium"> Categories </span>
                <span class="transition group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-4 w-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </summary>
              <div class="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2 text-left">
                <div class="w-64 rounded border border-gray-200 bg-white">
                  <ul className="space-y-1 border-t border-gray-200 p-4">
                    {categories.map((category) => (
                      <li key={category.name}>
                        <label
                          htmlFor={category.name}
                          class="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            value={category.name}
                            checked={isChecked.includes(category.name)}
                            onChange={() => handleCheckboxChange(category.name)}
                            class="size-5 rounded border-gray-300"
                          />
                          <span class="text-sm font-medium text-gray-700">
                            {category.name}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </details>
          </div>
        </div>
        <div>
          <button
            onClick={() => handleClearFilter()}
            className="px-10 btn rounded-md bg-white text-gray-900 outline-gray-900 hover:bg-sky-950 hover:text-white justify-items-end"
          >
            CLEAR ALL
          </button>
        </div>
      </div>
    </div>
  );
};
