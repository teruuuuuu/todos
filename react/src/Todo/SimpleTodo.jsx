import React, { useState } from 'react';

class TodoItem {
    constructor(title, done = false) {
        this.title = title;
        this.done = done;
    }
}

export class SimpleTodo extends React.Component {

    constructor(props) {
        super(props);
        this.state = { input: "", todos: [], select: "all" };
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

    checkedHandle(index) {
        const { todos } = this.state;
        todos[index].done = !todos[index].done;
        this.setState({ todos: todos });
    }

    delHandle(delTodo) {
        const { todos } = this.state;
        this.setState({ todos: todos.filter(todo => todo !== delTodo) });
    }

    selectHandle(e) {
        this.setState({ select: e.target.value });
    }

    render() {
        const { input, todos, select } = this.state;
        return (
            <div className="todo">
                <h2>todo</h2>
                <input type="text" value={input} onChange={this.inputHandle.bind(this)} /><button onClick={this.addHandle.bind(this)}>add</button><br />
                <select value={select} onChange={this.selectHandle.bind(this)}>
                    <option value={"all"} >all</option>
                    <option value={"done"}>done</option>
                    <option value={"yet"} >yet</option>
                </select>
                <ol>{
                    todos.map((todo, index) => [todo, index]).filter(([todo, index]) => select == "done" ? todo.done : select == "yet" ? !todo.done : true).
                        map(([todo, index]) => <li key={"key_" + index}>
                            <input type="checkbox" checked={todo.done} onChange={this.checkedHandle.bind(this, index)} />
                            {todo.title}
                            <button onClick={this.delHandle.bind(this, todo)}>del</button>
                        </li>)
                }</ol>
            </div>
        )
    }
}