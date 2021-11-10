import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MovieCard } from "./MovieCard";
import image1 from "../images/oceans8.jpg";
import image2 from "../images/midnightSun.jpg";
import image3 from "../images/indispensable2.jpg";
import image4 from "../images/sansUnBruit.jpg";
import image5 from "../images/Creed2.jpg";
import image6 from "../images/pulpFiction.jpg";
import image7 from "../images/pulpFiction2.jpg";
import image8 from "../images/seven.jpg";
import image9 from "../images/inception.jpg";
import image10 from "../images/goneGirl.jpg";
import "./MovieList.css";
import { next, previous, reload } from "../svg/svg";
import { getMovies } from "../Redux/actions/movies";

export const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.moviesReducer.movies);
  const [showOnly, setshowOnly] = useState([]);
  const [eltPerPage, seteltPerPage] = useState(4);
  const [currentPage, setcurrentPage] = useState(0);
  let pageNumber = [];
  const [filteredMovies, setfilteredMovies] = useState([]);
  const numberOfPages = () => {
    setfilteredMovies([]);
    let sum = 0;
    if (showOnly.length) {
      movies.forEach((movie) => {
        showOnly.forEach((category) => {
          if (movie.category === category) {
            sum++;
            setfilteredMovies([...filteredMovies, movies]);
          }
        });
      });
      console.log(sum);

      return Math.ceil(sum / eltPerPage);
    } else {
      setfilteredMovies(movies);
      return Math.ceil(movies.length / eltPerPage);
    }
  };

  for (let i = 0; i < numberOfPages(); i++) {
    pageNumber.push(
      <button key={i} onClick={() => setcurrentPage(i)}>
        {i + 1}
      </button>
    );
  }
  let categories = [];
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
  ];

  const reloading = () => {
    dispatch(getMovies());
  };

  movies.forEach((movie) => {
    let alreadyPresent = false;
    categories.forEach((el) => {
      if (el === movie.category) {
        alreadyPresent = true;
      }
    });
    if (!alreadyPresent) {
      categories.push(movie.category);
    }
  });

  const handleChange = (e) => {
    if (e.target.checked) {
      setshowOnly([...showOnly, e.target.name]);
    } else {
      setshowOnly(showOnly.filter((el) => el !== e.target.name));
    }
  };
  const handlePagination = (e) => {
    seteltPerPage(e.target.value);
    setcurrentPage(0);
  };
  const handlePrevious = () => {
    if (currentPage > 0) {
      setcurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < Math.floor(movies.length / eltPerPage)) {
      setcurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="movieListContainer">
      <div className="filterSection">
        <h3 className="filterTitle">FILTER</h3>
        <form>
          {categories?.map((category, index) => (
            <div key={index} className="checkContainer">
              <input
                className="checkBoxSelect"
                type="checkbox"
                id={category}
                name={category}
                onChange={(e) => handleChange(e)}
              />
              <label className="checkBoxLabel" htmlFor={category}>
                {category}
              </label>
            </div>
          ))}
        </form>
        <h3 className="filterTitle">SHOW PER PAGE</h3>
        <form>
          <select
            name="pagination"
            id="pagination"
            onChange={(e) => handlePagination(e)}
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
          </select>
        </form>
      </div>
      <div className="rightSection">
        <div className="PagesNavigation">
          <button onClick={handlePrevious}>{previous}</button>
          {pageNumber}
          <button onClick={handleNext}>{next}</button>
        </div>
        <div className="movileList">
          {movies.length ? (
            movies.map((movie, index) =>
              showOnly.length ? (
                showOnly.map((category) =>
                  category === movie.category ? (
                    index < eltPerPage * (currentPage + 1) &&
                    index >= currentPage * eltPerPage ? (
                      <MovieCard movie={movie} images={images} key={index} />
                    ) : null
                  ) : null
                )
              ) : (
                <MovieCard movie={movie} images={images} key={index} />
              )
            )
          ) : (
            <div className="noData">
              <h1>
                NO DATA AVAILABLE <br />{" "}
                <p className="reload" onClick={reloading}>
                  {reload}
                </p>
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
