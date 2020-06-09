import React, { Fragment } from 'react';
import { Accordion, Card, CardTitle, Button, Col } from "react-bootstrap";

import Datepicker from './Datepicker';

import SidePanel from './SidePanel';



class SideBar extends React.Component {
    render() {
        return (

           <Fragment > 
            
            
               
               
            <Card body style={{ marginRight: "-15px", border: "white", color: "#065f65", marginLeft: "0px"}}  >
              <header style={{ textAlign: "left", fontFamily: 'museo-sans, sans-serif', fontSize: "20px", backgroundColor: "white" }}><strong>Filter</strong></header>
             



                <Accordion >
                <Card style={{border: "white", textAlign: "left"}} >
                    <Card.Header style={{backgroundColor: "white"}}>
                    
                        <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{color: "#065f65", width: "200px", marginLeft: "-25px"}}>
                        <p style={{float: "left", paddingTop: "6%", color: "#065f65", fontWeight: "100"}}>Site</p> <div style={{float: "right"}}> 
                        <img src="img/icons/quickview.svg" alt="location" height="40px" /></div>
                        </Accordion.Toggle>
                    </Card.Header>
                   
                    <Accordion.Collapse eventKey="0" style={{}} >
                        <Card.Body> <p style={{  color: 'lightblue', margin: "0 !important"}} ><i class="fa fa-circle fa-lg" aria-hidden="true"></i> Item 1</p></Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey="0" style={{ marginTop: "-25px"}} >
                        <Card.Body> <p style={{ color: "Tomato" }}><i class="fa fa-circle fa-lg" aria-hidden="true"></i> Item 2</p></Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey="0"  style={{ marginTop: "-25px"}} >
                        <Card.Body> <p style={{ color: '#95dbc7' }}><i class="fa fa-circle fa-lg" aria-hidden="true"></i> Item 3</p></Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey="0"  style={{ marginTop: "-25px"}} >
                        <Card.Body><p><i class="fa fa-circle fa-lg" aria-hidden="true"></i> Item 4</p></Card.Body>
                    </Accordion.Collapse>
                </Card>
                <hr style={{ border: '0.5px solid #66b3a6', marginTop: "0%" }}></hr>

               

            </Accordion>
            <Accordion>
                <Card style={{border: "white", textAlign: "left"}} >
                    <Card.Header style={{backgroundColor: "white"}}>
                    
                    <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{color: "#065f65", width: "200px", marginLeft: "-25px"}}>
                        <p style={{float: "left", paddingTop: "6%", fontWeight: "100"}}>Image Type</p> <div style={{float: 'right'}}> 
                        <img src="img/icons/quickview.svg" alt="location" height="40px" /></div>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0" style={{ }}>
                        <Card.Body> <p style={{ color: 'lightblue' }}><i class="fa fa-circle fa-lg" aria-hidden="true"></i> Leaf Area Index</p></Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey="0" style={{ marginTop: "-25px"}}>
                        <Card.Body> <p style={{ color: "Tomato" }}><i class="fa fa-circle fa-lg" aria-hidden="true"></i> Phenocam</p></Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey="0" style={{ marginTop: "-25px"}}>
                        <Card.Body> <p style={{ color: ' #95dbc7' }}><i class="fa fa-circle fa-lg" aria-hidden="true"></i> Photopoint</p></Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey="0" style={{ marginTop: "-25px"}}>
                        <Card.Body><p><i class="fa fa-circle fa-lg" aria-hidden="true"></i> Panorama</p></Card.Body>
                    </Accordion.Collapse>

                </Card>

                <hr style={{ border: '0.5px solid #66b3a6', marginTop: "0%" }}></hr>

            </Accordion>

            <Accordion>
                <Card style={{border: "white", textAlign: "left"}} >
                    <Card.Header style={{backgroundColor: "white"}}>
                    
                    <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{color: "#065f65", width: "200px", marginLeft: "-25px"}}>
                        <p style={{float: "left", paddingTop: "6%", fontWeight: "100"}}>Ancillary Images</p> <div style={{float: 'right'}}> 
                        <img src="img/icons/quickview.svg" alt="location" height="40px" /></div>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0" style={{ }}>
                        <Card.Body> <p style={{ color: 'lightblue' }}><i class="fa fa-circle fa-lg" aria-hidden="true"></i> Fungi</p></Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey="0" style={{ marginTop: "-25px"}}>
                        <Card.Body> <p style={{ color: "Tomato" }}><i class="fa fa-circle fa-lg" aria-hidden="true"></i> Flora</p></Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey="0" style={{ marginTop: "-25px"}}>
                        <Card.Body> <p style={{ color: ' #95dbc7' }}><i class="fa fa-circle fa-lg" aria-hidden="true"></i> Fauna</p></Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey="0" style={{ marginTop: "-25px"}}>
                        <Card.Body><p><i class="fa fa-circle fa-lg" aria-hidden="true"></i> General</p></Card.Body>
                    </Accordion.Collapse>

                </Card>

                <hr style={{ border: '0.5px solid #66b3a6', marginTop: "0%" }}></hr>

            </Accordion>
           

            <Datepicker />

            <Accordion>
                <Card style={{border: "white", textAlign: "left"}}>
                    <Card.Header style={{backgroundColor: "white"}}>
                    
                    <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{color: "#065f65", width: "200px", marginLeft: "-25px"}}>
                        <p style={{float: "left", paddingTop: "6%", fontWeight: "100"}}>Frequency</p> <div style={{float: 'right'}}> 
                        <img src="img/icons/quickview.svg" alt="location" height="40px" /></div>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body> <p style={{ color: 'lightblue' }}><i class="fa fa-circle fa-lg" aria-hidden="true"></i> Daily</p></Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey="0" style={{ marginTop: "-25px"}}>
                        <Card.Body> <p style={{ color: "Tomato" }}><i class="fa fa-circle fa-lg" aria-hidden="true"></i> Weekly</p></Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey="0" style={{ marginTop: "-25px"}}>
                        <Card.Body> <p style={{ color: ' #95dbc7' }}><i class="fa fa-circle fa-lg" aria-hidden="true"></i> Monthly</p></Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey="0" style={{ marginTop: "-25px"}}>
                        <Card.Body><p><i class="fa fa-circle fa-lg" aria-hidden="true"></i> Yearly</p></Card.Body>
                    </Accordion.Collapse>

              


                   

                </Card>

                <hr style={{ border: '0.5px solid #66b3a6', marginTop: "0%" }}></hr>

            </Accordion>

      

          </Card>
        
       

            </Fragment>


        );
    }
}

export default SideBar;
