import React from 'react';
import html2canvas from 'html2canvas';
import CellContainer from "./components/CellContainer/CellContainer";
import {ThemeProvider} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
const App: React.FC = () => {
    const printRef =  React.useRef<HTMLInputElement>(null);
    const handleDownloadImage = async () => {
        const element = printRef.current!;
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL('image/jpg');
        const link = document.createElement('a');
        link.href = data;
        link.download = 'image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
            <ThemeProvider >
                <div ref={printRef}>
                    <CellContainer  />
                </div>
                <Container>
                    <Row>
                        <Col sm="12">
                            <Button variant="primary" onClick={handleDownloadImage}>Download as Image</Button>
                        </Col>
                    </Row>
                </Container>
            </ThemeProvider>
    );
};

export default App;
