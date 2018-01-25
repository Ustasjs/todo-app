import React, { Component } from 'react';
import MainInput from '../MainInput';
import TaskList from '../TaskList';
import { addToLS, getFromLS, removeFromLS } from '../../localStorage';
import './App.css';

class App extends Component {
  state = {
    taskList: []
  };

  componentDidMount() {
    const taskList = getFromLS() ? getFromLS() : [];
    this.setState({ taskList });
  }

  render() {
    const { taskList } = this.state;
    return (
      <div className="App">
        <h1 className="App__title">Todo app</h1>
        <button
          className="MainInput__button"
          onClick={this.handleCheckAllButtonClick}
        >
          Check all
        </button>
        <MainInput addNewTask={this.addNewTask} />
        <button className="App__button" onClick={this.handleClearButtonClick}>
          Clear local storage
        </button>
        <TaskList
          changeTask={this.changeTask}
          taskList={taskList}
          removeTask={this.removeTask}
        />
      </div>
    );
  }

  addNewTask = (task, id, date) => {
    const { taskList } = this.state;
    this.setState(
      {
        taskList: [...taskList, { task, id, isDone: false, date }]
      },
      () => {
        addToLS(this.state.taskList);
      }
    );
  };

  changeTask = newTask => {
    const { taskList } = this.state;
    const newTaskList = taskList.map(
      elem => (elem.id !== newTask.id ? elem : newTask)
    );
    this.setState({ taskList: newTaskList }, () => {
      console.log('ololo');
      addToLS(this.state.taskList);
    });
  };

  removeTask = id => {
    const { taskList } = this.state;
    const newTaskList = taskList.filter(elem => elem.id !== id);
    this.setState({ taskList: newTaskList }, () => {
      addToLS(this.state.taskList);
    });
  };

  handleClearButtonClick = () => {
    removeFromLS();
  };

  handleCheckAllButtonClick = () => {
    const { taskList } = this.state;
    const newTaskList = taskList.map(elem => {
      elem.isDone = true;
      return elem;
    });
    this.setState({ taskList: newTaskList }, () => {
      addToLS(this.state.taskList);
    });
  };
}

export default App;
