import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Card,
    Container,
    Row,
    Col,
    Table
} from "react-bootstrap";

function Dashboard() {

    const messageURL = "https://iotstartup.azurewebsites.net/api/Message";

   // const messageURL = "https://localhost:5002/api/Message";
    const postURL = "https://iotstartup.azurewebsites.net/api/Message/PostToMqTT";

    const [sale, setSale] = useState([])

    // const [formData, setformData] = useState({
    //     topic,
    //     value,
    //     receivedTime
    // })

    // const handleChange = (e) => {
    //     setformData(topic = e.topic, value = e.value, receivedTime = e.receivedTime)
    // };

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
        getSale();

        const interval = setInterval(() => {
            getSale();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>

            <Container fluid>
                <Row>
                    <Col lg="3" sm="6">
                        <Card className="card-stats">
                            <Card.Body>
                                <Row>
                                    <Col xs="5">
                                        <div className="icon-big text-center icon-warning">
                                            <i className="fas fa-tractor"></i>
                                        </div>
                                    </Col>
                                    <Col xs="7">
                                        <div className="numbers">
                                            <p className="card-category">Hata Kodları</p>
                                            <Card.Title as="h2">{sale.length}</Card.Title>
                                        </div>
                                    </Col>
                                </Row>
                                <hr></hr>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="3" sm="6">
                        <Card className="card-stats">
                            <Card.Body>
                                <Row>
                                    <Col xs="5">
                                        <div className="icon-big text-center icon-warning">
                                            <i className="fas fa-tractor"></i>
                                        </div>
                                    </Col>
                                    <Col xs="7">
                                        <div className="numbers">
                                            <p className="card-category">Hata Kodları</p>
                                            <Card.Title as="h2">{sale.length}</Card.Title>
                                        </div>
                                    </Col>
                                </Row>
                                <hr></hr>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="3" sm="6">
                        <Card className="card-stats">
                            <Card.Body>
                                <Row>
                                    <Col xs="5">
                                        <div className="icon-big text-center icon-warning">
                                            <i className="fas fa-tractor"></i>
                                        </div>
                                    </Col>
                                    <Col xs="7">
                                        <div className="numbers">
                                            <p className="card-category">Hata Kodları</p>
                                            <Card.Title as="h2">{sale.length}</Card.Title>
                                        </div>
                                    </Col>
                                </Row>
                                <hr></hr>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="3" sm="6">
                        <Card className="card-stats">
                            <Card.Body>
                                <Row>
                                    <Col xs="5">
                                        <div className="icon-big text-center icon-warning">
                                            <i className="fas fa-tractor"></i>
                                        </div>
                                    </Col>
                                    <Col xs="7">
                                        <div className="numbers">
                                            <p className="card-category">Hata Kodları</p>
                                            <Card.Title as="h2">{sale.length}</Card.Title>
                                        </div>
                                    </Col>
                                </Row>
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
                                        <th className="border-0">Mesaj Id</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sale
                                        .map((item) =>
                                            <tr key={item.id}>
                                                <td onClick={() => post(item)}>{item.topic}</td>
                                                <td>{item.value}</td>
                                                <td>{item.receivedTime}</td>
                                                <td>{item.id}</td>
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
