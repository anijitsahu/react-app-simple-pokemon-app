// dependencies
import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import axios from 'axios'

import Background from './eevee1.png'

// Components
import PokemonPanel from '../pokemon/PokemonPanel'
import SearchBar from '../search/SearchBar'
import Login from './Login'

// Constants
import Constants from '../Constants'

class Content extends Component {
  constructor(props) {
    super(props)

    const TOTAL_NUMBER_OF_IMAGES = 5
    this.state = {
      active: 1,
      total: TOTAL_NUMBER_OF_IMAGES,
      searchText: '',
      searchId: '',
      showContent: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.getUserInfo = this.getUserInfo.bind(this)

    // initialize all constants
    this.allConstants = new Constants()
  }


  handleChange(event) {
    this.setState({ searchText: event.target.value })
  }

  handleKeyPress(event) {
    console.log('event here', event.target.id)
    if (event.keyCode == 13 || event.which == 13 || event.target.id == "searchbutton") {
      console.log('search for pokemon ', this.state.searchText)
      this.setState({ searchId: uuidv4() })
    }
  }

  getUserInfo(userInfo) {
    console.log("from content", userInfo)
    if (userInfo.id) {
      this.getFavouritePokemons(userInfo)
      this.setState({ showContent: true })
    }
  }

  getFavouritePokemons(userInfo) {
    let { allConstants } = this
    axios({
        method: allConstants.METHODS.POST,
        url: allConstants.GET_USER_FAV_POKEMON,
        header: allConstants.HEADER,
        data: userInfo
      })
      .then((response) => {
        console.log('Response received', response)
      })
      .catch((error) => {
        console.log('error occurred...', error)
      })
  }

  render() {
    let { active, total, searchText, searchId, showContent } = this.state
    let style = { backgroundImage: `linear-gradient( rgba(211, 117, 232, 0.3), rgba(0,0,0,0.5) ),url(${Background})` }
    return (
      <div className="content" style={style}>
        {(showContent == false) ? <Login getUserInfo={this.getUserInfo} />
        :
          <React.Fragment>
            <SearchBar
              handleChange={this.handleChange}
              handleKeyPress={this.handleKeyPress}
              searchText={searchText} />
            <PokemonPanel searchId={searchId} searchText={searchText} />
          </React.Fragment>
        }
      </div>
    );
  }
};


export default Content;