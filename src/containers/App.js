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
    const { dispatch } = this.props
    dispatch(fetchTasks())
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
      nextProps.dispatch(fetchTasks())
      return false
    }

    if (nextProps.foundPostError) {
      nextProps.dispatch(postTasks(nextProps.tasks))
      return false
    }

    if (this.state.savedTasks) {
      this.setState({ showAlert: true, savedTasks: false })
    }

    return true;
  }

  handleAdd() {
    const { dispatch } = this.props;
    this.setState({ addedTask: true })
    dispatch(addTask({ text: '' }))
  }

  handleChange({ target }, index) {
    const { dispatch } = this.props;
    dispatch(updateTask(target.value, index))
  }

  handleDelete(index) {
    const { dispatch } = this.props;
    dispatch(deleteTask(index))
  }

  handleSave() {
    const { dispatch, tasks } = this.props
    this.setState({ savedTasks: true })
    dispatch(postTasks(tasks))
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

App.propTypes = {
  foundFetchError: PropTypes.bool.isRequired,
  foundPostError: PropTypes.bool.isRequired,
  isModified: PropTypes.bool.isRequired,
  tasks: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
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
    isModified: false,
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

export default connect(mapStateToProps)(App)
