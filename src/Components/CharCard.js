// import { useState } from "react";
import { useHistory } from "react-router-dom";
import Switch from '@material-ui/core/Switch';

const CharCard = ({index, id, title, description, url, setFavorite, setNotFavorite, setChecked, token}) => {

    const history = useHistory();
    // const [isMousOver, setIsMousOver] = useState(false);

    // const handleMousOn = () => {
    //     setIsMousOver(true);
    // }

    // const handleMousOut = () => {
    //     setIsMousOver(false);
    // }

    const handleSwitch  = (event) => {
        setChecked(event.target.checked);
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
            setNotFavorite({
                id: id,
                user: token
            });
        }
    }

  return (
    <div className="card" >
            <div className="card-picture" onClick={() => history.push(`comics/${id}`)}>
              <img className="character" src={url} alt="character"/>
            </div>
            <div className="card-content">
                <h3>{title}</h3>
                <div className="card-favorite">
                    <span>
                        Ajouter aux favoris
                    </span>
                    <Switch key={index} onChange={handleSwitch} inputProps={{ 'aria-label': 'primary checkbox' }} />
                </div>
            </div>
            </div>
);
}

export default CharCard;