import React, { useState } from 'react';

class TodoItem {
    constructor(title, done = false) {
        this.title = title;
        this.done = done;
    }
}

const TODO_STATES = ["ALL", "YET", "DONE"];

export class CustomTodo extends React.Component {

    constructor(props) {
        super(props);
        this.state = { input: "", todos: [], select: TODO_STATES[0] };
    }

    addHandle() {
        const input = this.state.input.trim();
        if (input.length > 0) {
            const { todos } = this.state;
            todos.push(new TodoItem(input));
            this.setState({ input: "", todos: todos });
        }
    }

    inputHandle(e) {
        this.setState({ input: e.target.value });
    }

    checkedHandle(todo) {
        const { todos } = this.state;
        const index = todos.findIndex(t => t === todo);
        this.setState({ todos: todos.slice(0, index).concat([Object.assign(todo, { done: !todo.done })]).concat(todos.slice(index + 1)) });
    }

    delHandle(delTodo) {
        const { todos } = this.state;
        this.setState({ todos: todos.filter(todo => todo !== delTodo) });
    }

    selectHandle(selectState) {
        this.setState({ select: selectState });
    }

    render() {
        const { input, todos, select } = this.state;
        const stateSelectC = TODO_STATES.map(state =>
            <div className={state === select ? "c-state-item active" : "c-state-item"} onClick={this.selectHandle.bind(this, state)} key={state}>{state}</div>)
        return (
            <div className="c-todo">
                <div className='c-todo-rayout'>
                    <h2>todo</h2>
                    <div className='c-view-state'>
                        {stateSelectC}
                    </div>
                    {/* <ol>{
                        todos.map((todo, index) => [todo, index]).filter(([todo, index]) => select == "done" ? todo.done : select == "yet" ? !todo.done : true).
                            map(([todo, index]) => <li key={"key_" + index}>
                                <input type="checkbox" checked={todo.done} onChange={this.checkedHandle.bind(this, index)} />
                                {todo.title}
                                <button onClick={this.delHandle.bind(this, todo)}>del</button>
                            </li>)
                    }</ol> */}
                    <div className='c-todo-list'>
                        {
                            todos.filter(todo => select === "ALL" || (select === "DONE" && todo.done) || (select === "YET" && !todo.done)
                            ).map((todo, index) =>
                                <div key={"todo-" + index} className={todo.done ? 'c-todo-item checked' : 'c-todo-item'}>
                                    <div className='c-todo-check' onClick={this.checkedHandle.bind(this, todo)}>{todo.done ? "☑︎" : "▫︎"}</div>
                                    <div className='c-todo-title' onClick={this.checkedHandle.bind(this, todo)}>{todo.title}</div>
                                    <div className='c-todo-button del' onClick={this.delHandle.bind(this, todo)}>del</div>
                                </div>
                            )
                        }
                        <div className='c-todo-item add'>
                        <input type='text' value={input} onChange={this.inputHandle.bind(this)} />
                        <div className='c-todo-button' onClick={this.addHandle.bind(this)}>add</div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}