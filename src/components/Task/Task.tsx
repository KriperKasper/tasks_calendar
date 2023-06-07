import React, {memo} from 'react';
import {Task} from "../../types/calendar";
import {ListGroup} from "react-bootstrap";


const TaskItem: React.FC<Task> = ({text,priority,visible, taskId}) => {
    if (!visible) {
        return null;
    }
    return (
            <ListGroup.Item key={taskId} variant={priority}>{text}</ListGroup.Item>
    );
};

export default memo(TaskItem);
