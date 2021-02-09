import {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import ComicCard from "../Components/ComicCard";

const ComicsCharacterId = () => {

    const { id } = useParams();

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {
        const fetchData = async () => {
        const response = await axios.get(`${process.env.REACT_APP_MARVEL_API}/comics/${id}?${process.env.REACT_APP_PRIVATE_KEY}`);
        setData(response.data);
        setIsLoading(false);
        };
        fetchData();
    }, [id]);

    console.log(id);
    console.log(data);

    return !isLoading?(
        <div className="wrapper">
            <div className="character-card">
                <div className="character-name">
                    <h1>{data.name}</h1>
                </div>
                <div style={
                    {backgroundImage: `url(${data.thumbnail.path + "." + data.thumbnail.extension})`,
                    minHeight: 300,
                    backgroundAttachment: "fixed",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    clipPath: "polygon(0 0,0 100%,100% 92%,100% 0)"
                }}>
                </div>
                {data.description && <div><h1>Description :</h1><p>{data.description}</p></div>}
            </div>
            
          {
              data.comics.map((comic,index) => {
                  return (
                    <ComicCard
                    key={index}
                    data={comic}
                    />
                  )
              })
          }
        </div>
      )
      :
        <>
            <Loader />
        </>
}

export default ComicsCharacterId;