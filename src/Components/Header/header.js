import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import PopUpAuth from "../authentication/popupAuth";
import {Nav} from "react-bootstrap";

const Header = (props) =>{
    return (
        <Navbar  bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home"> Bookshelf </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    { !props.loggedIn &&
                        <Nav>
                        <PopUpAuth user={props.user} setUser={props.setUser} setLoggedIn={props.setLoggedIn} />
                    </Nav>
                    }
                    { props.loggedIn &&
                        <Navbar.Text>
                            Signed in as: {props.user.username}
                        </Navbar.Text>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}
export default Header;