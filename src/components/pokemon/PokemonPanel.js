import React, { Component } from 'react';
import axios from 'axios'

// Components
import Navigation from './Navigation'
import Pokemon from './Pokemon'

// Constants
import Constants from '../Constants'

class PokemonPanel extends Component {
	constructor(props) {
		super(props)

		// initial state
		this.state = {
			pokemons: [],
			pokemonsOrig: []
		}

		// initialize Constants
		this.allConstants = new Constants()
	}

	componentDidMount() {
		this.getPokemons()
	}

	componentWillReceiveProps(nextProps) {

		if (nextProps.searchId && (nextProps.searchId !== this.props.searchId)) {

			console.log("searchId from ", nextProps.searchId, " and current props", this.props.searchId)
			console.log("and search text", nextProps.searchText)

			// if (nextProps.searchText !== this.props.searchText) {
			console.log('New search text received... perform the search')
			this.searchAndFilterPokemons(nextProps.searchText)
			// }
		}
	}

	// search / filter
	searchAndFilterPokemons(searchText) {
		console.log('Code reached', searchText)
		let pokemons = [...this.state.pokemonsOrig]

		pokemons = pokemons.filter((ele) => {
			return ele.name.includes(searchText) || ele.types.includes(searchText)
		})

		// if the pokemon is not present in the current state
		if (pokemons.length == 0) {
			this.getIndivPokemon(searchText)
		} else {
			this.setState({ pokemons }, () => {
				console.log('Filtered pokemons are', this.state)
			})
		}
	}

	// get indiv pokemon by name / type
	getIndivPokemon(searchText, modifyUrl) {
		modifyUrl = (modifyUrl) ? modifyUrl : false
		console.log('modifyUrl >>', modifyUrl)
		let { allConstants } = this

		axios({
			method: allConstants.METHODS.GET,
			url: (modifyUrl == true) ? allConstants.TYPE_INDIV_URL.replace('{id}', searchText) : allConstants.POKEMON_INDIV_URL.replace('{id}', searchText),
			headers: allConstants.HEADER
		})
			.then((response) => {
				console.log('response for Search', response)
				let searchResults = (modifyUrl == true) ? response.data.pokemon : [response]
				this.formatPokemonInfo(searchResults, false)
			})
			.catch((error) => {
				console.error("some error occurred", error)

				if (modifyUrl == false) {
					this.getIndivPokemon(searchText, true)
				} else {
					console.log('No match found')
				}
			})
	}

	// function to get the data from API
	getPokemons() {
		let promises = []
		let { allConstants } = this

		for (let i = 1; i < 10; i++) {
			promises.push(
				axios({
					method: allConstants.METHODS.GET,
					url: allConstants.POKEMON_INDIV_URL.replace('{id}', i),
					headers: allConstants.HEADER
				})
			)
		}

		// promise call to get the data
		Promise.all(promises)
			.then((response) => {
				console.dir("response from API", response)
				this.formatPokemonInfo(response, true)
			})
			.catch((error) => {
				console.error("Some error occurred", error)
			})
	}

	formatPokemonInfo(response, modifyOrig) {
		let pokemons = []
		console.log('Response received', response)
		response.forEach((ele) => {
			let { name, id, height, weight, stats, types } = (ele.data) ?  ele.data : ele.pokemon
			
			// set pokemon types
			let pokemonTypes = ''
			if (types) {
				types.forEach((ele) => {
					pokemonTypes = `${pokemonTypes}, ${ele.type.name}`
				})
			}

			// remove the first comma
			pokemonTypes = pokemonTypes.replace(', ', '')

			// set the pokemon stats
			let pokemonStats = []
			if (stats) {
				stats.forEach((ele) => {
					pokemonStats.push({ name: ele.stat.name, rank: ele.base_stat })
				})
			}

			pokemons.push({
				name, id, height, weight, types: pokemonTypes, stats: pokemonStats
			})
		})

		if (modifyOrig == true) {
			this.setState({ pokemons, pokemonsOrig: [...pokemons] }, () => {
				console.log('pokemons are now', this.state.pokemons)
			})

		} else {
			this.setState({ pokemons })
		}
	}

	// render 
	render() {
		let { pokemons } = this.state
		return (
			<div className="pokemon-panel">
				{
					pokemons.map((pokemon) => {
						return (
							<Pokemon key={pokemon.id} {...pokemon} />
						)
					})
				}
			</div>
		);
	}
}


export default PokemonPanel;