import React, { Component } from 'react'

export class GalleryCategoties extends Component {
    constructor(props){
        super(props)
        this.state = {
            galleryCategories: [
                {
                    key: 'all',
                    name: 'ALL',
                },
                {
                    key: 'isUploaded',
                    name: 'MY PHOTO',
                },
                {
                    key: 'isFavorite',
                    name: 'FAVORITES',
                },
            ]
        }
    }
  render() {
    return (
      <div className='categories'>
        {this.state.galleryCategories.map(category => (
            <div className = {`category ${this.props.activeCategory === category.key ? 'active' : ''}`} key = {category.key} onClick={() => this.props.onChangeCategory(category.key)}>{category.name}</div>
        ))}
      </div>
    )
  }
}

export default GalleryCategoties