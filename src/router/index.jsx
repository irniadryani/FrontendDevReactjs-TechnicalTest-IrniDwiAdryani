import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import Dashboard from "../pages/index";
import DetailRestaurant from "../pages/DetailRestaurant";

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route index element={<Dashboard />} />
        <Route
          path="/detail_restaurant/:restaurantId"
          element={<DetailRestaurant />}
        />
      </Route>
    </>
  )
);
export default Router;
