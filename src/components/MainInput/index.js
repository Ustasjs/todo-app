import React, { Component } from 'react';
import { makeId } from '../../utils';

class MainInput extends Component {
  state = {
    newTask: ''
  };

  render() {
    const { newTask } = this.state;
    return (
      <div className="MainInput">
        <button className="MainInput__button">Check all</button>
        <input
          value={newTask}
          onKeyPress={this.handleKeyPress}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          type="text"
          className="MainInput__input"
        />
      </div>
    );
  }

  handleChange = e => {
    const value = e.target.value;

    this.setState({ newTask: value });
  };

  handleBlur = e => {
    const value = e.target.value.trim();

    this.setState({ newTask: value });
  };

  handleKeyPress = e => {
    const { addNewTask } = this.props;
    const { newTask } = this.state;
    const taskId = makeId();
    if (e.key === 'Enter' && newTask !== '') {
      addNewTask(newTask.trim(), taskId);
      this.setState({ newTask: '' });
    }
  };
}

export default MainInput;
