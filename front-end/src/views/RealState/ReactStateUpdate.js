import React, { Fragment, useEffect, useState } from "react";
import {
    MDBContainer,
    MDBRow
} from "mdbreact";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RealStateForm from '../../components/RealStatefForm/RealStateForm';
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { validateEmail, validatePhoneNumber, validateOnlyNumbers } from '../../utils/utils'

const SERVER = process.env.REACT_APP_DOMAIN;
const PORT = process.env.REACT_APP_PORT;
const BACKEND_URL = `${SERVER}${PORT}`;

const RealStateUpdate = (props) => {
    console.log(props.match.params.id)
    const [inputValue, setInputValues] = useState({});
    const [loading, setLoading] = useState(false);
    const [disableBtn, setDisableBtn] = useState(false);
    const [btnTxt, setBtnTxt] = useState("Guardar");
    const configNotify = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    useEffect(() => {}, [inputValue])

    useEffect(() => {
        if (!props.match.params.id) {
            setDisableBtn(true)
            return
        }

        getRealStateData(props.match.params.id)
    }, [])

    const getRealStateData = async (id) => {
        try {
            const { data } = await axios({
                method: 'GET',
                url: `${BACKEND_URL}/api/v1/real-state/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.sessionStorage.getItem('jwt')}`
                }
            })

            setInputValues({
                description: data.description,
                field: data.field,
                construction: data.construction,
                address: data.address,
                contactPhone: data.contact_phone,
                contactMail: data.contact_mail,
                bathrooms: data.bathrooms,
                bedrooms: data.bedrooms,
                parkingLots: data.parking_lots
            })
        } catch (error) {
            console.error('Error in the function getRealStateData', error)
            return
        }
    }

    const handleInput = (event) => {
        console.log('si llego', event.target.name)
        const value = event.target.value;
        setInputValues({
            ...inputValue,
            [event.target.name]: value
        });
    };

    const handleSubmit = () => {
        let errors = [];
        if(!inputValue.description) errors.push("El campo del descripción no puede estar vacio");
        if(!inputValue.construction) errors.push("El campo construction no puede estar vacio");
        if(!validateOnlyNumbers(inputValue.construction)) errors.push("El campo construction debe ser numerico");
        if(!inputValue.field) errors.push("El campo field no puede estar vacio");
        if(!validateOnlyNumbers(inputValue.field)) errors.push("El campo field debe ser numerico");
        if(!inputValue.address) errors.push("El campo de address no puede estar vacio");
        if(!inputValue.contactPhone) errors.push("El campo contactPhone no puede estar vacio");
        if(!validatePhoneNumber(inputValue.contactPhone)) errors.push("El formato del telefono no es valido");
        if(!inputValue.contactMail) errors.push("El campo contactMail no puede estar vacio");
        if(!validateEmail(inputValue.contactMail)) errors.push("El formato del correo no es valido");
        if(!inputValue.bathrooms) errors.push("El campo bathrooms no puede estar vacio");
        if(!validateOnlyNumbers(inputValue.bathrooms)) errors.push("El campo bathrooms debe ser numerico");
        if(!inputValue.bedrooms) errors.push("El campo bedrooms no puede estar vacio");
        if(!validateOnlyNumbers(inputValue.bedrooms)) errors.push("El campo bedrooms debe ser numerico");
        if(!inputValue.parkingLots) errors.push("El campo parkingLots no puede estar vacio");
        if(!validateOnlyNumbers(inputValue.parkingLots)) errors.push("El campo parkingLots debe ser numerico");

        if(errors.length) {
            for(let i=0; i<errors.length; i++) {
                toast.error(errors[i], configNotify);
            }

            return;
        }

        setLoading(true);
        setDisableBtn(true);
        setBtnTxt("");

        axios({
            method: "PUT",
            url: `${BACKEND_URL}/api/v1/real-state/${props.match.params.id}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.sessionStorage.getItem('jwt')}`
            },
            data: { ...inputValue }
        })
        .then(result => {
            toast.success(
                "La propiedad fue creada correctamente",
                configNotify
            );
            setTimeout(() => {
                props.history.push("/real-state-list");
            }, 2000);
        })
        .catch(err => {
            setLoading(false);
            setBtnTxt("Registrarse");
            setDisableBtn(false);
            toast.error(err?.response?.data?.message, configNotify);
        });
    };

    const location = props.location.pathname;

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
                    <RealStateForm
                        description={inputValue.description}
                        field={inputValue.field}
                        construction={inputValue.construction}
                        address={inputValue.address}
                        contactPhone={inputValue.contactPhone}
                        contactMail={inputValue.contactMail}
                        bathrooms={inputValue.bathrooms}
                        bedrooms={inputValue.bedrooms}
                        parkingLots={inputValue.parkingLots}
                        columnSize={"8"}
                        formName={"Registrar propiedad"}
                        handleInput={handleInput}
                        handleSubmit={handleSubmit}
                        buttonTxt={btnTxt}
                        loading={loading}
                        disableBtn={disableBtn}/>
                </MDBRow>
            </MDBContainer>
        </Fragment>
    );
};

export default RealStateUpdate;