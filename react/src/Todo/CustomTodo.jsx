import React, { useState } from 'react';

import styles from './custom.css';
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
            <div className={state === select ? styles["c-state-item"] + " " + styles["active"] : styles["c-state-item"]} onClick={this.selectHandle.bind(this, state)} key={state}>{state}</div>)
        return (
            <div className={styles["c-todo"]}>
                <div className={styles['c-todo-rayout']}>
                    <h2>todo</h2>
                    <div className={styles['c-view-state']}>
                        {stateSelectC}
                    </div>
                    <div className={styles['c-todo-list']}>
                        <div className={styles['c-todo-item'] + " " + styles['add']}>
                            <input type='text' value={input} onChange={this.inputHandle.bind(this)} />
                            <div className={styles['c-todo-button']} onClick={this.addHandle.bind(this)}>add</div>
                        </div>
                        {
                            todos.filter(todo => select === "ALL" || (select === "DONE" && todo.done) || (select === "YET" && !todo.done)
                            ).map((todo, index) =>
                                <div key={"todo-" + index} className={todo.done ? styles['c-todo-item'] + ' '  + styles['checked'] : styles['c-todo-item']}>
                                    <div className={styles['c-todo-check']} onClick={this.checkedHandle.bind(this, todo)}>{todo.done ? "☑︎" : "▫︎"}</div>
                                    <div className={styles['c-todo-title']} onClick={this.checkedHandle.bind(this, todo)}>{todo.title}</div>
                                    <div className={styles['c-todo-button'] + " " + styles['del']} onClick={this.delHandle.bind(this, todo)}>del</div>
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
        )
    }
}