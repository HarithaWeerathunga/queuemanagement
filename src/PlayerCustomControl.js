import React, { Component , useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col , Button, CardBody} from 'reactstrap';
import {Navbar , Nav, Form, NavDropdown, FormControl,Card , Badge} from 'react-bootstrap';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as DiIcons from 'react-icons/di';
import * as IoIcons from 'react-icons/io';
import {IconContext} from 'react-icons';



export default class PlayerCustom extends Component {

    constructor(props) {

       

        super(props);
        
        this.state = {
            videoId: this.props.match.params.id,
            qdata:'',
            interval: Date.now(),
            pause: false,
            pausedAt:0,
            avgWaiting: 0,
            count:1,
            videoData: []
        };
        this.handlePause = this.handlePause.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
    }

    


//to get data every second from specific video id and specific video time
// async componentDidMount() {
//     try {
//       setInterval(async () => {
//         const res = await fetch('http://localhost:4000/getvideotime/'+ this.state.count);
//         const data = await res.json();
        
//         this.setState({
//           videoData:[...data], count: this.state.count + 1
//         })
//         console.log("successsssss");
//       }, 1000);
//     } catch(e) {
//       console.log(e);
//     }
// }

async componentDidMount() {
    try {
        setInterval(async () => {
          const res = await fetch('http://localhost:4000/getvideoidandtime/'+ this.state.videoId + "/" + this.state.count );
          const data = await res.json();
          
          this.setState({
            videoData:[...data], count: this.state.count + 1
          })
          console.log("successsssss");
        }, 1000);
      } catch(e) {
        console.log(e);
      }
    
}
shouldComponentUpdate(nextProps, nextState) {
    if ( this.state.pause ) {
      return false;
    }
    return true;
  }


handlePause(){  
    this.refs.videoRef.pause();
    // Changing state
    this.setState({pause : true, pausedAt: this.state.count})
  }

handlePlay() {
    this.refs.videoRef.play();
    this.setState({pause : false, count: this.state.pausedAt})
}



    render() {
        return (
            <div className="App App-header">
            <Navbar bg="primary" variant="dark" expand="lg">
                <DiIcons.DiGoogleAnalytics color="white"/>
                <span width="10px"></span>
                <Navbar.Brand href="/"> Queue Analytics</Navbar.Brand>
                <DiIcons.DiGoogleAnalytics color="white"/>
                <Button onClick={this.handlePause} variant="danger"> Video ID : <Badge variant="light"> {this.state.videoId} </Badge>
                
                <span className="sr-only">unread messages</span>
                </Button>
            </Navbar>
        


            <Container style={{maxWidth:'100%', backgroundColor:'transparent'}}>
                    <Row>   
                        <Col lg={8}>
                                <video ref="videoRef" controls muted autoPlay>
                                <source src={`http://localhost:4000/video/${this.state.videoId}`} type="video/mp4"></source>
                                </video>
                        
                        </Col>
                        <Col>
                            <Container>
                            
                            <Row>
                                <IconContext.Provider
                                    value={{ color: 'orange', size: '20px' }}>
                                    <Button active size="lg" onClick={this.handlePause} variant="danger"> <FaIcons.FaPause/> Pause</Button> 
                                    <Button active size="lg" onClick={this.handlePlay} variant="danger"><AiIcons.AiFillPlayCircle/>  Play</Button> 
                                    </IconContext.Provider>
                                </Row>
           
                                
                                <Row>
                                    <Card>
                                        <CardBody><h1>Queue Length </h1> {this.state.videoData.map(video => <h4>{video.qlength}</h4>)} </CardBody>
                                    </Card>
                                </Row>
                                <Row>
                                    <Card>
                                        <CardBody><h1>Cashier Present</h1> {this.state.videoData.map(video => <h4>{video.cashier}</h4>)}</CardBody>
                                    </Card>
                                </Row>
                                <Row>
                                    <Card>
                                        <CardBody><h1>Average Waiting Time</h1> {this.state.videoData.map(video => <h4>{video.averageWaitingTime}</h4>)}</CardBody>
                                    </Card>
                                </Row>
                                
                                <Row>
                                    <Card>
                                        <CardBody><h1>Playback Time</h1> {this.state.count}</CardBody>
                                    </Card>
                                </Row>
               
                            </Container>
                        </Col>
                    </Row>
                </Container>
               

            </div>    
        )
    }
}