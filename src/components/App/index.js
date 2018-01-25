import React, { Component } from 'react';
import MainInput from '../MainInput';
import TaskList from '../TaskList';
import './App.css';

class App extends Component {
  state = {
    taskList: []
  };

  render() {
    const { taskList } = this.state;
    return (
      <div className="App">
        <h1 className="App__title">Todo app</h1>
        <MainInput addNewTask={this.addNewTask} />
        <TaskList
          changeTask={this.changeTask}
          taskList={taskList}
          removeTask={this.removeTask}
        />
      </div>
    );
  }

  addNewTask = (task, id) => {
    const { taskList } = this.state;
    this.setState({ taskList: [...taskList, { task, id, isDone: false }] });
  };

  changeTask = (task, id, isDone) => {
    const { taskList } = this.state;
    const newTaskList = taskList.map(
      elem => (elem.id !== id ? elem : { task, id, isDone })
    );
    this.setState({ taskList: newTaskList });
  };

  removeTask = id => {
    const { taskList } = this.state;
    const newTaskList = taskList.filter(elem => elem.id !== id);
    this.setState({ taskList: newTaskList });
  };
}

export default App;
