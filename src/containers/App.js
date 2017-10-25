import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TasksList from '../components/TasksList'
import AlertNotification from '../components/AlertNotification'
import { fetchTasks, postTasks, updateTasks } from '../actions'
import './app.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.saveTasks = this.saveTasks.bind(this)
    this.state = {
      savedTasks: false,
      showAlert: false
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    console.log(this.props)
    dispatch(fetchTasks())
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

  saveTasks() {
    const { dispatch, tasks } = this.props
    this.setState({ savedTasks: true })
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
                      onClick={ this.saveTasks }>Save</button>
            </div>
          </div>
          <TasksList
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
  isModified: PropTypes.bool.isRequired,
  tasks: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const {
    foundFetchError,
    foundPostError,
    isModified,
    items: tasks
  } = state.tasks || {
    foundFetchError: false,
    foundPostError: false,
    isModified: false,
    tasks: []
  }

  return {
    foundFetchError,
    foundPostError,
    isModified,
    tasks
  }
}

export default connect(mapStateToProps)(App)
