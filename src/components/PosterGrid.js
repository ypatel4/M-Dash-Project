import TMDBCard from "./TMDBCard";

/**
 * we will return the array of each movie as a grid and we can redirect from it
 * @param {*} param0
 * @returns
 */
const PosterGrid = ({ media, loading, param }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  } else {
    let items = [];
    let count = 1;

    if (media) {
      media.forEach((element) => {
        let title = "title";
        let year = "release_date";
        let type = "/movie/";
        if (param === "/tv/popular" || param === "/tv/top_rated") {
          title = "name";
          year = "first_air_date";
          type = "/tv/";
        } else if (param !== "/movie/popular" && param !== "/movie/top_rated") {
          if (element["media_type"] === "tv") {
            title = "name";
            year = "first_air_date";
            type = "/tv/";
          } else if (element["media_type"] === "movie") {
            // movie
            title = "title";
            year = "release_date";
            type = "/movie/";
          } else {
            // person
            title = "name";
            year = "release_date";
            type = "/person/";
          }
        }
        items.push(
          <div className="grid-item" id="grid-item" key={count}>
            <TMDBCard
              type={type}
              id={element["id"]}
              element={element}
              title={title}
              year={year}
            />
          </div>
        );
        count++;
      });
    } else {
      return (
        <>
          <div>No matches found</div>
        </>
      );
    }
    return (
      <>
        <div className="grid-container">{items}</div>
      </>
    );
  }
};

export default PosterGrid;