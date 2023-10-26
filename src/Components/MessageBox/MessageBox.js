import {toast, ToastContainer} from 'react-toastify';
import * as React from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
const  MessageBox = (props) => {

    if (props.type==="error"){
        toast.error(props.text, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        })
    }
    else if(props.type==="success" ){
        toast.success(props.text, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        })
    }
    return (
        <div>
            <ToastContainer />
        </div>
    );
};





export default MessageBox;