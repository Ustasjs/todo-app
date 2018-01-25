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

  render() {
    const { changeTask, removeTask } = this.props;
    const { sortedList } = this.state;
    return (
      <ul className="TaskList">
        {sortedList.map(elem => (
          <Task
            changeTask={changeTask}
            removeTask={removeTask}
            task={elem.task}
            id={elem.id}
            key={elem.id}
          />
        ))}
      </ul>
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
}

export default TaskList;
