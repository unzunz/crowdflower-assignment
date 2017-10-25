import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TasksList from '../components/TasksList'
import { fetchTasks, postTasks, updateTasks } from '../actions'
import './app.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.updateTasks = this.updateTasks.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    console.log(this.props)
    dispatch(fetchTasks())
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.foundError) {
      nextProps.dispatch(fetchTasks())
      return false;
    }
    return true;
  }

  handleAdd() {
    const { dispatch } = this.props;
    const tasks = this.props.tasks.slice();
    tasks.unshift({ text: '' });
    dispatch(updateTasks(tasks));
  }

  handleChange({ target }, index) {
    const { dispatch } = this.props;
    const tasks = this.props.tasks.slice();
    tasks[index].text = target.value;
    dispatch(updateTasks(tasks));
  }

  handleDelete(index) {
    const { dispatch } = this.props;
    const tasks = this.props.tasks.slice();
    tasks.splice(index, 1);
    dispatch(updateTasks(tasks))
  }

  updateTasks() {
    const { dispatch, tasks } = this.props
    dispatch(postTasks(tasks))
  }

  render() {
    return (
      <div>
      <div className='app-container'>
        <div className='header'>
          <h2 className='header-text'>Tasks</h2>
          <div className='header-buttons'>
            <button className='header-add-button'
                    onClick={ this.handleAdd }>Add Task</button>
            <button className='header-save-button'
                    disabled={ !this.props.isModified }
                    onClick={ this.updateTasks }>Save</button>
          </div>
        </div>
        <TasksList
          onDelete={ this.handleDelete }
          onChange={ this.handleChange }
          tasks={ this.props.tasks } />
      </div>
      <div className='alert-message'>
        <div className='alert-text'>Tasks saved succesfully</div>
        <i className='fa fa-times alert-x-icon'></i>
      </div>
    </div>
    )
  }
}

App.propTypes = {
  // foundError: PropTypes.bool.isRequired,
  isModified: PropTypes.bool.isRequired,
  tasks: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const {
    // foundError,
    isModified,
    items: tasks,
    showAlertMessage
  } = state.tasks || {
    isModified: false, tasks: []
  }

  return {
    // foundError,
    isModified,
    showAlertMessage,
    tasks
  }
}

export default connect(mapStateToProps)(App)
