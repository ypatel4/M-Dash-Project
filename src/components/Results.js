import { useState, useEffect } from "react";
import PosterGrid from "./PosterGrid";
import Pagination from "react-js-pagination";

/**
 * we will return the result of the search string with pagination if applies
 * @param {*} props
 * @returns
 */
export default function Results(props) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  let [resultsArray, setResults] = useState([]);
  let [page, setPage] = useState(parseInt(props["match"]["params"]["page"]));
  const [total_pages, setTotal_pages] = useState(1);

  function changePage(event) {
    window.history.pushState(
      {},
      "",
      window.location.protocol +
        "//" +
        window.location.host +
        "/results/" +
        props["match"]["params"]["title"] +
        "/" +
        event
    );
    setPage(event);
  }

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      await fetch(
        "https://api.themoviedb.org/3/search/multi?query=" +
          props["match"]["params"]["title"] +
          "&api_key=" +
          process.env.REACT_APP_TMDB_API_KEY +
          "&language=en-US&page=" +
          page
      )
        .then((res) => res.json())
        .then(
          (res) => {
            setTotal_pages(parseInt(res["total_pages"]));
            setResults(res["results"]);
            setLoading(false);
          },
          (error) => {
            setError(error);
            setLoading(false);
          }
        );
    };
    fetchMedia();
  }, [props, page]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (loading) {
    return <></>;
  } else {
    if (!resultsArray) {
      return (
        <>
          <h2>No results</h2>
        </>
      );
    } else {
      return (
        <div>
          <h1>Results for: {props["match"]["params"]["title"]}</h1>
          <div className="container">
            <PosterGrid media={resultsArray} loading={loading} param={"any"} />
            <br />
            <div className="pagination justify-content-center">
              <Pagination
                itemClass="page-item"
                linkClass="page-link"
                itemsCountPerPage={20}
                activePage={page}
                totalItemsCount={total_pages * 20}
                pageRangeDisplayed={5}
                onChange={(event) => changePage(event)}
                hideNavigation={true}
              />
            </div>
            <br />
          </div>
        </div>
      );
    }
  }
}