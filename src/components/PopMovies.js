import ListMedia from "./ListMedia";

/**
 * 
 * @param {*} props
 * @returns 
 */
export default function PopMovies(props) {
  return (
    <div>
      <h1>Trending Movies</h1>
      <ListMedia
        param={"/movie/popular"}
        page={props["match"]["params"]["page"]}
      />
    </div>
  );
}