import { useEffect, useState } from "react";
import { useDebounce } from 'use-debounce';
import ComicCard from "../Components/ComicCard";
import axios from "axios";
import Searchbar from "../Components/Searchbar";
import Loader from "../Components/Loader";
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const Comics = ({token, setFavorite, setNotFavorite, setChecked, favoritesList}) => {

const [data, setData] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [search, setSearch] = useState("");
const [value] = useDebounce(search, 500);
const [skip, setSkip] = useState(100);
const [limit, setLimit] = useState(100);
const [totalResults, setTotalResults] = useState();
const totalPages = Math.ceil(totalResults / limit);



/* Pagination component style */

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
        marginTop: theme.spacing(2),
        },
    },
    }));

const classes = useStyles();

/* ---------------------------- */

  const handlePage = (number) => {
    if(number === 1){
      setSkip(0);
    }
    else{
      setSkip(100*(number-1));
    }
  }

  useEffect(()=> {
    const fetchData = async () => {
      setLimit(100);
      const response = await axios.get(`${process.env.REACT_APP_MARVEL_API}/comics?
      title=${value}&skip=${skip}&limit=${limit}&${process.env.REACT_APP_PRIVATE_KEY}`);
      setData(response.data.results);
      setIsLoading(false);
      setTotalResults(response.data.count);
    };
    fetchData();
  }, [value, skip, limit]);


  const handleSearch = event => {
    setSearch(event.target.value);
  }

  // render of the comics collection in an alphabetical order

  return !isLoading ?(
    <div className="wrapper">
        <h1>Liste des comics marvel</h1>
        <Searchbar handleSearch={handleSearch} value={search} />
        <div className="cards-container">
        {
            data.sort((a, b) => {
                var textA = a.title.toUpperCase();
                var textB = b.title.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
            })
            .map((result, index) => {
            return (
                <ComicCard
                key={index}
                data={result}
                token={token}
                setFavorite={setFavorite}
                setNotFavorite={setNotFavorite}
                setChecked={setChecked}
                favoritesList={favoritesList}
                />
                )
            })
        }
        </div>
      <div className="pagination">
          <div className={classes.root}>
            <Pagination count={totalPages} onChange={(event, page) => handlePage(page)} variant="outlined" />
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

export default Comics;