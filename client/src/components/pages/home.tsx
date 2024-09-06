import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BountyNavbar from "../elements/navbar";
import Grid from "../elements/grid.tsx";
import ButtonNavbar from "../elements/buttonNavbar.tsx";

interface HomeProps {
  url: String;
}

const Home = (props: HomeProps) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const fetchData = () => {
    const username = localStorage.getItem("username");
    if (username === null) {
      navigate("/login");
      return;
    }

    fetch(props.url + "api/user/transaction/" + username, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid token");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <BountyNavbar />
      {userData !== null ? (
        <>
          <ButtonNavbar
            payload={userData}
            fetchData={fetchData}
            url={props.url}
          />
          <Grid payload={userData} fetchData={fetchData} url={props.url} />
        </>
      ) : (
        <>No bounties found</>
      )}
    </>
  );
};

export default Home;
