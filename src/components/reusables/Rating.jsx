import { useState, useMemo } from "react";

export default function Rating({
  color = "gold",
  count = 5,
  fontSize = "24px",
  value = 0,
  text,
  className = "",
  hoverEnabled = false,
  hoverColor = "orange",
}) {
  const [hovered, setHovered] = useState(false);

  const stars = useMemo(() => {
    const result = [];
    for (let i = 1; i <= count; i++) {
      let starClass = "far fa-star"; // Default: empty star

      if (hoverEnabled && hovered) {
        starClass = "fas fa-star"; // Full star on hover
      } else if (value >= i) {
        starClass = "fas fa-star"; // Full star for current value
      } else if (value >= i - 0.5) {
        starClass = "fas fa-star-half-alt"; // Half star for current value
      }

      result.push(
        <span key={i}>
          <i
            className={`${starClass} ${className}`} // Apply custom class
            style={{
              color: hoverEnabled && hovered ? hoverColor : color, // Change color on hover
              fontSize,
            }}
            aria-hidden="true" // Hide icon from screen readers
          ></i>
        </span>
      );
    }
    return result;
  }, [
    count,
    value,
    hoverEnabled,
    hovered,
    color,
    hoverColor,
    fontSize,
    className,
  ]);

  return (
    <span
      className={`rating items-center ${className}`}
      onMouseEnter={() => hoverEnabled && setHovered(true)}
      onMouseLeave={() => hoverEnabled && setHovered(false)}
      role="img"
    >
      {stars}
      {text && (
        <span className="text-zinc-800 text-sm font-semibold ml-2">{text}</span>
      )}
    </span>
  );
}
