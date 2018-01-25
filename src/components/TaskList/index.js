import React, { Component } from 'react';
import Task from './Task';

class TaskList extends Component {
  state = {
    sortType: 'task',
    sortedList: []
  };

  componentDidMount() {
    const { taskList } = this.props;
    this.setState({ sortedList: this.sortList(taskList) });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.taskList !== nextProps.taskList) {
      this.setState({ sortedList: this.sortList(nextProps.taskList) });
    }
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.state.sortType !== nextState.sortType) {
      this.setState({ sortedList: this.sortList(nextProps.taskList) });
    }
  }

  render() {
    const { changeTask, removeTask } = this.props;
    const { sortedList, sortType } = this.state;
    return (
      <div className="TaskList">
        <div className="TaskList__controls">
          <label className="TaskList__label">
            <input
              type="radio"
              value="task"
              name="sortType"
              className="TaskList__radio"
              checked={sortType === 'task'}
              onChange={this.handleChangeRadio}
            />
            <span className="TaskList__radio-info">Sort by title</span>
          </label>
          <label className="TaskList__label">
            <input
              type="radio"
              value="date"
              name="sortType"
              className="TaskList__radio"
              checked={sortType === 'date'}
              onChange={this.handleChangeRadio}
            />
            <span className="TaskList__radio-info">Sort by date</span>
          </label>
        </div>
        <ul className="TaskList__list">
          {sortedList.map(elem => (
            <Task
              changeTask={changeTask}
              removeTask={removeTask}
              task={elem.task}
              id={elem.id}
              key={elem.id}
              date={elem.date}
              isDone={elem.isDone}
            />
          ))}
        </ul>
      </div>
    );
  }

  sortList = list => {
    const { sortType } = this.state;

    function sortBy(a, b) {
      if (a[sortType] > b[sortType]) {
        return -1;
      }
      if (a[sortType] < b[sortType]) {
        return 1;
      }
      return 0;
    }

    return list.sort(sortBy);
  };

  handleChangeRadio = e => {
    const value = e.target.value;

    this.setState({ sortType: value });
  };
}

export default TaskList;
