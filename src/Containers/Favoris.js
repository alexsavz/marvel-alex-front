import {useEffect, useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Loader from "../Components/Loader";

const Favoris = ({token}) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

  useEffect(()=> {
    const fetchData = async () => {
      const response = await axios.get("https://marvel-alex-back.herokuapp.com/list",{
        headers: {
          Authorization: "Bearer " + token,
          }
        } );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [token]);

  console.log(data);

  return !isLoading ?(
    <div className="wrapper">
        <div>
            <h1>Comics</h1>
                <div className="cards-container">
                    {data.map((e,i) => {
                        return (
                            e.type === "comics" &&
                            <div className="favorite" key={e._id}>
                                <div className="favorite-picture-comics"><img src={e.url} alt={e.title}/></div>
                                <div><h3>{e.title}</h3></div>
                            </div>
                        )
                    })}
                </div>
        </div>
        <div>
            <h1>Personnages</h1>
                <div className="cards-container">
                    {data.map((e,i) => {
                        return (
                            e.type === "character" &&
                            <div className="favorite" key={e._id}>
                                <div className="favorite-picture-characters" onClick={() => history.push(`comics/${e.id}`)}><img src={e.url} alt={e.title}/></div>
                                <div><h3>{e.title}</h3></div>
                            </div>
                        )
                    })}
                </div>
        </div>
    </div>
)
:
(
<>
    <Loader />
</>
  );
}

export default Favoris;