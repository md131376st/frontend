import Container from "react-bootstrap/Container";
import {Col} from "react-bootstrap";

const ErrorPage =() => {
return<>
    <Container>
        <Col/>
        <Col>
            <img src={require("../../assets/image/1.webp")} alt={"error"}/>
            <p> Something went wrong please try latter </p>
        </Col>
        <Col/>
    </Container>

</>
}
export default  ErrorPage