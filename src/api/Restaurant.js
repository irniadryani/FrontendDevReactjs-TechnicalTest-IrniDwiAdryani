import { Api } from "../lib/common";

export const allRestaurantFn = async () => {
  const response = await Api.get("Restaurant");
  return response.data;
};

export const restaurantByIdFn = async (id) => {
  const response = await Api.get(`Restaurant/${id}`);
  return response.data;
};

export const allMenuFn = async () => {
  const response = await Api.get("Menu");
  return response.data;
};
