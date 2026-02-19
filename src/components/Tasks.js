import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { GoKebabHorizontal } from "react-icons/go";
import ClickOutside from './ClickOutside';

export default function Tasks(props) {
  
  const [task, setTask] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [activeIdCheckboxMenu, setActiveIdCheckboxMenu] = useState(null)
  let [activeInboxMenu, setActiveInboxMenu] = useState(false)
  let [activeTodoMenu, setActiveTodoMenu] = useState(false)
  const [isEditing, setIsEditing] = useState(0)
  const [editTask, setEditTask] = useState('')

  useEffect(() => {
    if(props.currentTasks.length > 0){
      setShowInput(true)
    } else setShowInput(false)
  }, [props.currentTasks.length])

  const handleSubmitTask = (event) => {
    if(event.key === 'Enter' && task.trim()){
      const newTask = {
        text: task,
        isCompleted: props.activeCategory === 'Inbox' ? false : true
      }

      props.onAddNewTask(newTask)
      setTask('')
    }
  }

  const startEditing = (task) => {
    setIsEditing(task.id)
    setEditTask(task)
    setActiveIdCheckboxMenu(0)
  }

  const cancelEditing = () => {
    setIsEditing(0)
    setEditTask('')
  }

  const handleEditTask = (event) => {
    if(event.key === 'Enter' && editTask.trim()){
      event.preventDefault()
      props.onEditTask(isEditing, editTask)
      cancelEditing()
    } else if(event.key === 'Escape'){
      cancelEditing()
    }
  }

  const handleChangeCategory = (category) => {
    props.onSetActiveCategory(category)
    setActiveInboxMenu(false)
  }

  const showNothingTasks = () => {
    return(
      <div>
        <div className='empty-todo'>
          <h2>{props.activeCategory === 'Inbox' ? 'Add a task to get started' : 'No completed tasks yet'}</h2>
          <div className={`new-task-btn ${showInput && 'noactive'}`} onClick={() => setShowInput(true)}>New Task</div>
        </div>
      </div>
    )
  }

  const showTasksList = () => {
    return (
      <div className='task-list'>
        {props.currentTasks.map((t,index) => (
          <div id={t.id} className={`task-cell ${activeIdCheckboxMenu === t.id ? 'active' : ''}`}>
            <div className='created-task'>
              <input checked = {t.isCompleted} type ='checkbox' onChange={() => props.onCheckTask(t)}/>
              {isEditing === t.id ? (
                <ClickOutside onClickOutside={() => cancelEditing()}>
                  <input type='text' value={editTask.text} onChange={(e) => setEditTask(e.target.value)} onKeyUp ={handleEditTask} className='task-edit-input' autoFocus/>
                </ClickOutside>
                ) : (
                <div className='task-text'>{t.text} {t.isCopy}</div>
              )}
            </div>
              <GoKebabHorizontal className='task-menu' onClick={() => activeIdCheckboxMenu !== t.id ? setActiveIdCheckboxMenu(t.id) : setActiveIdCheckboxMenu(null)}/>
              {activeIdCheckboxMenu === t.id && (
                <ClickOutside onClickOutside={() => setActiveIdCheckboxMenu(null)}>
                  <div className={`task-menu-list ${index >= props.currentTasks.length-4? 'active-bottom' : 'active-top'}`}>
                    <ul>
                      <li onClick={() => startEditing(t)}>Edit</li>
                      <li onClick={() => props.onDuplicateTask(t)}>Duplicate</li>
                      <li onClick={() => props.onDeleteTask(t.id)}>Delete</li>
                    </ul>
                  </div>
                </ClickOutside>
              )}
          </div>
        ))}
      </div>
    )
}

  return (
      <div className='todo-list'>
        <div className='todo-head'>
            <div className='inbox'>
                <div className='title'>{props.activeCategory}</div>
                <ClickOutside onClickOutside={() => setActiveInboxMenu(false)}>
                  <IoIosArrowDown className='dropdown-menu' onClick={() => setActiveInboxMenu(!activeInboxMenu)}/>
                  {activeInboxMenu && (
                    <div className='inbox-menu'>
                      <ul>
                        <li onClick={() => handleChangeCategory('Inbox')}>
                          <span>Inbox</span>
                          <span>{props.tasks.filter(task => task.isCompleted === false).length}</span>
                        </li>
                        <li onClick={() => handleChangeCategory('Done')}>
                          <span>Done</span>
                          <span>{props.tasks.filter(task => task.isCompleted === true).length}</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </ClickOutside>
            </div>
            <ClickOutside onClickOutside={() => setActiveTodoMenu(false)}>
              <GoKebabHorizontal className='todo-menu' onClick={() => setActiveTodoMenu(!activeTodoMenu)}/>
              {activeTodoMenu && (
                <div className='todo-menu-box'>
                  <div className='stay-open-text'>Stay open</div>
                  <label className='switch'>
                    <input type='checkbox' checked ={props.stayOpen} onChange={() => props.onStayOpen()}/>
                    <span className='slider'></span>
                  </label>
                </div>
              )}
            </ClickOutside>
        </div>
        <div className='todo-field'>
          {props.currentTasks.length > 0 ? 
            showTasksList() : showNothingTasks()}

            {showInput && (
              <ClickOutside onClickOutside={() => setTask('')}>
                <input className ='new-task' type='text' value={task} onChange={(e) => setTask(e.target.value)} onKeyUp ={handleSubmitTask} placeholder='New Task' autoFocus/>
              </ClickOutside>
            )}
        </div>
      </div>
  )
}