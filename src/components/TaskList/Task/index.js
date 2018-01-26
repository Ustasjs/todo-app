import React, { Component } from 'react';
import './Task.css';

class Task extends Component {
  state = {
    taskValue: '',
    isDone: false
  };

  componentDidMount() {
    const { task, isDone } = this.props;

    this.setState({ taskValue: task, isDone });
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.task !== nextProps.task ||
      this.props.isDone !== nextProps.isDone
    ) {
      const { task, isDone } = nextProps;

      this.setState({ taskValue: task, isDone });
    }
  }

  render() {
    const { taskValue, isDone } = this.state;
    return (
      <li className="Task">
        <input
          onChange={this.handleCheckboxChange}
          checked={isDone}
          type="checkbox"
          className="Task__checkbox"
        />
        <input
          value={taskValue}
          onKeyPress={this.handleKeyPress}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          type="text"
          className="input Task__text"
        />
        <button onClick={this.handleRemove} className="button Task__button">
          X
        </button>
      </li>
    );
  }

  handleChange = e => {
    const value = e.target.value;

    this.setState({ taskValue: value });
  };

  handleCheckboxChange = e => {
    const { changeTask, id, date } = this.props;
    const { taskValue } = this.state;
    const isDone = e.target.checked;
    const newTask = { task: taskValue, id, isDone, date };

    this.setState({ isDone });

    changeTask(newTask);
  };

  handleBlur = e => {
    this.changeTaskProp(e);
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.changeTaskProp(e);
    }
  };

  handleRemove = e => {
    const { removeTask, id } = this.props;
    removeTask(id);
  };

  changeTaskProp = e => {
    const { changeTask, id, date } = this.props;
    const { isDone } = this.state;
    const task = e.target.value.trim();
    const newTask = { task, id, isDone, date };

    this.setState({ taskValue: task });
    changeTask(newTask);
  };
}

export default Task;
