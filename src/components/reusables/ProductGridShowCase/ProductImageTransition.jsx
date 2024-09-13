import { useCallback, useState } from "react";
import { endpoint } from "../../../lib/api";
export default function ProductImageTransition({ name, img_albums }) {
  const [showFirstImage, setShowFirstImage] = useState(true);
  // Memoize event handlers to avoid unnecessary re-renders
  const handleImageError = useCallback((e) => {
    e.target.src = "https://via.placeholder.com/200x200?text=Image+Not+Found";
  }, []);
  return (
    <div
      onMouseEnter={() => setShowFirstImage(false)}
      onMouseLeave={() => setShowFirstImage(true)}
      className="relative w-full h-full overflow-hidden rounded-lg shadow-lg"
    >
      <img
        src={`${endpoint}${img_albums[0]?.image}`}
        onError={handleImageError}
        alt={name}
        width={300}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
          showFirstImage ? "opacity-100" : "opacity-0"
        }`}
      />

      <img
        src={`${endpoint}${img_albums[1]?.image}`}
        onError={handleImageError}
        alt={name}
        width={300}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
          showFirstImage ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
