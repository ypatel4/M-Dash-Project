import "./movieCard.css";

export const MovieCard = (props) => {
  let { each } = props;
  let baseURL =
    window.location.protocol + "//" + window.location.host + "/info/";

  return (
    <div className="card-container">
      <a href={baseURL + each.imdbID} className="card">
        <img
          style={{ width: "100%", height: "100%" }}
          src={each.Poster}
          alt={`${each.Title}`}
          width="200"
        />
        <h5 style={{ textAlign: "center", color: "black" }}>
          {each.Title} ({each.Year})
        </h5>
      </a>
    </div>
  );
};
export default MovieCard;