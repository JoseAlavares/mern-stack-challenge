import React, { Fragment, useState, useEffect } from "react";
import { 
    MDBContainer,
    MDBCol,
    MDBRow, 
    MDBCard, 
    MDBCardImage, 
    MDBCardTitle, 
    MDBCardText,
    MDBCardBody,
    MDBIcon,
    MDBBtn,
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter            
} from "mdbreact";
import UserForm from "../../components/UserForm/UserForm";
import Navbar from "../../components/Navbar/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Modules
import axios from "axios";

import { confirmPassword } from "../../utils/utils";

const BACKEND_URL = `${process.env.REACT_APP_DOMAIN}${process.env.REACT_APP_PORT}`;

const EditUser = (props) => {
    const [inputValue, setInputValues] = useState({});
    const [loading, setLoading] = useState(false);
    const [disableBtn, setDisableBtn] = useState(false);
    const [btnTxt, setBtnTxt] = useState("Editar");
    const [showModal, setShowModal] = useState(false);
    const [btnTxt2, setBtnTxt2] = useState("Eliminar cuenta");
    const [loading2, setLoading2] = useState(false);
    const configNotify = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };
    
    const token = window.sessionStorage.getItem("jwt");
    const user = JSON.parse(window.sessionStorage.getItem("user"));
    const location = props.location.pathname;
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }

    const getDataUser = () => {
        axios({
            method: "GET",
            url: `${BACKEND_URL}/api/users/${user.id}`,
            headers: headers
        })
        .then(result => {
            setInputValues({
                name: result.data.data.name,
                email: result.data.data.email
            });
        })
        .catch(err =>{
            console.error(err);            
        });
    };

    useEffect(() => {
        getDataUser();
    }, []);
        
    const handleInput = (event) => {
        const value = event.target.value;
        setInputValues({
            ...inputValue,
            [event.target.name]: value
        });
    };

    const handleSubmit = () => {
        let errors = [];
        if(!inputValue.name) errors.push("El campo del nombre no puede estar vacio");
        if(!inputValue.email) errors.push("El campo de email no puede estar vacio");
        if(inputValue.password && !inputValue.confirm_password) errors.push("El campo de confirmación de contraseña no puede estar vacio");
        if(inputValue.confirm_password && !inputValue.password) errors.push("El campo contraseña no puede estar vacio");
        if(inputValue.password && inputValue.password.length <= 4) errors.push("La contraseña debe ser mayor a 4 caracteres");
        if(
            (inputValue.password && inputValue.confirm_password) &&
            !confirmPassword(inputValue.password, inputValue.confirm_password)
        ) {
            errors.push("Las contraseñas no coinciden");
        }

        if(errors.length) {
            for(let i=0; i<errors.length; i++) {
                toast.error(errors[i], configNotify);
            }

            return;
        }

        setBtnTxt("");
        setLoading(true);
        setDisableBtn(true);

        let formData = {
            id: user.id,
            name: inputValue.name,
            email: inputValue.email            
        };

        if(inputValue.password) {
            formData.password = inputValue.password;
        }

        axios({
            method: "PUT",
            url: `${BACKEND_URL}/api/users`,
            headers: headers,
            data: formData
        })
        .then(result => {
            toast.success("Los datos fueron modificados correctamente", configNotify);
            setTimeout(() => {
                props.history.push("/list-user");
            }, 2000);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
            setBtnTxt("Registrarse");
            setDisableBtn(false);
            toast.error(err.response.data.message, configNotify);
        });
    };

    const show = () => {
        setShowModal(!showModal);
    };

    const handleAccount = () => {
        setBtnTxt2("");
        setLoading2(true);

        axios({
            method: "DELETE",
            url: `${BACKEND_URL}/api/users`,
            headers: headers,
            data: {
                id: user.id
            }
        })
        .then(result => {
            toast.success(
                "La cuenta fue eliminada correctamente",
                configNotify
            );
            setTimeout(() => {
                window.sessionStorage.clear();
                props.history.push("/login");
            }, 3000);
        })
        .catch(err => {
            toast.error(
                "Ocurrio un error",
                configNotify
            );
            setBtnTxt("Eliminar cuenta");
            setLoading2(false);
        });
    };

    return (
        <Fragment>
            <Navbar
                location={location}/>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
            <MDBContainer style={{paddingTop: "5px"}} className="profile-card">
                <MDBRow>
                    <UserForm
                        columnSize={"8"}
                        formName={"Editar mis datos"}                
                        name={inputValue.name}
                        email={inputValue.email}
                        handleInput={handleInput}
                        handleSubmit={handleSubmit}
                        buttonTxt={btnTxt}
                        loading={loading}
                        disableBtn={disableBtn}/>
                    <MDBCol md="4" style={{paddingTop: "5px"}}>
                        <MDBCard className="profile-card">
                            <MDBCardImage 
                                className="img-fluid" 
                                src="https://icon-library.com/images/icon-programmer/icon-programmer-14.jpg" 
                                waves />
                            <MDBCardBody>
                                <MDBCardTitle>Perfil de usuario</MDBCardTitle>
                                <MDBCardText>
                                    <MDBIcon 
                                        icon="user" 
                                        size="3x" 
                                        className="amber-text pr-3"/>
                                        Nombre: {inputValue.name || "n/a"}
                                    <br/>
                                    <MDBIcon 
                                        icon="envelope" 
                                        size="3x" 
                                        className="amber-text pr-3"/>
                                        Correo: {inputValue.email || "n/a"}                                
                                </MDBCardText>
                            </MDBCardBody>
                            <MDBBtn 
                                    color="danger"
                                    onClick={() => { setShowModal(true); }}>
                                Eliminar cuenta
                            </MDBBtn>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                {showModal &&                    
                    <MDBModal isOpen={showModal} toggle={show}>
                        <MDBModalHeader toggle={show}>Mensajes del sistema</MDBModalHeader>
                        <MDBModalBody>
                            ¿Estas seguro de eliminar tu cuenta?
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={show}>Cerrar</MDBBtn>
                            <MDBBtn color="secondary" onClick={handleAccount}>
                                {btnTxt2}
                                {loading2 &&
                                    <div className="spinner-border text-warning" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                }
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                }
            </MDBContainer>
        </Fragment>
    );
};

export default EditUser;