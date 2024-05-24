import { Link } from "react-router-dom";

export default function Paginate({
  pages,
  page,
  keyword = "",
  isAdmin = false,
}) {
  if (keyword) {
    //$keyword only
    keyword = keyword.split("?keyword=")[1].split("&")[0];
    console.log("splitting:", keyword);
  }

  return (
    pages > 1 && (
      <div>
        {[...Array(pages).keys()].map((x) => (
          <Link
            key={x + 1}
            to={
              !isAdmin
                ? `/?keyword=${keyword}&page=${x + 1}`
                : `/admin/productlist/?keyword=${keyword}&page=${x + 1}`
            }
          >
            {/* <div active={x + 1 === page}>{x + 1}</div> */}
          </Link>
        ))}
      </div>
    )
  );
}
