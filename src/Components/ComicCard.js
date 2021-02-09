import React from "react";
import Switch from '@material-ui/core/Switch';

const ComicCard = ({index, data, token, setFavorite, setNotFavorite, setChecked}) => {

    const url = data.thumbnail.path + "." + data.thumbnail.extension; 

    const handleSwitch  = (event) => {
        setChecked(event.target.checked);
        if(event.target.checked){
            setFavorite({
                id: data.id,
                type: "comics",
                title: data.title,
                description: data.description,
                url: url,
                user: token
            });
        }
        else {
            setNotFavorite({
                id: data.id,
                user: token
            });
        }
    }

  return (
        <div className="card">
            <div className="card-picture">
                <img className="comics" src={url} alt="comics"/>
            </div>
            {/* {data.description && <p>{data.description}</p>} */}
            <div className="card-content">
                <h3>{data.title}</h3>
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

export default ComicCard;