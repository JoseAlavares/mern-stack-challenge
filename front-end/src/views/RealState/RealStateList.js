import React, { Fragment, useEffect, useState } from 'react';
import {
    MDBDataTableV5,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBadge,
    MDBBtn,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBIcon
} from 'mdbreact';

//Components
import Navbar from "../../components/Navbar/Navbar";
import { ToastContainer, toast } from 'react-toastify';

//Modules
import axios from "axios";

const BACKEND_URL = `${process.env.REACT_APP_DOMAIN}${process.env.REACT_APP_PORT}`;

const RealStateList = (props) => {
    const [gridStructure, setGridStructure] = useState({});
    const [realStateProperties, setRealStateProperties] = useState({})
    const configNotify = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    const generateDropDown = (id) => {
        const pathEdit = `/real-state-edit/${id}`
        // const pathDelete = `/real-state-delete/${id}`

        return (
        <MDBDropdown>
            <MDBDropdownToggle nav caret>
                <MDBIcon icon="bars" />
            </MDBDropdownToggle>
            <MDBDropdownMenu className="dropdown-default">
                <MDBDropdownItem
                    href={pathEdit}>
                    Editar
                </MDBDropdownItem>
                <MDBDropdownItem
                    onClick={() => disableRecord(id)}>
                    Desactivar
                </MDBDropdownItem>
            </MDBDropdownMenu>
        </MDBDropdown>
        )
    };

    const generateStructure = () => {
        if (!realStateProperties || !Object.keys(realStateProperties).length) return

        let data = realStateProperties.map((item, index) => {
            return {
                "#": ++index,
                "id": item.id,
                "description": item.description,
                "field": item.field,
                "construction": item.construction,
                "address": item.address,
                "contact_phone": item.contact_phone,
                "contact_mail": item.contact_mail,
                "bathrooms": item.bathrooms,
                "bedrooms": item.bedrooms,
                "parking_lots": item.parking_lots,
                "active": <MDBBadge pill color="success">Activo</MDBBadge>,
                "actions": generateDropDown(item.id)
            };
        });

        let columns = [{
                "label": "#",
                "field": "#",
                "sort": "asc"
            },
            {
                'label': 'id',
                'field': 'id',
                'sort': 'asc'
            },
            {
                'label': 'Descripción',
                'field': 'description',
                'sort': 'asc'
            },
            {
                'label': 'Campo',
                'field': 'field',
                'sort': 'asc'
            },
            {
                'label': 'Construcción',
                'field': 'construction'
            },
            {
                'label': 'Dirección',
                'field': 'address'
            },
            {
                'label': 'Telefono',
                'field': 'contact_phone'
            },
            {
                'label': 'Correo',
                'field': 'contact_mail'
            },
            {
                'label': 'Baños',
                'field': 'bathrooms'
            },
            {
                'label': 'Habitaciones',
                'field': 'bedrooms'
            },
            {
                'label': 'Espacios de estacionamiento',
                'field': 'parking_lots'
            },
            {
                'label': 'Status',
                'field': 'active'
            },
            {
                'label': 'Acciones',
                'field': 'actions'
        }];

        // data = data.map((item, index) => {
        //     return {
        //         "#": ++index,
        //         "id": item.id,
        //         "description": item.description,
        //         "field": item.field,
        //         "construction": item.construction,
        //         "address": item.address,
        //         "contact_phone": item.contact_phone,
        //         "contact_mail": item.contact_mail,
        //         "bathrooms": item.bathrooms,
        //         "bedrooms": item.bedrooms,
        //         "parking_lots": item.parking_lots,
        //         "active": <MDBBadge pill color="success">Activo</MDBBadge>,
        //         "actions": generateDropDown(item.id)
        //     };
        // });

        setGridStructure({
            columns: columns,
            rows: data
        });
    };

    const getRecords = () => {
        const token = window.sessionStorage.getItem("jwt") || "";
        let headers = {"Content-Type": "application/json"};
    
        if(token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        axios({
            method: "GET",
            url: `${BACKEND_URL}/api/v1/real-state`,
            headers: headers
        })
        .then(async (result) => {
            //const isAuthenticated = (token) ? true : false;
            const { data } = result;
            setRealStateProperties(data);
            // const newData = generateStructure(data);
            // setGridStructure(newData);
        })
        .catch((err) => {
            console.error(err);
        });
    };

    const disableRecord = async (id) => {
        try {
            await axios({
                method: 'DELETE',
                url: `${BACKEND_URL}/api/v1/real-state/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.sessionStorage.getItem('jwt')}`
                }
            })
            toast.success(
                "La propiedad fue desactivada",
                configNotify
            );
            setRealStateProperties(realStateProperties.filter(property => property.id !== id))
            generateStructure()
        } catch (error) {
            console.error(error)
            toast.error(
                "No se pudo deshabilitar el registro",
                configNotify
            );
        }
    }

    useEffect(() => {
        getRecords()
    }, []);

    useEffect(() => {
        generateStructure()
    }, [realStateProperties])

    const location = props.location.pathname;
    return(
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

            <MDBContainer>
                <MDBRow style={{"paddingTop": "10px"}} >
                    <MDBBtn onClick={() => props.history.push('/real-state-add')}>Agregar propiedad</MDBBtn>
                    <MDBCol md="12">
                        <MDBCard narrow>
                            <MDBCardHeader 
                                className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-2 mx-4 mb-3">
                                <h3 style={{"color": "white"}}>Lista de propiedades</h3>
                            </MDBCardHeader>
                            <MDBCardBody cascade>
                                <MDBDataTableV5
                                    responsive
                                    hover 
                                    entriesOptions={[5, 20, 25]} 
                                    entries={5} 
                                    pagesAmount={4} 
                                    data={gridStructure}/>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </Fragment>
    );
};

export default RealStateList;