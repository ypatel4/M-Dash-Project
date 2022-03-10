import { useState, useEffect } from "react";
import TMDBCard from "./TMDBCard";
import "../styles/personInfo.css";

/**
 *
 * @param {*} param0
 * @returns we are fetching info from TMDB
 */
const PersonInfo = ({ tmdbID }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState([]);
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      await fetch(
        "https://api.themoviedb.org/3/person/" +
          tmdbID +
          "?api_key=" +
          process.env.REACT_APP_TMDB_API_KEY +
          "&language=en-US"
      )
        .then((res) => res.json())
        .then(
          (res) => {
            setPerson(res);
          },
          (error) => {
            setError(error);
          }
        );

      await fetch(
        "https://api.themoviedb.org/3/person/" +
          tmdbID +
          "/combined_credits?api_key=" +
          process.env.REACT_APP_TMDB_API_KEY +
          "&language=en-US"
      )
        .then((res) => res.json())
        .then(
          (res) => {
            setCredits(res);
          },
          (error) => {
            setError(error);
          }
        )
        .then(setLoading(false));
    };
    fetchInfo();
  }, [tmdbID]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (loading) {
    return <></>;
  } else {
    let image =
      "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
    if (person) {
      if (person["profile_path"]) {
        image = "https://image.tmdb.org/t/p/original/" + person["profile_path"];
      }
    }

    let acting = [];
    if (credits !== []) {
      if (`cast` in credits) {
        credits.cast.forEach((element, i) => {
          let title = "title";
          let year = "release_date";
          let type = "/movie/";
          if (element["media_type"] === "tv") {
            title = "name";
            year = "first_air_date";
            type = "/tv/";
          }
          acting.push(
            <div className="grid-item" id="grid-item" key={i}>
              <TMDBCard
                type={type}
                id={element["id"]}
                element={element}
                title={title}
                year={year}
              />
              {`character` in element ? (
                element["character"] ? (
                  <p>as {element["character"]}</p>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </div>
          );
        });
      }
    }

    return (
      <div>
        {person["name"] ? (
          <h1>{person["name"]}</h1>
        ) : (
          <h1>Unknown-actor</h1>
        )}

        <div className="Personal">
          {`profile_path` in person ? (
            person["profile_path"] ? (
              <img
                src={image}
                alt={`poster of ` + person["name"]}
                height="300px"
                width="250px"
              ></img>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}

          {`birthday` in person ? (
            person["birthday"] ? (
              <p>
                <b>Birth-date :</b> {person["birthday"]}
              </p>
            ) : (
              <p>
                <b>Birth-date :</b> Unknown
              </p>
            )
          ) : (
            <></>
          )}

          {`place_of_birth` in person ? (
            person["place_of_birth"] ? (
              <p>
                <b>Place of birth :</b> {person["place_of_birth"]}
              </p>
            ) : (
              <p>
                <b>Birthplace :</b> Unknown
              </p>
            )
          ) : (
            <></>
          )}
          {`biography` in person ? (
            person["biography"] ? (
              <p>
                <b>About :</b> {person["biography"]}
              </p>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
          {`homepage` in person ? (
            person["homepage"] ? (
              <a href={person["homepage"]}>
                <b>Homepage</b>
              </a>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}

          {`deathday` in person ? (
            person["deathday"] ? (
              <p>
                <b>Died :</b> {person["deathday"]}
              </p>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </div>
        {person["name"] ? (
          <div className="MovList">
            {acting !== [] ? (
              <div>
                <h2>
                  <b>Acting credits :</b>
                </h2>{" "}
                {acting}
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
};

export default PersonInfo;
