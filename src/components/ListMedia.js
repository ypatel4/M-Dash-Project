import React from "react";
import { useState, useEffect } from "react";
import "../styles/ListMedia.css";
import PosterGrid from "./PosterGrid";
import Pagination from "react-js-pagination";

const ListMedia = (props) => {
  const [error, setError] = useState(null);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(parseInt(props["page"]));
  const [total_pages, setTotal_pages] = useState(1);
  const param = props["param"];

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      await fetch(
        "https://api.themoviedb.org/3" +
          param +
          "?api_key=" +
          process.env.REACT_APP_TMDB_API_KEY +
          "&language=en-US&page=" +
          page
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setMedia(result.results);
            setTotal_pages(result.total_pages);
            setLoading(false);
          },
          (error) => {
            setError(error);
            setLoading(false);
          }
        );
    };

    fetchMedia();
  }, [param, page]); 

  function changePage(event) {
    window.history.pushState(
      {},
      "",
      window.location.protocol +
        "//" +
        window.location.host +
        param +
        "/" +
        event
    );
    setPage(event);
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (loading) {
    return <></>;
  } else {
    return (
      <>
        <div className="container">
          <PosterGrid media={media} loading={loading} param={props["param"]} />
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
      </>
    );
  }
};

export default ListMedia;