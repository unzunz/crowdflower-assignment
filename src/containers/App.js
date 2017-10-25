import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import AlertNotification from '../components/AlertNotification'
import TaskHeader from '../components/TaskHeader'
import TasksList from '../components/TasksList'
import { addTask, deleteTask, fetchTasks, postTasks, updateTask } from '../actions'
import './app.css';

export class App extends Component {
  constructor(props) {
    super(props)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.state = {
      addedTask: false,
      savedTasks: false,
      showAlert: false
    }
  }

  componentDidMount() {
    this.props.handleFetchTasks();
  }

  componentDidUpdate() {
    if (this.state.addedTask && this.firstTask) {
      this.setState({ addedTask: false }, () => {
        this.firstTask.focus()
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.foundFetchError) {
      nextProps.handleFetchTasks()
      return false
    }

    if (nextProps.foundPostError) {
      nextProps.handlePostTasks(nextProps.tasks)
      return false
    }

    if (this.state.savedTasks) {
      this.setState({ showAlert: true, savedTasks: false })
    }

    return true;
  }

  handleAdd() {
    this.setState({ addedTask: true })
    this.props.handleAddTask({ text: '' })
  }

  handleChange({ target }, index) {
    this.props.handleUpdateTask(target.value, index)
  }

  handleDelete(index) {
    console.log(index)
    this.props.handleDeleteTask(index)
  }

  handleSave() {
    const { handlePostTasks, tasks } = this.props
    this.setState({ savedTasks: true })
    handlePostTasks(tasks)
  }

  render() {
    return (
      <div>
        <div className='app-container'>
          <TaskHeader onAdd={ this.handleAdd }
                  onSave={ this.handleSave }
                  text='Task'
                  isSaveDisabled={ !this.props.isModified } />
          <TasksList
            firstRef={ elem => this.firstTask = elem }
            onDelete={ this.handleDelete }
            onChange={ this.handleChange }
            tasks={ this.props.tasks } />
        </div>
        <div className='alert-notification-wrapper'>
          <AlertNotification
            isHidden={ !this.state.showAlert }
            onClick={ () => this.setState({ showAlert: false }) }
            text='Tasks saved successfully' />
        </div>
      </div>
    )
  }
}

// TODO(unzi): Refactor `App` component - maybe to just handle fetching and posting tasks.
// Move rest of functionality (e.g. updating and adding) to `TaskList`
App.propTypes = {
  foundFetchError: PropTypes.bool.isRequired,
  foundPostError: PropTypes.bool.isRequired,
  handleAddTask: PropTypes.func.isRequired,
  handleFetchTasks: PropTypes.func.isRequired,
  handleDeleteTask: PropTypes.func.isRequired,
  handlePostTasks: PropTypes.func.isRequired,
  handleUpdateTask: PropTypes.func.isRequired,
  isModified: PropTypes.bool.isRequired,
  tasks: PropTypes.array.isRequired,
}

const mapStateToProps = state => {
  const {
    foundFetchError,
    foundPostError,
    fetchAttempts,
    isModified,
    postAttempts,
    items: tasks,
  } = state || {
    foundFetchError: false,
    foundPostError: false,
    fetchAttempts: 0,
    isModified: false,
    postAttempts: 0,
    tasks: []
  }

  return {
    fetchAttempts,
    foundFetchError,
    foundPostError,
    isModified,
    postAttempts,
    tasks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleAddTask: task => dispatch(addTask(task)),
    handleFetchTasks: () => dispatch(fetchTasks()),
    handleDeleteTask: index => dispatch(deleteTask(index)),
    handlePostTasks: tasks => dispatch(postTasks(tasks)),
    handleUpdateTask: (text, index) => dispatch(updateTask(text, index)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
