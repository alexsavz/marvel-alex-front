import {useState} from "react";
import {useHistory} from "react-router-dom";
import Modale from "../Components/Modale";
import marvelLogo from "../Assets/langfr-1920px-MarvelLogo.svg_uw9pi8.png";
import disney from "../Assets/svod_logo_white-homepage.png";

const Header = ({token, setUser}) => {

    const styleLogout = {
        borderLeft: "1 solid var(--lightgray)",
        borderRight: "1 solid var(--lightgray)",
        flex: 3,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }

    const history = useHistory();
    const [modale, setModale] = useState(null);


    const handleModale = (arg) => {
        return setModale(arg);
    }

    const handleLogout = () => {
        setUser(null);
        history.push("/");
    }

  return (
    <>
    <Modale handleModale={handleModale} modale={modale} />
    <header className="page-header">
        <div className="header-one">
            {
                token ? 
                <div className="header-image" onClick={() => { handleLogout() }}>
                    Se déconnecter
                </div> 
                :
                <div className="header-image" onClick={() => handleModale(true)}>
                    Sign In | Join
                </div>  
            }
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
                    history.push("/");
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