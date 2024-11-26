import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BountyNavbar from "../elements/navbar";
import Grid from "../elements/grid.tsx";
import ButtonNavbar from "../elements/buttonNavbar.tsx";
import LoadSpinner from "../elements/loadSpinner.tsx";
import TutorialForm from "../elements/tutorialForm.tsx";

interface People {
  name: string;
  amount: number;
  _id: string;
}

interface Transaction {
  name: string;
  amount: number;
  date: string;
  userOwes: boolean;
  peopleOwed: People[];
  _id: string;
}

interface Data {
  currentTransactions: Transaction[];
  previousTransactions: Transaction[];
}

interface UserData {
  data: Data;
}

interface HomeProps {
  url: String;
}

const Home = (props: HomeProps) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [bountyIsEmpty, setBountyIsEmpty] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);

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
      .then((data: UserData) => {
        setUserData(data);
        setLoading(false);
        if (data.data.currentTransactions.length === 0) {
          setBountyIsEmpty(true);
        } else {
          setBountyIsEmpty(false);
          setShowTutorial(false);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTutorialClose = () => {
    setShowTutorial(false);
  };

  return (
    <>
      <BountyNavbar />
      {loading ? (
        <div className="loading-container">
          <LoadSpinner />
        </div>
      ) : userData !== null ? (
        <>
          <ButtonNavbar
            payload={userData}
            fetchData={fetchData}
            url={props.url}
          />
          {bountyIsEmpty === false ? (
            <Grid payload={userData} fetchData={fetchData} url={props.url} />
          ) : (
            <>
              {showTutorial && (
                <TutorialForm handleClose={handleTutorialClose} />
              )}
              <div className="loading-container">
                <h2>No Bounties Found</h2>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="loading-container">
            <h2>User Information Not Found</h2>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
