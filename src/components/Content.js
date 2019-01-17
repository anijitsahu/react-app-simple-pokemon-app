// dependencies
import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

// Components
import PokemonPanel from './pokemon/PokemonPanel'
import SearchBar from './SearchBar'

class Content extends Component {
  constructor(props) {
    super(props)

    const TOTAL_NUMBER_OF_IMAGES = 5
    this.state = {
      active: 1,
      total: TOTAL_NUMBER_OF_IMAGES,
      searchText: '',
      searchId: ''
    }

    this.updateImage = this.updateImage.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  // update the image
  updateImage(event) {
    event.persist()
    let { id } = event.target
    let { active, total } = this.state
    console.log('button clicked...', id)

    if (id == "left") {

      active = (active > 1) ? active - 1 : 1
      this.setState({ active }, () => {
        // console.log('Upadated State', this.state)
      })
    } else if (id == "right") {
      active = (active < total) ? active + 1 : total

      this.setState({ active })
    }
  }

  handleChange(event) {
    this.setState({ searchText: event.target.value })
  }

  handleKeyPress(event) {
    if (event.keyCode == 13 || event.which == 13) {
      console.log('search for pokemon ', this.state.searchText)
      this.setState({ searchId: uuidv4() })
    }
  }

  render() {
    let { active, total, searchText, searchId } = this.state
    return (
      <div className="content">
        <SearchBar
          handleChange={this.handleChange}
          handleKeyPress={this.handleKeyPress}
          searchText={searchText} />
        <PokemonPanel searchId={searchId} searchText={searchText}/>
      </div>
    );
  }
};


export default Content;