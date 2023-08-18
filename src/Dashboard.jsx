import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Card,
    Container,
    Row,
    Col,
    Table
} from "react-bootstrap";

import { Client } from 'paho-mqtt';

function Dashboard() {

    const messageURL = "https://iotstartup.azurewebsites.net/api/Message";

    const postURL = "https://iotstartup.azurewebsites.net/api/Message/PostToMqTT";

    const [sale, setSale] = useState([])


    const getSale = async () => {
        const response = await axios({
            method: 'GET',
            url: messageURL
        })
        setSale(response.data);
    };

    const post = async (e) => {
        await axios({
            method: 'POST',
            url: postURL,
            data: { topic: e.topic, value: "y-0", receivedTime: e.receivedTime }
        })
    };

    useEffect(() => {
        const interval = setInterval(() => {
            getSale();
            setData("");
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const client = new Client("52deddadf1f6492b9f850cca56d211f5.s2.eu.hivemq.cloud", Number(8884), "clientId");

    const onConnect = () => {
        console.log("onConnect");
        client.subscribe("uubasimevi/#");
    };

    const onConnectionLost = (responseObject) => {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
        }
    };

    const onMessageArrived = (message) => {
        console.log("topic: " + message.destinationName)
        setData(message.payloadString)
        console.log("message: " + message.payloadString)

        const data = { topic: message.destinationName, message: message.payloadString, date: "agust" }
        const dataToJson = JSON.stringify(data);
        localStorage.setItem('data', dataToJson)
    };


    const [data, setData] = useState();

    client.connect({ onSuccess: onConnect, userName: "admin", password: "B4rb4r0s", useSSL: true });
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    let date = new Date().toLocaleString('tr-TR');

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col lg="5" sm="6">
                        <Card className="card-stats">
                            <Card.Body>
                                <Row>
                                    <Col xs="1">
                                        <div className="icon-big text-center icon-warning">
                                            <i className="fas fa-bullhorn"></i>
                                        </div>
                                    </Col>
                                    <Col xs="7">
                                        <div className="numbers">
                                            <p className="card-category">Anlık Bildirim</p>
                                            <Card.Title as="h2">{data}</Card.Title>
                                        </div>
                                    </Col>
                                </Row>
                                <hr></hr>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="5" sm="6">
                        <Card className="card-stats">
                            <Card.Body>
                                <Row>
                                    <Col xs="1">
                                        <div className="icon-big text-center icon-warning">
                                            <i className="far fa-comment-alt"></i>
                                        </div>
                                    </Col>
                                    <Col xs="7">
                                        <div className="numbers">
                                            <p className="card-category">Bildirimler</p>
                                            <Card.Title as="h2">{sale.length}</Card.Title>
                                        </div>
                                    </Col>
                                </Row>
                                <hr></hr>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="2" >
                        <Card className="card-stats">
                            <Card.Body>
                                <hr></hr>
                                <Card.Title as="h3">{date}</Card.Title>
                                <hr></hr>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card.Body className="table-full-width table-responsive px-0">
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th className="border-1">Konum</th>
                                        <th className="border-0">Uyarı Mesajı</th>
                                        <th className="border-0">Mesaj Zamanı</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sale
                                        .map((item) =>
                                            <tr key={item.id}>
                                                <td onClick={() => post(item)}>{item.topic}</td>
                                                <td>{item.value}</td>
                                                <td>{item.receivedTime}</td>
                                            </tr>
                                        )}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Dashboard
