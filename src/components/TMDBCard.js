import { useState, useEffect } from "react";

/**
 * @param {*} param0
 * @returns we will return the poster of the media
 */
const TMDBCard = ({ type, id, element, title, year }) => {
  const [error, setError] = useState(null);
  const [url, setURL] = useState();
  const [loading, setLoading] = useState(false);
  const [omdb, setOmdb] = useState(false);
  const [secondaryUrl, setURL2] = useState();

  let baseURL =
    window.location.protocol + "//" + window.location.host + "/info/";

  if (type === "/tv/") {
    id = id + "/external_ids";
  }
  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      let holdId;
      await fetch(
        "https://api.themoviedb.org/3" +
          type +
          id +
          "?api_key=" +
          process.env.REACT_APP_TMDB_API_KEY +
          "&language=en-US"
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setURL(result["imdb_id"] + type + result["id"]);
            setLoading(false);
            holdId = result["imdb_id"];
          },
          (error) => {
            setError(error);
            setLoading(false);
          }
        );

      if (type === "/tv/" || type === "/movie/") {
        if (!element["poster_path"]) {
          await fetch(
            "https://www.omdbapi.com/?i=" +
              holdId +
              "&apikey=" +
              process.env.REACT_APP_OMDB_API_KEY
          )
            .then((res) => res.json())
            .then(
              (result) => {
                if (result["Response"] !== "False") {
                  if (result["Poster"] !== "N/A") {
                    setURL2(result["Poster"]);
                    setOmdb(true);
                  }
                }
              },
              (error) => {
                setError(error);
                setOmdb(false);
              }
            );
        }
      }
    };
    fetchMedia();
  }, [id, type, element]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (loading) {
    return <></>;
  } else {
    // checking the errors
    if (!(`title` in element)) {
      if (!(`original_title` in element)) {
        title = `name`;
      } else {
        title = `original_title`;
      }
    }

    let image =
      "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
    if (!element["poster_path"] && omdb && !element["backdrop_path"]) {
      image = secondaryUrl;
    } else if (element["media_type"] === "person" && element["profile_path"]) {
      image = "https://image.tmdb.org/t/p/original/" + element["profile_path"];
    } else if (element["poster_path"]) {
      image = "https://image.tmdb.org/t/p/original/" + element["poster_path"];
    } else if (element["backdrop_path"]) {
      image = "https://image.tmdb.org/t/p/original/" + element["backdrop_path"];
    }

    return (
      <a href={baseURL + url}>
        <figure id={element[title]}>
          {`year` in element ? (
            <>
              <img
                className="center"
                src={image}
                alt={
                  `poster for ` +
                  element[title] +
                  ` (` +
                  element[year].substring(0, 4) +
                  `)`
                }
                title={
                  element[title] + ` (` + element[year].substring(0, 4) + `)`
                }
              />
              <figcaption>
                {element[title]} ({element[year].substring(0, 4)})
              </figcaption>
            </>
          ) : (
            <>
              <img
                className="center"
                src={image}
                alt={`poster for ` + element[title]}
                title={element[title]}
              />
              <figcaption>{element[title]}</figcaption>
            </>
          )}
        </figure>
      </a>
    );
  }
};

export default TMDBCard;
