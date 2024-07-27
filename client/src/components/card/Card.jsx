import { Link } from "react-router-dom";
import "./card.scss";
import { useContext,useState,useEffect } from "react";
import { useLoaderData ,useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function Card({ item }) {
  const [saved, setSaved] = useState(item.isSaved);
    // const [isOwner, setIsOwner] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

//  useEffect(() => {
//     const fetchSaveStatus = async () => {
//       if (!currentUser) return; // No need to fetch if not logged in
//       try {
//         const response = await apiRequest.get(`/users/saveStatus/${item.id}`);
//         setSaved(response.data.isSaved);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchSaveStatus();
//   }, [item.id, currentUser]);


  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    try {
      await apiRequest.post("/users/save", { postId: item.id });
      setSaved((prev) => !prev); // Toggle saved status
    } catch (err) {
      console.log(err);
      // Optionally handle errors
    }
  };


  const handleSendMessage = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      // Assuming item.userId is the ID of the post owner
      const receiverId = item.userId;
      await apiRequest.post("/chats", { receiverId });
      navigate("/profile");
    } catch (err) {
      console.error("Error opening chat:", err);
    }
  };

  //  const handleDelete = async () => {
  //   if (!currentUser) {
  //     navigate("/login");
  //     return;
  //   }
  //   try {
  //     await apiRequest.delete(`/posts/${item.id}`);
  //     // Optionally update the state or navigate away after deletion
  //     // For example, you could refresh the page or navigate to a different route
  //     window.location.reload(); // Refresh to reflect changes
  //   } catch (err) {
  //     console.error("Error deleting post:", err);
  //   }
  // };

  
   
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
           <button className="icon" onClick={handleSave}
           style={{
            backgroundColor: saved ? "#fece51" : "white",
          }}
           >
           <img src="/save.png" alt="" />
           
           </button>
           <button className="icon" onClick={handleSendMessage}>
           <img src="/chat.png" alt="" />
           </button>
           <button className="icon" >
           <img src="/delete.png" alt="Delete" />
           </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
