class Constants {
	constructor() {

		// URLs
		this.BASE_URL = "https://pokeapi.co/api/v2"
		this.POKEMON_INDIV_URL = `${this.BASE_URL}/pokemon/{id}`
		this.TYPE_INDIV_URL = `${this.BASE_URL}/type/{id}`


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