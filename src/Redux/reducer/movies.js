const initialState = { loading: false, movies: [], categories: [] };

export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MOVIES":
      const categories = [];
      action.payload.forEach((movie) => {
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
      console.log(categories);
      return {
        ...state,
        movies: action.payload,
        loading: false,
        categories: categories,
      };

    case "LIKE_MOVIE":
      state.movies.forEach((el) => {
        if (el.id === action.payload.id) {
          if (!action.payload.alreadyLiked) {
            if (action.payload.likeOrDislike === "like") {
              el.likes++;
            } else {
              el.dislikes++;
            }
          } else {
            if (
              action.payload.likeOrDislike === "like" &&
              action.payload.previousAction === "dislike"
            ) {
              el.likes++;
              el.dislikes--;
            }
            if (
              action.payload.likeOrDislike === "dislike" &&
              action.payload.previousAction === "like"
            ) {
              el.likes--;
              el.dislikes++;
            }
          }
        }
      });
      return { ...state, movies: state.movies.map((movie) => movie) };
    case "DELETE_MOVIE":
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.payload.id),
      };
    default:
      return state;
  }
};
