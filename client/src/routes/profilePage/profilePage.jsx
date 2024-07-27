import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import axios from "axios"; 
import apiRequest from "../../lib/apiRequest";
import { Await, Link, useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { Suspense, useContext,useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const data = useLoaderData();

  const [searchParams] = useSearchParams(); // Initialize useSearchParams
  const receiverId = searchParams.get("receiverId"); // Get the receiverId from the URL

  const { updateUser, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();


  useEffect(() => {
    if (receiverId) {
      // If receiverId is present, add a chat with the receiver
      const addChat = async () => {
        try {
          await apiRequest.post("/chats", { receiverId });
        } catch (err) {
          console.log(err);
        }
      };
      addChat();
    }
  }, [receiverId]);

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // const handleDelete = async (postId) => {
  //   try {
  //     console.log(`Deleting post with ID: ${postId}`);
  //     await axios.delete(`/api/posts/${postId}`, { withCredentials: true });
  //     console.log(`Post with ID: ${postId} deleted successfully`);
  //     // Refresh the page or update state to remove the deleted post from the list
  //   } catch (err) {
  //     console.error(`Failed to delete post with ID: ${postId}`, err);
  //   }
  // };

  

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={currentUser.avatar || "noavatar.jpg"} alt="" />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.userPosts}  />}
            </Await>
          </Suspense>
          <div className="title">
            <h1>Saved List</h1>
            </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.chatResponse}
              errorElement={<p>Error loading chats!</p>}
            >
              {(chatResponse) => <Chat chats={chatResponse.data}/>}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;