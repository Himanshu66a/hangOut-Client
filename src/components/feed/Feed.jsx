import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
const AU = process.env.REACT_APP_URI;


export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
 
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(AU + "posts/profile/" + username)
        : await axios.get(AU + "posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
    console.log(posts);
  }, [username, user._id]);




  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}

        {
          (!posts.length==0) ? (
            posts.map((p) => (
              <Post key={p._id} post={p} />
            ))
          ):
          (
            <h2 className="no-posts">No posts Yet
            <p>Follow some users or try posting something :)</p>
            </h2>
          )
        }


      </div>
    </div>
  );
}