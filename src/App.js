import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Components/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // useLocation,
} from "react-router-dom";
import Cookies from "js-cookie";

import Characters from './Containers/Characters';
import Comics from './Containers/Comics';
import Favoris from './Containers/Favoris';
import ComicsCharacterId from './Containers/ComicsCharacterId';

function App() {

  const [token, setToken] = useState(Cookies.get("token") || null);
  const [checked, setChecked] = useState(null);
  const [favorite, setFavorite] = useState({
    id:"",
    type:"",
    title: null,
    description:"",
    url:"",
    user: token
  })
  const [notFavorite, setNotFavorite] = useState({
    id: null,
    user: token
  });
  const [favoritesList, setFavoritesList] = useState([]);

  const setUser = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token);
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  // favorite or not favorite statement and db management
  useEffect(() => {
    if(checked){
      const HandleFavorite = async () => {
        try {
          if(favorite.title){
            const formData = new FormData();
            formData.append("id", favorite.id);
            formData.append("type", favorite.type);
            formData.append("title", favorite.title);
            formData.append("description", favorite.description);
            formData.append("url", favorite.url);
            formData.append("user", favorite.user);
    
          await axios.post(`${process.env.REACT_APP_BACK_API}/createfav`, formData);
          console.log("save in the db");
          }
        } catch (error) {
          console.log(error.message);
        }
      }
      HandleFavorite();
    }
    else{
      const HandleNotFavorite = async () => {
        try {
          if(notFavorite.id){
            const formData = new FormData();
            formData.append("id", notFavorite.id);
            formData.append("user", notFavorite.user);
    
          await axios.post(`${process.env.REACT_APP_BACK_API}/deletefav`, formData);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
      HandleNotFavorite();
    }
    if(token){
      const fetchFavoritesList = async () => {
        const list = await axios.get(`${process.env.REACT_APP_BACK_API}/list`,{
          headers: {
            Authorization: "Bearer " + token,
            }
          });
        setFavoritesList(list.data);
      } 
      fetchFavoritesList();
    }
  }, [checked, favorite, notFavorite,token]);
  
  // console.log(favorite);
  console.log(checked);
  // console.log(notFavorite);
  // console.log(favoritesList);

  return (
    <Router>
      <Header token={token} setUser={setUser} />
      <Switch>
        <Route exact path="/">
          <Characters 
          token={token} 
          setFavorite={setFavorite} 
          setChecked={setChecked}
          setNotFavorite={setNotFavorite}
          favoritesList={favoritesList}
          checked={checked}
           />
        </Route>
        <Route path="/comics/:id">
          <ComicsCharacterId />
        </Route>
        <Route path="/comics">
          <Comics 
          token={token} 
          setFavorite={setFavorite} 
          setChecked={setChecked}
          setNotFavorite={setNotFavorite}
          favoritesList={favoritesList}
          checked={checked}
          />
        </Route>
        <Route path="/favoris">
          <Favoris token={token} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
