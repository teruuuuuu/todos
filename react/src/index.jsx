// import * as React from 'react';
import React, { useState } from 'react';
import * as ReactDOMClient from 'react-dom/client';

import { TileRayout } from './rayout';
import { SimpleTodo} from './Todo/SimpleTodo';
import { CustomTodo} from './Todo/CustomTodo';

import "./index.css";

class Root extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const todo1 = <CustomTodo key={"todo-" + 1} />;
        const todo2 = <SimpleTodo key={"todo-" + 2} />;
        const content = [todo1, todo2];
        return (
            <div>
                <TileRayout >{content}</TileRayout>
            </div>
        );

    }
}

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(<Root />);
