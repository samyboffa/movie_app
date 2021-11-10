export const getMovies = () => async (dispatch) => {
  import("../../data/movies").then(async (result) =>
    dispatch({
      type: "GET_MOVIES",
      payload: await result.movies$,
    })
  );
};

export const toggleLikes = (
  id,
  likeOrDislike,
  alreadyLiked,
  previousAction
) => {
  return {
    type: "LIKE_MOVIE",
    payload: { id, likeOrDislike, alreadyLiked, previousAction },
  };
};
export const deleteMovie = (id) => {
  return {
    type: "DELETE_MOVIE",
    payload: { id },
  };
};
