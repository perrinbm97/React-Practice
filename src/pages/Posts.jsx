import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Posts = () => {
  //Get ID value from url
  const { id } = useParams();
  //Set empty array for post list
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState();
  const [searchId, setSearchId] = React.useState(id);

  function onSearch() {
    fetchPosts(searchId);
  }

  async function fetchPosts(userId) {
    setLoading(true);
    //Get data from API
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId || id}`,
    );
    setPosts(data);
    setLoading(false);
  }

  React.useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div className="post__search">
        <Link to="/">
          <button>← Back</button>
        </Link>
        <div className="post__seach--container">
          <label className="post__search--label">Search By ID</label>
          <input
            type="number"
            value={searchId}
            onChange={(event) => setSearchId(event.target.value)}
            onKeyDown={(event) => {
              event.key === "Enter" && onSearch();
            }}
          />
          <button onClick={onSearch}>Enter</button>
        </div>
      </div>
      {loading
        ? new Array(10).fill(0).map((_, index) => (
            <div className="post" key={index}>
              <div className="post__title">
                <div className="post__title--skeleton"></div>
              </div>
              <div className="post__body">
                <p className="post__body--skeleton"></p>
              </div>
            </div>
          ))
        : posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="post__title">{post.title}</div>
              <p className="post__body">{post.body}</p>
            </div>
          ))}
    </>
  );
};

export default Posts;
