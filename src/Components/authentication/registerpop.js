import React, {useState} from 'react';

import {
    MDBBtn,MDBCard, MDBCardBody, MDBInput, MDBCheckbox
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';




import Modal from "react-bootstrap/Modal";

import {CloseButton} from "react-bootstrap";
import {registeration} from "../../Api/userApi";
import MessageBox from "../MessageBox/MessageBox";



export function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

export function isValidPassword(password) {
    const lowerCase = /[a-z]/g;
    const upperCase = /[A-Z]/g;
    const numbers = /[0-9]/g;
    if (!password.match(lowerCase)) {
        return "Password should contains lowercase letters!";
    } else if (!password.match(upperCase)) {
        return "Password should contain uppercase letters!";
    } else if (!password.match(numbers)) {
        return "Password should contains numbers also!";
    } else if (password.length < 8) {
        return "Password length should be more than 8.";
    } else {
        return null;
    }
}

function StandaredSignUpPopUp(props) {
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState(null);
    const handleEmailChange = event => {
        if (!isValidEmail(event.target.value)) {
            setError('Email is invalid');
        } else {
            setError(null);
        }
        setEmail(event.target.value);
    };
    const handlePasswordChange = event => {
        setError(isValidPassword(event.target.value))
        setPassword(event.target.value);

    };
    const handlePassword2Change = event => {
        if (password !== event.target.value){
            setError("password not match")
        }
        else {
            setError(null)
            setPassword2(event.target.value);
        }


    };

    const submit = async event => {
        event.preventDefault();
        setError(isValidPassword(password))
        if (error != null)
            return;
        try {
            await registeration(
            {
                "username": username,
                "password": password,
                "password2": password2,
                "email": email,
                "first_name": firstname,
                "last_name": lastname
            }
            ).then(
                res => {
                    if (res.status === 201) {
                        MessageBox({
                            type: "success",
                            text: "your signup is completed"
                        });
                        props.hide()

                    }
                }
            ).catch((error)=>{
                MessageBox({
                    type: "error",
                    text: error
                });
            });
        }catch (error){
            MessageBox({
                type: "error",
                text: error
            });
        }
    }


    const disableButton = () => {

        if (error ||
            username.trim() === "" ||
            password.trim() === "" ||
            password2.trim() ==="" ||
            email.trim() === ""    ||
            firstname.trim() ==="" ||
            lastname.trim() ===""
        )
            return true;
        else
            return false;
    }

    return (

        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show}
            onHide={props.hide}
            contentClassName={"containerlogin bg-dark"}
        >
            <div>
                <CloseButton className={'ModelCloseButton'} variant={"white"} onClick={ props.hide}/>;
            </div>

            <Modal.Body className={'flex-center p-0 '}>
                <MDBCard id={"login_card"} className='bg-dark text-white '>
                    <MDBCardBody className=' d-flex flex-column align-items-center  '>

                        <h2 className="messss fw-bold mb-2 text-uppercase">Register</h2>
                        <p className="text-white-50 mb-3">Please enter your information!</p>
                        <MDBInput className='change-input-sign' wrapperClass='mb-3 mx-5 w-100'
                                  labelClass='text-white'
                                  label='Username'
                                  id='form1' type='text' size="lg"
                                  onChange={e => setUsername(e.target.value)}
                        />
                        <MDBInput className='change-input-sign' wrapperClass='mb-3 mx-5 w-100'
                                  labelClass='text-white'
                                  label='Firstname'
                                  id='form1' type='text' size="lg"
                                  onChange={e => setFirstname(e.target.value)}
                        />
                        <MDBInput className='change-input-sign' wrapperClass='mb-3 mx-5 w-100'
                                  labelClass='text-white'
                                  label='Lastname'
                                  id='form1' type='text' size="lg"
                                  onChange={e => setLastname(e.target.value)}
                        />
                        <MDBInput className='change-input-sign' wrapperClass='mb-3 mx-5 w-100'
                                  labelClass='text-white'
                                  label='Email address'
                                  id='formControlLg' type='email' size="lg"
                                  onChange={handleEmailChange}

                        />
                        <MDBInput className='change-input-sign' wrapperClass='mb-3 mx-5 w-100'
                                  labelClass='text-white'
                                  label='Password'
                                  id='formControlLg'
                                  type='password'
                                  size="lg"
                                  onChange={handlePasswordChange}

                        />
                        <MDBInput className='change-input-sign' wrapperClass='mb-3 mx-5 w-100'
                                  labelClass='text-white'
                                  label='repeat your password'
                                  id='formControlLg'
                                  type='password'
                                  size="lg"
                                  onChange={handlePassword2Change}

                        />
                        {error &&

                            <p className="text-white-50 mb-3">{error} </p>
                        }

                        <MDBBtn outline className='dsalis mx-3 px-5' color='white' size='lg'
                                type="submit"
                                onClick={submit} disabled={disableButton()}>
                            Sign Up
                        </MDBBtn>


                        <div>
                            <p className=" mb-1">Do you have an account?
                            </p>

                            <MDBBtn outline color='white' className="text-white-50 fw-bold mb-1" onClick={props.login}>
                                login
                            </MDBBtn>

                        </div>
                    </MDBCardBody>

                </MDBCard>


            </Modal.Body>
        </Modal>
    );
}

export default StandaredSignUpPopUp;
