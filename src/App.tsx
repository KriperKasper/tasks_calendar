import React from 'react';

import CellContainer from "./components/CellContainer/CellContainer";
import {ThemeProvider} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss';
const App: React.FC = () => {
    return (
            <ThemeProvider>
                    <CellContainer/>
            </ThemeProvider>
    );
};

export default App;
