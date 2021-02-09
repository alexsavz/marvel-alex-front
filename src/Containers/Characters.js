import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDebounce } from 'use-debounce';
import CharCard from "../Components/CharCard";
import Searchbar from "../Components/Searchbar";
import Loader from "../Components/Loader";
import Cookies from "js-cookie";
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';


const Characters = ({setFavorite, setNotFavorite, setChecked, token}) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [value] = useDebounce(search, 500);
    const [skip, setSkip] = useState("");
    const [limit, setLimit] = useState("");
    const [totalResults, setTotalResults] = useState();
    const totalPages = Math.ceil(totalResults / limit);


    // Pagination component style
    const useStyles = makeStyles((theme) => ({
      root: {
        '& > *': {
          marginTop: theme.spacing(2),
        },
      },
    }));

    const classes = useStyles();

  useEffect(()=> {
    const fetchData = async () => {
      setLimit(100);
      setIsLoading(true);
      const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/characters?
      &skip=${skip}&limit=${limit}&name=${value}&apiKey=sGdBjvSQE8P4JwAC`);
      setData(response.data.results);
      setTotalResults(response.data.count);
      setIsLoading(false);
      console.log(Cookies.get("token"));
    };
    fetchData();
  }, [value, skip, limit]);

  const handleSearch = event => {
    setSearch(event.target.value);
  }
  
  const handlePage = (number) => {
    if(number === 1){
      setSkip(0);
    }
    else{
      setSkip(100*(number-1));
    }
  }
  // Save the selected character in the db
  // console.log(data);
  // console.log(totalPages);

  return !isLoading ?(
    <div className="wrapper">
      <h1>Liste des personnages marvel</h1>
      {/* <input type="number" onChange={handlePage}/> */}
      <Searchbar 
      handleSearch={handleSearch} 
      value={search} 
      />
      <div className="cards-container">
        {
          data.map((result, index) => {
            
            const url = result.thumbnail.path + "." + result.thumbnail.extension; 
            return (
              <CharCard
              key={index}
              title={result.name}
              id={result._id}
              url={url}
              description={result.description}
              setFavorite={setFavorite}
              setNotFavorite={setNotFavorite}
              setChecked={setChecked}
              token={token}
              />
              )
          })
        }
        <div className="pagination">
          <div className={classes.root}>
            <Pagination count={totalPages} onChange={(event, page) => handlePage(page)} variant="outlined" />
          </div>
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

export default Characters;