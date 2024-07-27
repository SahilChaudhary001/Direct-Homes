import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";



function HomePage() {
  const{currentUser}=useContext(AuthContext);



  console.log(currentUser);
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Unlock the Door to Your New Home – Start Your Journey Here.</h1>
          <p>
          Discover your dream home with us. Explore the best properties, invest in your future, and find your perfect space today. Whether you're buying, selling, or renting, our platform offers reliable, secure, and hassle-free real estate solutions. Your trusted partner in every step of your real estate journey.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
