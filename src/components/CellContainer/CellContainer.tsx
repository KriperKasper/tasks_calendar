import React, {useEffect} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {DragDropContext} from "react-beautiful-dnd";
import Col from "react-bootstrap/Col";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import Cell from "../Cell/Cell";
import CellHeader from "../CellHeader/CellHeader";
import Loader from "../Loader/Loader";
import {ContainerDayNames} from "./CellContainer.styled";
import {changeTaskLocation} from "../../store/action-creators/calendar";

const daysNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const CellContainer: React.FC = () => {
    const {days, firstDay, month} = useTypedSelector(state => state.calendar)
    const {calendarSetup, changeTaskLocation} = useActions()
    useEffect(() => {
        calendarSetup()
    }, [])
    // @ts-ignore
    const onDragEnd = (result) => {
        const {destination, source, draggableId, type} = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }
        const home = source.droppableId;
        const foreign = destination.droppableId;
        if (home === foreign) {
            changeTaskLocation({day: home, start: source.index, end: destination.index, draggableId});
            return;
        }
        if (home !== foreign) {
            changeTaskLocation({day: home, sourceDest: foreign, start: source.index, end: destination.index, draggableId});
        }
    }
    let offset = firstDay;
    if (firstDay > 0) {
        offset += 2;
    } else if (firstDay < 0) {
        return (
            <Loader></Loader>
        )
    }
    return (
        <>
            <CellHeader month={month}/>
            <Container>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Row sm={{cols: 6}}>
                        {
                            daysNames.map((day, index) => {
                                return (
                                    <Col key={index} className="text-center">
                                        <ContainerDayNames><h6>{day}</h6></ContainerDayNames>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                    <Row sm={{cols: 6}} className={"g-2"}>
                        {days.map((el, index) => {
                            if (index === 0) {
                                return <Col sm={{offset: offset}} key={el.dayId}>
                                    <Cell {...el}></Cell>
                                </Col>
                            }
                            return <Col key={el.dayId}>
                                <Cell {...el} ></Cell>
                            </Col>
                        })}
                    </Row>
                </DragDropContext>
            </Container>
        </>
    );
};

export default CellContainer;
