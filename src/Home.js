import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Navbar , Nav, Form, NavDropdown, FormControl, Button} from 'react-bootstrap';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as DiIcons from 'react-icons/di';
import * as IoIcons from 'react-icons/io';


export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            videos: []
        };
    }
    async componentDidMount() {
        try {
            const response = await fetch('http://localhost:4000/videos');
            const data = await response.json();
            this.setState({ videos: [...data] });
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        return (
            <div className="App App-header">


                <Navbar bg="primary" variant="dark" expand="xl">
                    <DiIcons.DiGoogleAnalytics color="white"/>
                    <span width="10px"></span>
                    <Navbar.Brand href="/"> Queue Analytics</Navbar.Brand>
                    <DiIcons.DiGoogleAnalytics color="white"/>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        
                        <NavDropdown title="Select Videos" id="basic-nav-dropdown">

                        {this.state.videos.map(video =>
                            <div className="col-md-8" key={video.id}>
                            <NavDropdown.Item href={`/player/${video.id}`}><AiIcons.AiFillVideoCamera/> {video.name} </NavDropdown.Item>
                            <NavDropdown.Divider />
                            </div>
                         )}
                            
                        </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}