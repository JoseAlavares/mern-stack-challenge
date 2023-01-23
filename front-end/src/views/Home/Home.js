import React, { Fragment } from "react";
import {
    MDBRow,
    MDBCol,
    MDBContainer,
    MDBCardTitle,
    MDBIcon,
    MDBJumbotron,
    MDBBtn
} from "mdbreact";
import Navbar from "../../components/Navbar/Navbar";

const Home = (props) => {
    const location = props.location.pathname;

    return (
        <Fragment>
            <Navbar
                location={location}/>
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <MDBJumbotron>
                            <MDBCol className="text-white text-center py-5 px-4 my-5" style={{ backgroundImage: `url(https://mdbootstrap.com/img/Photos/Others/gradient1.jpg)`}}>
                                <MDBCol className="py-5">
                                    <MDBCardTitle className="h1-responsive pt-3 m-5 font-bold">
                                        Bienvenido a la aplicación
                                    </MDBCardTitle>
                                    <p className="mx-5 mb-5">
                                        Esta es una aplicación usando el Stack MERN
                                    </p>
                                    <ol>
                                        <li>Postgres</li>
                                        <li>ExpressJS</li>
                                        <li>ReactJS</li>
                                        <li>NodeJS</li>
                                    </ol>
                                    <p>Ademas se usan un contenedores docker para el back-end en NodeJS y el front-end el servidor docker esta instalado en una instancia EC2 de AWS</p>
                                    <MDBBtn
                                        outline
                                        color="white"
                                        className="mb-5"
                                        onClick={() => {props.history.push("/real-state-list")}}
                                        >
                                        <MDBIcon icon="clone" className="mr-2"></MDBIcon>
                                        Lista de propiedades "Real state list"
                                    </MDBBtn>
                                </MDBCol>
                            </MDBCol>
                        </MDBJumbotron>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </Fragment>
    );
};

export default Home;