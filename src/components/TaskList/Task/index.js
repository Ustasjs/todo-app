import React, { Component } from 'react';

class Task extends Component {
  state = {
    taskValue: '',
    isDone: false
  };

  componentDidMount() {
    const { task } = this.props;

    this.setState({ taskValue: task });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.task !== nextProps.task) {
      const { task } = nextProps;

      this.setState({ taskValue: task });
    }
  }

  render() {
    const { taskValue, isDone } = this.state;
    return (
      <div className="Task">
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
          className="Task__text"
        />
        <button onClick={this.handleRemove} className="Task__button">
          X
        </button>
      </div>
    );
  }

  handleChange = e => {
    const value = e.target.value;

    this.setState({ taskValue: value });
  };

  handleCheckboxChange = e => {
    const { changeTask, id } = this.props;
    const { taskValue } = this.state;
    const value = e.target.checked;

    this.setState({ isDone: value });
    changeTask(taskValue, id, value);
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
    const { changeTask, id } = this.props;
    const { isDone } = this.state;
    const value = e.target.value.trim();

    this.setState({ taskValue: value });
    changeTask(value, id, isDone);
  };
}

export default Task;
