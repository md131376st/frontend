import * as React from 'react'
import {useParams} from "react-router-dom";
import { useEffect, useState} from "react";
import { getOneBook} from "../../Api/bookApi";
import MessageBox from "../MessageBox/MessageBox";
import Card from 'react-bootstrap/Card';
import {Col, ListGroup, Row} from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import {Chip, Divider, Rating, Stack} from "@mui/material";
import "./bookCard.css"

const BookCard = (props)=>{
    const [loading, setLoading] = useState(false);
    const [book, setBook] = useState();
    let { id } = useParams();

    const getBook = async () => {
        try{
            const data = await getOneBook(id);
            console.log(data)
            setBook(data);
            setLoading(false);
        }catch (e) {
            MessageBox({
                type: "error",
                text: e
            });
            setLoading(false);
        }

    }
    useEffect(() => {
        getBook().catch(() => {
            MessageBox({
                type: "error",
                text: "server not available"
            });

        });
        setLoading(true);
    },[] )
    return(
        <>
            { book &&
            <Container>
                <Row />
                <Row>
                    <Col/>
                    <Col  xs={7}>
                        <Card >
                            {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
                            <Card.Body>
                                <Card.Title>{book.title}</Card.Title>
                                <Card.Text> book details</Card.Text>

                                <Container>
                                    <Row>
                                    <Col>
                                        <Stack gap={1}>
                                            <div className="p-1">year of publication</div>
                                            <Chip className="p-1"label={book.year}/>
                                        </Stack>
                                        <Stack gap={1}>
                                            <div className="p-1">price</div>
                                            <Chip className="p-1"label={"€ " +book.price}/>
                                        </Stack>

                                    </Col>
                                    <Col>
                                    <ListGroup>
                                        <ListGroup.Item as="li" active>
                                          Authors
                                        </ListGroup.Item>
                                    {
                                        book.authors.map((auther)=>(
                                            <ListGroup.Item>
                                                {auther.name}
                                            </ListGroup.Item>
                                        ))
                                    }
                                    </ListGroup>
                                    </Col>
                                    </Row>
                                    <Row>
                                        <Divider/>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div>Book rate: </div>
                                            <Rating name="read-only" value={3} readOnly />
                                        </Col>
                                        <Col  xs={7} />

                                    </Row>
                                </Container>


                            </Card.Body>
                        </Card>
                    </Col>
                    <Col/>
                </Row>
                <Row/>
            </Container>
            }
        </>
    )
}
export default BookCard;