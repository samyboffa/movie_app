import React, { useState } from "react";
import "./MovieCard.css";
import { like } from "../svg/svg";
import { dislike } from "../svg/svg";
import { bin } from "../svg/svg";
import { useDispatch } from "react-redux";
import { deleteMovie, toggleLikes } from "../Redux/actions/movies";

export const MovieCard = ({ movie, images }) => {
  const dispatch = useDispatch();
  const likeRatio = (movie.likes * 100) / (movie.likes + movie.dislikes);
  const dislikeRatio = (movie.dislikes * 100) / (movie.likes + movie.dislikes);
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const [previousAction, setPreviousAction] = useState("");

  const handleToggleLikes = (likeOrDislike) => {
    dispatch(
      toggleLikes(movie.id, likeOrDislike, alreadyLiked, previousAction)
    );
    setAlreadyLiked(true);
  };
  const handleDelete = () => {
    dispatch(deleteMovie(movie.id));
  };

  return (
    <div className="cardContainer">
      <div className="cardHeader">
        <div className="deleteSection">
          <span onClick={() => handleDelete()}>{bin}</span>
        </div>
        <img
          className="cardImage"
          src={images[movie.id - 1]}
          alt={movie.title}
          width="438px"
          height="643px"
        />
      </div>

      <h2 className="cardTitle">{movie.title}</h2>
      <p className="cardCategory">{movie.category}</p>
      <div className="rateSection">
        <span
          onClick={() => {
            handleToggleLikes("like");
            setPreviousAction("like");
          }}
        >
          {like}
        </span>{" "}
        {movie.likes}
        <span
          onClick={() => {
            handleToggleLikes("dislike");
            setPreviousAction("dislike");
          }}
        >
          {dislike}
        </span>{" "}
        {movie.dislikes}
        <div className="rateRatio">
          <div
            className="positive"
            style={{
              width: `${likeRatio}%`,
              height: "2px",
              backgroundColor: "#2fd337",
            }}
          ></div>
          <div
            className="negative"
            style={{
              width: `${dislikeRatio}%`,
              height: "2px",
              backgroundColor: "#d32f2f",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
