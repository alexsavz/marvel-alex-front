import {useState, useEffect} from "react";
import Switch from '@material-ui/core/Switch';

const ComicCard = ({index, data, token, setFavorite, setNotFavorite, setChecked, favoritesList}) => {

    const [inFavorites, setInFavorites] = useState(false);

    useEffect(() => {
        const isFavorite = favoritesList.filter(favorite => {
            return favorite.id === data.id;
        });
        if(isFavorite.length >= 1){
            setInFavorites(true);
        }
    }, []);

    const handleSwitch  = (event) => {
        setInFavorites(event.target.checked);
        if(inFavorites){
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
    handleSwitch();

    const url = data.thumbnail.path + "." + data.thumbnail.extension; 

    

  return (
        <div className="card">
            <div className="card-picture">
                <img className="comics" src={url} alt="comics"/>
            </div>
            {/* {data.description && <p>{data.description}</p>} */}
            <div className="card-content gradient">
                <h3>{data.title}</h3>
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

export default ComicCard;