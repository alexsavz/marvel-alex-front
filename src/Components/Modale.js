import {useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import marvel from "../Assets/nav-logos-insider.png";

const Modale = ({handleModale, modale}) => {

  const [contact, setContact] = useState({email: "", password: "", ConfirmPassword: ""});
  const [signUp, setSignUp] = useState(false);
  const history = useHistory();
  
  // Controlled inputs
  
  const handleChange = (event) => {
    const {name, value} = event.target;
  
    setContact( () => {
      if(name === "email"){
        return {
          email : value, password : contact.password
        }
      }
      else if(name === "password"){
        return {
          email : contact.email, password : value 
        }
      }
      else if(name === "ConfirmPassword"){
        return {
          email : contact.email, password : contact.password, ConfirmPassword : value 
        }
      }
    });
 }

 // CALL API HTTP METHODE POST  
 const handleSubmitSignUp = async (event) => {
  event.preventDefault();
  console.log(contact);

    await axios.post(`${process.env.REACT_APP_BACK_API}/user/signup`, contact)
    .then(response => {
      console.log(response.data);
      Cookies.set("token", response.data.token,{ expires: 7 });
      handleModale(false);
    })
    .catch(error => {
      console.log(error);
    });
  }

  const handleSubmitSignIn = async (event) => {
    event.preventDefault();
    // console.log(contact);
  
      await axios.post(process.env.REACT_APP_BACK_API+"/user/signIn", contact)
      .then(response => {
        // console.log(response.data);
        Cookies.set("token", response.data.token,{ expires: 7 });
        handleModale(false);
      })
      .catch(error => {
        console.log(error);
      });
    }

  return (
    <div className={modale ? "modal" : "hidden"}>
      <section className="modal-form">
        <button className="close-modal" onClick={() => handleModale(false)}>Close</button>
        <form onSubmit={ signUp ? handleSubmitSignUp : handleSubmitSignIn} >
          <div className="modal-image">
            <img src={marvel} alt="marvel insider"/>
          </div>
          <div className="modal-main">
            <input type="email" placeholder="Email" name="email" onChange={handleChange} value={contact.email}/>
            <input type="password" placeholder="Mot-de-passe" name="password" onChange={handleChange} value={contact.password}/>
            {
              signUp && <input type="password" placeholder="Confirmez votre mot-de-passe" name="ConfirmPassword" onChange={handleChange} value={contact.ConfirmPassword}/>
            }
            <button onClick={() => { history.push("/");}} className="submit-button" type="submit">Envoyer</button>
            <div className="hr"></div>
            {
              !signUp && <button className="create-account" onClick={() => {setSignUp(true);}}>CR&Eacute;ER UN COMPTE</button>
            }
          </div>
          </form>
      </section>
    </div>      
);
}

export default Modale;