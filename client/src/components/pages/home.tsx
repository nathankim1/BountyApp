import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BountyNavbar from "../elements/navbar";
import Grid from "../elements/grid.tsx";
import ButtonNavbar from "../elements/buttonNavbar.tsx";

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const fetchData = () => {
    const username = localStorage.getItem("username");
    if (username === null) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/api/user/transaction/" + username, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid token");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data:", data);
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
      <ButtonNavbar fetchData={fetchData} />
      {userData !== null ? (
        <Grid payload={userData} fetchData={fetchData} />
      ) : (
        <>No bounties found</>
      )}
    </>
  );
};

export default Home;
