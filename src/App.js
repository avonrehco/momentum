import React, { Component } from 'react'
import Header from './components/Header'
import Clock from './components/Clock'
import Footer from './components/Footer'

export class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      photos: [
        {
          id: 1,
          img: 'bg.jpg',
          isUploaded: false,
          isFavorite: false,
        },
        {
          id: 2,
          img: 'bg1.jpg',
          isUploaded: false,
          isFavorite: false,
        },
        {
          id: 3,
          img: 'bg2.jpg',
          isUploaded: false,
          isFavorite: false,
        },
        {
          id: 4,
          img: 'bg3.jpg',
          isUploaded: false,
          isFavorite: false,
        },
        {
          id: 5,
          img: 'bg4.jpg',
          isUploaded: false,
          isFavorite: false,
        },
        {
          id: 6,
          img: 'bg5.jpg',
          isUploaded: false,
          isFavorite: false,
        },
        {
          id: 7,
          img: 'bg6.jpg',
          isUploaded: false,
          isFavorite: false,
        },
        {
          id: 8,
          img: 'bg7.jpg',
          isUploaded: false,
          isFavorite: false,
        },
        {
          id: 9,
          img: 'bg8.jpg',
          isUploaded: false,
          isFavorite: false,
        },
      ],
      currentbg: 1,
      shownPhotos: [],
      activeCategory: 'all',
      tasks: [],
    }
    this.state.shownPhotos = this.state.photos
    this.changeBg = this.changeBg.bind(this)
    this.updateBg = this.updateBg.bind(this)
    this.addPhoto = this.addPhoto.bind(this)
    this.addToFavorite = this.addToFavorite.bind(this)
    this.deleteFromFavorite = this.deleteFromFavorite.bind(this)
    this.changeCategory = this.changeCategory.bind(this)
    this.addNewTask = this.addNewTask.bind(this)
    this.checkTask = this.checkTask.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.duplicateTask = this.duplicateTask.bind(this)
    this.editTask = this.editTask.bind(this)
  }

  componentDidMount() {
    this.updateBg();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentbg !== prevState.currentbg) {
      this.updateBg();
    }
  }

  componentWillUnmount() {
    document.body.style.backgroundImage = '';
  }

  render() {
    return (
      <div className='wrapper'>
        <Header/>
        <Clock />
        <Footer 
          onDuplicateTask = {this.duplicateTask} 
          onDeleteTask = {this.deleteTask} 
          onEditTask = {this.editTask}
          onCheckTask = {this.checkTask} 
          onAddNewTask = {this.addNewTask} 
          tasks = {this.state.tasks} 
          photos = {this.state.shownPhotos} 
          currentbg = {this.state.currentbg} 
          onChangeBg = {this.changeBg} 
          onAddPhoto = {this.addPhoto} 
          onAddToFavorite = {this.addToFavorite} 
          onDeleteFromFavorite = {this.deleteFromFavorite} 
          onChangeCategory = {this.changeCategory} 
          activeCategory = {this.state.activeCategory}/> 
      </div>
    )
  }

  changeCategory(category){

    this.setState({ activeCategory: category})

    if(category === 'all'){
        this.setState({shownPhotos: this.state.photos})
    } else {
        this.setState({
            shownPhotos: this.state.photos.filter(photo => photo[category] === true)
        })
    }
  }

  deleteFromFavorite(img){
    this.setState(prevState => ({
      photos: prevState.photos.map (photo => 
        photo.id === img.id ? {...photo, isFavorite: false} : photo
      )
    }), () => {
      this.changeCategory(this.state.activeCategory)
    })
  }

  addToFavorite(img){
    this.setState(prevState => ({
      photos: prevState.photos.map (photo => 
        photo.id === img.id ? {...photo, isFavorite: true} : photo
      ),
      shownPhotos: prevState.shownPhotos.map (photo => 
            photo.id === img.id ? {...photo, isFavorite: true} : photo
      )
    }))
  }

  changeBg(newImg){
    this.setState({currentbg: newImg.id});
    this.updateBg();
  }

  updateBg(){
    
    let bgUrl = '';
    const imgBg = this.state.photos.find(el => el.id === this.state.currentbg)

    if(imgBg.url){
      bgUrl = `url("${imgBg.url}")`;
    } else {
      bgUrl = `url("/img/${imgBg.img}")`;
    }
    const gradient = 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))';

    document.body.style.backgroundImage = `${gradient}, ${bgUrl}`;
  }

  addPhoto(newImg){
    this.setState({photos: [...this.state.photos, newImg]}, () => {this.changeCategory(this.state.activeCategory)})
  }

  addNewTask(task) {
    task.id = Date.now() + '-' + Math.floor(Math.random() * 1000)
    let isRepeated = this.state.tasks.filter(t => t.text === task.text)
    console.log(isRepeated)
    if(isRepeated.length > 0){
      task.isCopy = `(${isRepeated.length})`
    }
    this.setState({tasks: [...this.state.tasks, task]})
  }

  checkTask(task) {
    this.setState(prevState => ({
      tasks: prevState.tasks.map (t =>
        t.id === task.id ? {...t, isCompleted: !t.isCompleted} : t
      )
    }))
  }

  deleteTask(id) {
    this.setState({tasks: this.state.tasks.filter(task => task.id !== id)})
  }

  duplicateTask(task) {
    const newTask = {
        text: `${task.text} (copy)`,
        isCompleted: task.isCompleted
    }
    this.addNewTask(newTask)
  }

  editTask(id, newText) {
    this.setState(prevState => ({
      tasks: prevState.tasks.map(task =>
        task.id === id ? {...task, text: newText} : task
      )
    }))
  }
}

export default App