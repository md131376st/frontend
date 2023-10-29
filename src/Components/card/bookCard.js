import * as React from 'react'
import {useParams} from "react-router-dom";
import { useEffect, useState} from "react";
import {createReview, getBookDetail, getOneBook, reviewBook} from "../../Api/bookApi";
import MessageBox from "../MessageBox/MessageBox";
import Card from 'react-bootstrap/Card';
import {Col,Button, ListGroup, Row, Accordion, Form} from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import { Chip, Divider, Rating, Stack} from "@mui/material";

import "./bookCard.css"

const BookCard = (props)=>{
    const [loading, setLoading] = useState(false);
    const [book, setBook] = useState();
    let { id } = useParams();
    const [detail, setDetail] = useState("");
    const [comment, setComment] = useState("");
    const [rate, setRate] = useState(0);
    const [reviews, setReviews] = useState([]);

    const getBook = async () => {
        try{
            const data = await getOneBook(id);
            setBook(data);
            const detail_ =  await getBookDetail(id);
            setDetail(detail_.summary)
            const review = await reviewBook(id);
            setReviews(review);


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

    const submitReview= async  () =>{
       try {
           if (rate === 0 || comment.trim() === '') {
               MessageBox({
                   type: "error",
                   text: "Both Book rate and your comment are required."
               });
               return
           }
          else {


               await createReview(id, {
                   "review": comment,
                   "rate": rate,
                   "book": id,
                   "user": props.user.user_id
               }).then(
                   res => {
                       if (res.status === 201) {
                           MessageBox({
                               type: "success",
                               text: "Review successfully updated"
                           });
                       }
                   }
               ).catch((error) => {
                   console.log("hi")
                   if (error.response && error.response.status === 404) {
                       MessageBox({
                           type: "error",
                           text: "book doesn't exist or invalid user "
                       });
                   } else {
                       MessageBox({
                           type: "error",
                           text: "bed request"
                       });
                   }
                   ;
               });
           }



       }catch (e) {
           MessageBox({
               type: "error",
               text: e
           });
           setLoading(false);
       }
    }

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

                                        <Accordion  >
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header> Book summary </Accordion.Header>
                                                <Accordion.Body>
                                                    {detail}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>

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
                                    {
                                      props.user ?
                                        <>
                                        <Form >
                                            <Row>
                                                <Col>
                                                    <div>Book rate: </div>
                                                    <Rating name="read-only" value={rate}
                                                            onChange={e => setRate(e.target.value)} />
                                                </Col>
                                                <Col  xs={7} />

                                            </Row>
                                            <Row>
                                                <Form.Group className="d-flex flex-row bd-highlight 3md"
                                                            controlId="exampleForm.ControlInput1">
                                                    <Form.Control className={"commentinput"}
                                                                   value={comment}
                                                                   onChange={e=>setComment(e.target.value)}
                                                                   type="text" placeholder="Enter your comment.." />
                                                </Form.Group>
                                            </Row>
                                        <Row>
                                            <Button  onClick={submitReview} >
                                                Post
                                            </Button>
                                        </Row>
                                        </Form>
                                            <Row>
                                                <Divider/>
                                            </Row>
                                            {
                                                Array.isArray(reviews) &&  reviews.map((rev) => (
                                                    <Row>
                                                    <Card key={rev.id}>
                                                        <Card.Body>
                                                            <Rating name="read-only" value={rev.rate} />
                                                            <Card.Text>{rev.review}</Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    </Row>
                                                ))
                                            }

                                        </>
                                          :
                                         (
                                        <p>Please log in to post a review and see existing reviews.</p>
                                        )
                                    }


                                </Container>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col/>
                </Row>
                <Row/>
            </Container>
            }
            {
                !book &&
                <Container>
                    <Row />

                <img width="128" height="128" src="https://img.icons8.com/external-elyra-zulfa-mahendra/64/external-error-cyber-crimes-elyra-zulfa-mahendra.png" alt="external-error-cyber-crimes-elyra-zulfa-mahendra"/>

                        <Row>
                            <Col/>

                            <Col>
                                Book not found please try later
                            </Col>
                            <Col/>

                        </Row>
                    <Row />
                </Container>

            }
        </>
    )
}
export default BookCard;