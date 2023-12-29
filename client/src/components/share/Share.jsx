import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"; // Importe o useQuery
import { makeRequest } from "../../axios";

const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const { currentUser } = useContext(AuthContext); // Mova a definição de currentUser para o topo

  // Use o useQuery após definir currentUser
  const { data: userData, isLoading: isUserLoading } = useQuery(
    ["user", currentUser?.id],
    () => makeRequest.get(`/users/find/${currentUser?.id}`).then((res) => res.data),
    {
      enabled: !!currentUser?.id, // Ativa a consulta apenas se o ID do usuário estiver presente
    }
  );

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ desc, img: imgUrl });
    setDesc("");
    setFile(null);
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            {!isUserLoading && userData ? (
              <img src={"/upload/" + userData.profilePic} alt={userData.name} />
            ) : (
              <img src={Image} alt="Default" /> // Imagem padrão se não houver profilePic
            )}
            <input
              type="text"
              placeholder={`What's on your mind ${userData ? userData.name : 'User'}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
