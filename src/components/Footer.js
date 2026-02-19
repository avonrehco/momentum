import React, { useState } from 'react'
import { MdAppSettingsAlt, MdOutlineCheckBox, MdOutlineImage } from "react-icons/md";
import Gallery from './Gallery';
import Tasks from './Tasks';
import ClickOutside from './ClickOutside';

export default function Footer(props) {

  let [galleryOpen, setGalleryOpen] = useState(false)
  let [tasksOpen, setTasksOpen] = useState(false)
  const [activeStayOpen, setActiveStayOpen] = useState(false)
  let [activeCategory, setActiveCategory] = useState('Inbox')

  const handleStayOpen = () => {
    setActiveStayOpen(!activeStayOpen)
  }

  const handleActiveCategory = (category) => {
    setActiveCategory(category)
  }

  const getFilteredTasks = () => {
    if(activeCategory === 'Done'){
      return props.tasks.filter(task => task.isCompleted === true)
    }
    return props.tasks
  }

  return (
    <footer>
      <ClickOutside onClickOutside={() => setGalleryOpen(false)}>
        <div className='change-bg'>
          <MdOutlineImage onClick = {() => setGalleryOpen(!galleryOpen)} className='footer-icon'/>
          {galleryOpen && (
            <Gallery 
              photos = {props.photos} 
              currentbg = {props.currentbg} 
              onChangeBg = {props.onChangeBg} 
              onAddPhoto = {props.onAddPhoto} 
              onAddToFavorite = {props.onAddToFavorite} 
              onDeleteFromFavorite = {props.onDeleteFromFavorite} 
              onChangeCategory = {props.onChangeCategory} 
              activeCategory = {props.activeCategory}/>
          )}
        </div>
      </ClickOutside>
      <div className='quote'>Be the flame, not the moth</div>
      <ClickOutside onClickOutside={() => setTasksOpen(activeStayOpen)}>
          <div className='tasks'>
            <div className='full-icon' onClick={() => setTasksOpen(!tasksOpen)}>
              <div className='tasks-text'>Tasks</div>
              <MdOutlineCheckBox className='footer-icon'/>
            </div>
          {tasksOpen && (
                <Tasks 
                  activeCategory = {activeCategory} 
                  onSetActiveCategory = {handleActiveCategory} 
                  stayOpen = {activeStayOpen} 
                  onStayOpen = {handleStayOpen} 
                  onDuplicateTask = {props.onDuplicateTask} 
                  onDeleteTask = {props.onDeleteTask} 
                  onCheckTask = {props.onCheckTask} 
                  onAddNewTask = {props.onAddNewTask} 
                  onEditTask = {props.onEditTask}
                  tasks = {props.tasks} 
                  currentTasks = {getFilteredTasks()}/>
          )}
          </div>
      </ClickOutside>
    </footer>
  )
}
