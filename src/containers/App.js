import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TasksList from '../components/TasksList'
import { getTasks, updateTasks } from '../actions'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.state = {
      history: [
        { tasks: [{
            id: 1,
            text: 'task 1'
          }]
        }
      ]
    }
  }

  componentDidMount() {
    const { dispatch, getTasks } = this.props
    // get tasks here
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
    const { history } = this.state
    const current = history[history.length - 1].tasks
    return (
      <div>
        <TasksList
          onDelete={ this.handleDelete }
          onChange={ this.handleChange }
          tasks={ current } />
      </div>
    )
  }
}

App.propTypes = {
  tasks: PropTypes.array,
  onUpdateTasks: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateTasks: tasks => {
      dispatch(updateTasks(tasks))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
