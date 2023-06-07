import React, {memo} from 'react';
import {CalendarDay} from "../../types/calendar";
import {CellContainer} from "./cell.styled";
import {Droppable, Draggable} from "react-beautiful-dnd";
import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {useActions} from "../../hooks/useActions";
import {ListGroup} from "react-bootstrap";
import {v4 as uuid} from "uuid";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TaskItem from "../Task/Task";

const Cell: React.FC<CalendarDay> = ({day, dayId, tasks, holiday}) => {
    const [show, setShow] = useState(false);
    const [formInfo, setFormInfo] = useState({taskId: '', text: '', priority: '', visible: true});
    const {addTask} = useActions()
    const handleClose = () => setShow(false);
    const saveChanges = () => {
        if (formInfo.taskId !== '') {
            addTask({dayId, task: formInfo})
        }
        handleClose()
    };
    const handleChange = (e: { target: { value: string; }; }) => {
        setFormInfo({...formInfo, taskId: uuid(), text: e.target.value});
    };
    const handleChangeRadio = (e: { target: { id: string; }; }) => {
        setFormInfo({...formInfo, priority: e.target.id});
    };
    const handleShow = () => setShow(true);
    return (
        <CellContainer>
            <h6>{day}</h6>

            <Droppable droppableId={dayId} type="task">
                {(provided, snapshot) =>
                    <ListGroup
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {tasks.map((task, index) =>
                            <Draggable draggableId={task.taskId} index={index} key={task.taskId}>
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                    >
                                        <TaskItem {...task}  />
                                    </div>
                                )
                                }
                            </Draggable>
                        )}

                        {provided.placeholder}
                    </ListGroup>
                }
            </Droppable>
            <Row className={"g-1"}>
                <Col>
                    <h6 className={"p-1 m-0"}>{holiday}</h6>
                </Col>
                <Col className={"d-flex align-items-end justify-content-end"}>
                    <Button variant="primary" onClick={handleShow} size="sm" className={"opacity-0"}>
                        +
                    </Button>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Add task</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={handleChange}/>
                            <Form.Check // prettier-ignore
                                type={'radio'}
                                inline
                                name="group1"
                                isInvalid
                                onChange={handleChangeRadio}
                                id={`danger`}
                                label={`red`}
                            />
                            <Form.Check // prettier-ignore
                                type={'radio'}
                                inline
                                name="group1"
                                onChange={handleChangeRadio}
                                isValid
                                id={`success`}
                                label={`green`}
                            />
                            <Form.Check // prettier-ignore
                                type={'radio'}
                                id={`primary`}
                                inline
                                onChange={handleChangeRadio}
                                name="blue"
                                label={`blue`}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </CellContainer>
    );
};

export default memo(Cell);
