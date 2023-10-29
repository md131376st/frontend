import React, {useState} from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBInput,

}
    from 'mdb-react-ui-kit';



import {useNavigate} from "react-router-dom";

import Modal from "react-bootstrap/Modal";

import {CloseButton, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {logIn} from "../../Api/userApi";
import MessageBox from "../MessageBox/MessageBox";
import jwt from 'jwt-decode';
import axios from "axios";


function Authentication(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const submit = async (e) => {
        e.preventDefault();
        try {
            await logIn({
                "username": username,
                "password": password
            }).then(
                res => {
                    if (res.status === 200) {

                        localStorage.setItem('access_token', res.access);
                        localStorage.setItem('refresh_token', res.refresh);
                        props.setUser( jwt(res.data.access));
                        console.log(jwt(res.data.access))
                        props.setLoggedIn(true)
                        MessageBox({
                            type: "success",
                            text: "your are login"
                        });
                        props.hide()
                    }
                }
            )
        }
        catch (error){
            MessageBox({
                            type: "error",
                            text: error
                        });
        }


    }

    return (
        <Modal show={props.show} onHide={props.hide} contentClassName={"containerlogin bg-dark"}>
            <div>
                <CloseButton className={'ModelCloseButton'} variant={"white"} onClick={ props.hide}/>;
            </div>
            <Modal.Body className={'flex-center p-0 '}>
                <MDBCard id={"login_card"}
                         className='bg-dark text-white'>
                    <MDBCardBody className=' d-flex flex-column align-items-center '>
                        <h2 className="messss fw-bold mb-2 text-uppercase">
                            Login
                        </h2>
                        <p className="text-white-50 mb-5">
                            Please enter your Username and password!
                        </p>

                        <MDBInput className='change-input-sign' wrapperClass='mb-4 mx-5 w-100'
                                  labelClass='text-white'
                                  label='Username'
                                  id='formControlLg' type='text'
                                  size="lg"
                                  value={username}
                                  onChange={e => setUsername(e.target.value)}
                        />
                        <MDBInput className='change-input-sign' wrapperClass='mb-4 mx-5 w-100'
                                  labelClass='text-white'
                                  label='Password'
                                  id='formControlLg'
                                  type='password'
                                  size="lg"
                                  value={password}
                                  onChange={e => setPassword(e.target.value)}
                        />

                        <MDBBtn outline rounded className='mx-2'
                                color='secondary'
                                type="submit"
                                onClick={submit}
                        >
                            Login
                        </MDBBtn>

                        <Container>
                            <Row className="jesss mb-1">
                                Don't have an account?

                            </Row>
                            <Row>
                                <MDBBtn outline rounded  color='secondary'
                                        className='mx-2'
                                        onClick={props.signup}
                                >
                                    Sign up
                                </MDBBtn>
                            </Row>




                        </Container>
                    </MDBCardBody>

                </MDBCard>

            </Modal.Body>
        </Modal>


    )
        ;

}

export default Authentication;

