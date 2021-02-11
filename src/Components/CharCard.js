import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Switch from '@material-ui/core/Switch';
import emptyImage from "../Assets/heroimage.jpg";
import Cookies from "js-cookie";

const CharCard = ({index, id, title, description, url, setFavorite, setNotFavorite, setChecked, favoritesList}) => {

    const history = useHistory();
    const [inFavorites, setInFavorites] = useState(false);

    const token = 
    Cookies.get("token");

    useEffect(() => {
        const isFavorite = favoritesList.filter(favorite => {
            return favorite.id === id;
        });
        if(isFavorite.length >= 1){
            setInFavorites(true);
        }
    },[]);

    const handleSwitch  = (event) => {
        setChecked(event.target.checked);
        setInFavorites(event.target.checked);
        if(event.target.checked){
            setFavorite({
                id: id,
                type: "character",
                title: title,
                description: description,
                url: url,
                user: token
            });
        }
        else {
            setFavorite(false);
            setNotFavorite({
                id: id,
                user: token
            });
        }
    }
    const path = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"

  return (
    <div className="card" >
        <div className="card-picture" onClick={() => history.push(`comics/${id}`)}>
            <img className="character" src={ url === path ? emptyImage : url } alt="character"/>
        </div>
        <div className="card-content gradient">
            <h3>{title}</h3>
                {
                    token &&
                    <div className="card-favorite"> 
                        <span>
                        Ajouter aux favoris
                        </span>
                        <Switch 
                        key={index} 
                        checked={inFavorites} 
                        onChange={handleSwitch} 
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </div>
                }
        </div>
    </div>
);
}

export default CharCard;