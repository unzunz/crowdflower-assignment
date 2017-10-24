import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TasksList from '../components/TasksList'
import { fetchTasks, updateTasks } from '../actions'
import './app.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
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
    console.log("add task")
  }

  handleChange() {
    console.log("task change")
  }

  handleDelete() {
    console.log("task delete")
  }

  render() {
    return (
      <div className='app-container'>
        <div className='header'>
          <h2 className='header-text'>Tasks</h2>
          <div className='header-buttons'>
            <button className='header-add-button'
                    onClick={ this.handleAdd }>Add Task</button>
            <button className='header-save-button'>Save</button>
          </div>
        </div>
        <TasksList
          onDelete={ this.handleDelete }
          onChange={ this.handleChange }
          tasks={ this.props.tasks } />
      </div>
    )
  }
}

App.propTypes = {
  foundError: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  tasks: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const {
    foundError,
    isFetching,
    items: tasks
  } = state.tasks || {
    foundError: false, isFetching: true, tasks: []
  }

  return {
    foundError,
    isFetching,
    tasks
  }
}

export default connect(mapStateToProps)(App)
