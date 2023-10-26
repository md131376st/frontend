import {useState} from "react";
import StandaredSignUpPopUp from "./registerpop";
import Authentication from "./authentication";
import Button from 'react-bootstrap/Button';



const PopUpAuth = (props) => {
    const [show, setShow] = useState(false);
    const [showlogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const hidelogin = () => {
        setShowLogin(false);
    }
    const showloginfn = () => {
        setShowLogin(true);
        setShowSignUp(false);
    }
    const hideSignup = () => {
        setShowSignUp(false);
    }
    const showsignupfn = () => {
        setShowSignUp(true);
        setShowLogin(false);
    }
    const hide = () => {
        setShow(false);
    }
    return (<>
            <Button  variant="secondary"
                    onClick={e => {
                        setShowLogin(true);
                        setShow(true);
                    }}>Login
            </Button>
            <Authentication show={showlogin}
                                 hide={hidelogin}
                                 signup={showsignupfn}
                                 setLoggedIn ={props.setLoggedIn}
                                 key={showlogin}
                                 user = {props.user}
                                 setUser={props.setUser}
            />
            <StandaredSignUpPopUp show={showSignUp}
                                  hide={hideSignup}
                                  login={showloginfn}
                                  key={showSignUp}/>
        </>

    );
}
export default PopUpAuth;