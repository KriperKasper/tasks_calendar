import React, {useState} from "react";
import {CellContainer} from "./CellHeader.styled";
import Col from "react-bootstrap/Col";
import {Badge, Dropdown, DropdownButton, Form} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {useActions} from "../../hooks/useActions";

interface CellHeader {
    month: string;
}

const CellHeader: React.FC<CellHeader> = ({month}) => {
    const {filterTask} = useActions()
    const [formInfo, setFormInfo] = useState({text:''});
    const handleChange = (e: { target: { value: string; }; }) => {
        setFormInfo({ text: e.target.value});
        filterTask("byText", e.target.value);
    };
    return (
            <CellContainer>
                <Row className="justify-content-around">
                    <Col sm="2" className="text-center">
                        <DropdownButton id="dropdown-basic-button" title="Filter">
                            <Dropdown.Item onClick={() => filterTask("byName","danger")} className={"bg-danger text-light"}>Red</Dropdown.Item>
                            <Dropdown.Item onClick={() => filterTask("byName","success")} className={"bg-success text-light"}>Green</Dropdown.Item>
                            <Dropdown.Item onClick={() => filterTask("byName","primary")} className={"bg-primary text-light"}>Blue</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                    <Col sm="2" className="text-center">
                        <h5>
                            <Badge pill bg="dark" >
                                {month}
                            </Badge>
                        </h5>
                    </Col>
                    <Col sm="2">

                        <Form.Control placeholder={"search"} as="textarea" rows={1} onChange={handleChange}/>
                    </Col>
                </Row>
            </CellContainer>
    );
};

export default CellHeader;
