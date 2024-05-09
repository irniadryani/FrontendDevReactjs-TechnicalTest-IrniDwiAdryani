import { FaStar } from "react-icons/fa";

export const MenuCard = ({ image, menuName, description, rating, id }) => {
  return (
    <div class="card card-compact w-full bg-base-100 shadow-xl p-0">
      <figure>
        <img src={image} alt={`menu-image-${id}`} className="w-full h-44" />
      </figure>
      <div class="card-body gap-0">
        <h2 class="card-title items-start text-left">{menuName}</h2>
        <div className="text-xs font-medium text-gray-500 text-left flex items-center gap-2">
          <FaStar className="text-yellow-300" size={18} />
          <p>{rating}</p>
        </div>
        <p className="text-xs font-light text-left mt-3">{description}</p>
      </div>
    </div>
  );
};
