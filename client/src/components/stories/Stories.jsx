import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import "./stories.scss";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data: userData } = useQuery(
    ["user", currentUser?.id],
    () => makeRequest.get(`/users/find/${currentUser?.id}`).then((res) => res.data),
    {
      enabled: !!currentUser?.id,
    }
  );

  const userId = currentUser?.id;

  const { isLoading: postsLoading, error: postsError, data: postsData } = useQuery(
    ["posts", userId],
    () => makeRequest.get(`/posts?userId=${userId}`).then((res) => res.data)
  );

  return (
    <div className="stories">
      <div className="story">
        {!isLoading && userData ? (
          <>
            <img src={"/upload/" + userData.profilePic} alt={userData.name} />
            <span>{userData.name}</span>
            <button>+</button>
          </>
        ) : null}
      </div>
      {postsError ? (
        "Something went wrong"
      ) : postsLoading ? (
        "Loading..."
      ) : (
        postsData.map((post) => (
          <div className="story" key={post.id}>
            <img src={"/upload/" + post.img} alt={post.name} />
            <span>{post.name}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default Stories;
