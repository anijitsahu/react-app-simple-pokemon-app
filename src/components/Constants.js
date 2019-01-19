class Constants {
	constructor() {
		this.PERMISSIBLE_PAGINATION_LIMIT = 9

		// URLs
		this.BASE_URL = "https://pokeapi.co/api/v2"
		this.POKEMON_INDIV_URL = `${this.BASE_URL}/pokemon/{id}`
		this.TYPE_INDIV_URL = `${this.BASE_URL}/type/{id}`

		// local urls
		this.BASE_URL_LOCAL = "http://localhost:3000/services"
		this.GET_USER_FAV_POKEMON = `${this.BASE_URL_LOCAL}/getfavourites`
		this.SAVE_USER_FAVE_POKEMON =`${this.BASE_URL_LOCAL}/savefavourites/{id}`

		// Content-type
		this.HEADER = {
			"Content-Type": "application/json"
		}

		// HTTP verbs
		this.METHODS = {
			"GET": "GET",
			"POST": "POST",
			"PUT": "PUT",
			"DELETE": "DELETE"
		}
	}
}


export default Constants;