import {useState} from "react";
import {useHistory} from "react-router-dom";
import Modale from "../Components/Modale";
import marvelLogo from "../Assets/langfr-1920px-MarvelLogo.svg_uw9pi8.png";
import disney from "../Assets/svod_logo_white-homepage.png";

const Header = ({setUser}) => {

    const history = useHistory();
    const [modale, setModale] = useState(null);


    const handleModale = (arg) => {
        return setModale(arg);
    }

    // console.log(modale);

  return (
    <>
    <Modale handleModale={handleModale} modale={modale} />
    <header className="page-header">
        <div className="header-one">
            <button className="button" onClick={() => handleModale(true)}>
                    Sign In | Join
            </button>
            <div className="header-image">
                <img src={marvelLogo} alt="marvel"/>
            </div>
            <div className="header-image">
                <img src={disney} alt="Disney"/>
            </div>
        </div>
        <div>
            <div className="header-two">
                <button
                    onClick={() => {
                    history.push("/characters");
                    }}
                    className="header-button">
                    Personnages
                </button>
                <button
                    onClick={() => {
                    history.push("/comics");
                    }}
                    className="header-button">
                    Comics
                </button>
                <button
                    onClick={() => {
                    history.push("/favoris");
                    }}
                    className="header-button">
                    Favoris
                </button>
            </div>
        </div>
    </header>
    </>
);
}

export default Header;