// dependencies
import React, { Component } from 'react'
import uuidv4 from 'uuid/v4'
import axios from 'axios'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

import Background from './eevee1.png'

// Components
import PokemonPanel from '../pokemon/PokemonPanel'
import FavouritePokemons from '../pokemon/FavouritePokemons'
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
      showContent: false,
      favourites: [],
      favId: '',
      links: [{
        id: "all",
        path: "/",
        desc: "All"
      },
      {
        id: "favourites",
        path: "/favourites",
        desc: "Favourites"
      }
      ],
      activeLink: "all"
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.getUserInfo = this.getUserInfo.bind(this)

    this.changeRating = this.changeRating.bind(this)
    this.updatePokemonsList = this.updatePokemonsList.bind(this)
    this.makeActiveLink = this.makeActiveLink.bind(this)

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
    this.setState({ userInfo }, () => {
      this.props.sendUserInfo(userInfo)
    })

    axios({
      method: allConstants.METHODS.POST,
      url: allConstants.GET_USER_FAV_POKEMON,
      header: allConstants.HEADER,
      data: userInfo
    })
      .then((response) => {
        console.log('Response received', response)
        this.setState({ favourites: [1, 4, 7], favId: uuidv4() })
      })
      .catch((error) => {
        console.log('error occurred...', error)
      })
  }

  changeRating(favourites) {
    // console.log("code reaches Content", favourites)
    this.setState({ favourites })
    this.saveRatingToDb()
  }

  saveRatingToDb() {
    let { allConstants } = this
    let { userInfo } = this.state
    axios({
      method: allConstants.METHODS.POST,
      url: allConstants.SAVE_USER_FAVE_POKEMON,
      header: allConstants.HEADER,
      data: userInfo
    })
      .then((response) => {
        console.log("rating saved successfully")
      })
      .catch((error) => {
        console.log("Unable to save the rating")
      })
  }

  updatePokemonsList(pokemons) {
    console.log("Pokemons are now", pokemons)
    this.setState({ pokemons, pokemonsListId: uuidv4() })
  }

  makeActiveLink(event) {
    this.setState({ activeLink: event.target.id })
  }

  render() {
    let { active, total, searchText, searchId, showContent, favourites, favId, pokemons, pokemonsListId, links, activeLink } = this.state
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

            <div className="links-div">
              {
                links.map((ele) => {

                  let linkStyle = (activeLink == ele.id) ? "link-anc active-link" : "link-anc"
                  return (
                    <Link key={ele.id} id={ele.id} to={ele.path} className={linkStyle} onClick={this.makeActiveLink}>{ele.desc}</Link>
                  )
                })
              }
            </div>

            <Switch>
              <Route exact path="/" render={(props) => (
                <PokemonPanel
                  searchId={searchId}
                  favId={favId}
                  searchText={searchText}
                  favourites={favourites}
                  pokemons={pokemons}
                  updatePokemonsList={this.updatePokemonsList}
                  changeRating={this.changeRating} />
              )} />

              <Route path="/favourites" render={(props) => (
                <FavouritePokemons
                  searchId={searchId}
                  favId={favId}
                  searchText={searchText}
                  favourites={favourites}
                  pokemons={pokemons}
                  pokemonsListId={pokemonsListId}
                  changeRating={this.changeRating} />
              )} />
            </Switch>
          </React.Fragment>
        }
      </div>
    );
  }
};


export default Content;