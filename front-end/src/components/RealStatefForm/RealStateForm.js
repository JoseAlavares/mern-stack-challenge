import React from "react";
import { 
    MDBCol, 
    MDBInput, 
    MDBBtn, 
    MDBCard, 
    MDBCardBody 
} from 'mdbreact';

const RealStateForm = (props) => {
    // console.log(props)
    return (        
        <MDBCol md={props.columnSize}>
            <MDBCard>
                <MDBCardBody>
                    <form>
                        <p className="h4 text-center py-4">
                            {props.formName}
                        </p>
                        <div className="grey-text">
                            <MDBInput
                                name="description"
                                value={props.description}
                                onChange={props.handleInput}
                                label="Descripción"
                                // icon="user"
                                group
                                type="text"
                                validate
                                error="wrong"
                                success="right"/>
                            <MDBInput
                                name="field"
                                value={props.field}
                                onChange={props.handleInput}
                                label="Campo"
                                // icon="user"
                                group
                                type="text"
                                validate
                                error="wrong"
                                success="right"/>
                            <MDBInput
                                name="construction"
                                onChange={props.handleInput}
                                value={props.construction}
                                label="Construcción"
                                // icon="envelope"
                                group
                                type="text"
                                validate
                                error="wrong"
                                success="right"/>
                            <MDBInput
                                name="address"
                                onChange={props.handleInput}
                                value={props.address}
                                label="Dirección"
                                // icon="envelope"
                                group
                                type="text"
                                validate
                                error="wrong"
                                success="right"/>
                            <MDBInput
                                name="contactPhone"
                                onChange={props.handleInput}
                                value={props.contactPhone}
                                label="Contacto telefonico, ejemplo: +52 100 00 00"
                                // icon="lock"
                                group
                                type="text"
                                validate/>
                            <MDBInput
                                name="contactMail"
                                onChange={props.handleInput}
                                value={props.contactMail}
                                label="Contacto email"
                                // icon="lock"
                                group
                                type="text"
                                validate/>
                            <MDBInput
                                name="bathrooms"
                                onChange={props.handleInput}
                                value={props.bathrooms}
                                label="Numero de baños"
                                // icon="lock"
                                group
                                type="text"
                                validate/>
                            <MDBInput
                                name="bedrooms"
                                onChange={props.handleInput}
                                value={props.bedrooms}
                                label="Numero de habitaciones"
                                // icon="lock"
                                group
                                type="text"
                                validate/>
                            <MDBInput
                                name="parkingLots"
                                onChange={props.handleInput}
                                value={props.parkingLots}
                                label="Numero de lotes de estacionamiento"
                                // icon="lock"
                                group
                                type="text"
                                validate/>
                        </div>
                        <div className="text-center py-4 mt-3">
                            <MDBBtn 
                                color="success" 
                                type="button"
                                onClick={props.handleSubmit}
                                disabled={props.disableBtn}>
                                {props.buttonTxt }
                                {props.loading &&
                                    <div className="spinner-border text-danger" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                }
                            </MDBBtn>
                        </div>
                    </form>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>            
    );
};

export default RealStateForm;