import "../styles/About.css";
export default function About() {

    return (
      <div className= "About">
        <h1>
          About
          </h1>
          <div className="info">
          <p>
            <center>
            Welcome to our M-Dash Application. <br/>
            Created By:- Yaksh Patel and Sai Likith sarbhu <br/>
            <br/> 
            </center>
          </p>
          </div>
          <div className="description">
            <h3>
              <center>Description</center>
            </h3>
            <p>
              <center>
            This Dashboard application gives information about all the Movies. 
            <br/>
            You can search a movie by it's name and you can get information about plot, ratings, cast etc.
            </center>                                                    
            </p>
          </div>
      </div>
    )
}