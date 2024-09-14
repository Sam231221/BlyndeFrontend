import Rating from "../../../../components/reusables/Rating";

const CommentForm = () => {
  return (
    <div>
      <h1 className="text-lg my-3 text-gray-800 ">Add a Review</h1>
      <hr />
      <br />
      <div className="flex flex-col mb-2">
        <label className="text-xs mb-1" htmlFor="">
          Your rating: <span>*</span>
        </label>
        <div className="flex gap-3">
          <Rating
            className="text-gray-500"
            count={1}
            hoverEnabled
            fontSize="14px"
          />
          <Rating
            className="text-gray-500"
            count={2}
            hoverEnabled={true}
            fontSize="14px"
          />
          <Rating
            className="text-gray-500"
            count={3}
            hoverEnabled
            fontSize="14px"
          />
          <Rating
            className="text-gray-500"
            count={4}
            hoverEnabled
            fontSize="14px"
          />
          <Rating
            className="text-gray-500"
            count={5}
            hoverEnabled
            fontSize="14px"
          />
        </div>
      </div>
      <div className="flex flex-col mb-2">
        <label className="text-xs mb-1" htmlFor="">
          Your review: <span>*</span>
        </label>
        <textarea
          className="border text-xs border-gray-300/40 focus:outline-none p-2"
          id="comment"
          name="comment"
          cols="45"
          rows="8"
          required=""
        ></textarea>
      </div>
      <button
        type="button"
        className="px-3 py-2 mb-3 text-black bg-gray-200 hover:bg-gray-300 hover:text-white border border-gray-400 rounded-sm text-medium"
      >
        Submit
      </button>
    </div>
  );
};

export default CommentForm;
