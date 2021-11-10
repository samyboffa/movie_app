import "./App.css";
import { MovieList } from "./Components/MovieList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMovies } from "./Redux/actions/movies";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies());
  });
  return (
    <div className="App">
      <MovieList />
    </div>
  );
}

export default App;
