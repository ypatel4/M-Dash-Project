import ListMedia from "./ListMedia";

/**
 * @param {*} props
 * @returns will return top-IMDB-movies
 */
export default function TopRatedMovies(props) {
  return (
    <div>
      <h1>Top-IMDB-Movies</h1>
      <ListMedia
        param={"/movie/top_rated"}
        page={props["match"]["params"]["page"]}
      />
    </div>
  );
}
