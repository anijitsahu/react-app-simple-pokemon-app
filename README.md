# react-app-simple-pokemon-app
A Simple Pokemon Application using [React JS](https://reactjs.org/docs/getting-started.html), a JavaScript library to make awesome UI by Facebook and [HTML5](https://www.w3schools.com/html/html5_intro.asp), [CSS3](https://www.w3schools.com/css/) and [Node JS](https://nodejs.org/docs/latest-v8.x/api/), [Express JS](https://expressjs.com/en/api.html) and [MongoDB](https://docs.mongodb.com/).

This application uses [React JS](https://reactjs.org/docs/getting-started.html) component oriented UI creation paradigm. All components are written in [JSX](https://reactjs.org/docs/jsx-in-depth.html) and ES6 style and are
combined to get a single build for production purpose using [Webpack 4](https://webpack.js.org/concepts/). For *error handling* [ComponentDidCatch](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html), the new feature of [React JS](https://reactjs.org/docs/getting-started.html) is added.

ES6 `module` creation along with `import /export` is used. [Babel](https://babeljs.io/docs/en/babel-preset-react) is used to *transpile* all [JSX](https://reactjs.org/docs/jsx-in-depth.html) code to vanilla JavaScript code. To install all the dependecies `npm` is used.

Back end is implemented using [Node JS](https://nodejs.org/docs/latest-v8.x/api/), [Express JS](https://expressjs.com/en/api.html) and [MongoDB](https://docs.mongodb.com/). [Atlas](https://www.mongodb.com/cloud/atlas), the *Cloud* version of [MongoDB](https://docs.mongodb.com/) is used.

For UI creation [HTML5](https://www.w3schools.com/html/html5_intro.asp) and [CSS3](https://www.w3schools.com/css/) are used. [Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout), the new feature of [CSS3](https://www.w3schools.com/css/) is used for layout creation purpose. Some of the [Fontawesome](https://fontawesome.com/) icons are added for aesthetic purpose.

This is a *responsive web application* for viewing in both Mobile and Desktop.


## Features
- This is just a Simple Pokemon Application
- It is a Full Stack Application 
- Listing of favourites pokemons are added

<ul>
  <li> <a href="https://facebook.com">Facebook login</a> is added </li>
  <li> User info from <a href="https://facebook.com">Facebook</a> is stored in database </li>
</ul>  

<ul>
  <li> Next Pokemons can be seen by clicking `>` button </li>
  <ul><li> Next button will not be shown when the last list of pokemons is reached </li></ul>
  <li> Previous Pokemons can be seen clicking `<` button </li>
  <ul><li>While loading the first list of pokemon previous button will not be there for obvious reason</li></ul> 
</ul>

<ul>
  <li> Pokemons can be searched by `name` or `type`</li>
  <ul>
    <li> Searching can be done from two places namely *All* and *Favourites* panel</li>
    <li>When no matching pokemon found an message would be shown</li>
  </ul>
 </ul>
  
 
 - All the favourite pokemons of a user are stored in the [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). This is a *free/ shared* account on [Atlas](https://www.mongodb.com/cloud/atlas). **So Please use it wisely**
 
 - For Promise call [`async / await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) is added
 
 <br>
 <ul>
  <li> This follows responsive web design paradigm </li>
  <li> Mobile view is supported </li>
  <li> All the favourites are stored in <a href="https://www.mongodb.com/cloud/atlas">MongoDB Atlas</a>. So All changes are <i>persistant</i> </li>
  <li> Pokemons are served from the <i>external</i> URL</li>
 </ul> 


## Installation

1. Clone the repository using `git clone https://github.com/anijitsahu/react-app-simple-pokemon-app.git` from `Git Bash / Command Prompt`
2. Navigate inside the directory by `cd react-app-simple-pokemon-app`
3. Install all the necessary dependecies by using `npm install` 
4. Navigate to the directory `server` by `cd server`
5. Run the Server by `node server.js`
5. Open a web browser and type `http://localhost:3000` in the address bar and hit `ENTER`
 
*tested with <img src="screenshots/chrome.png" width="20px" title="Google Chrome">Google Chrome v70 and <img src="screenshots/firefox.png" width="25px" title="Firefox Developer edition">Mozilla Firefox Developer Editon*  


## Screenshots

Some screens of the application is given below for better understanding. 

Desktop as well as Mobile version of the screenshots are given side by side.

<p> Login screen <br/> 
 <img src="screenshots/desktop 7.png" width="590px" title="Login screen"/>
 <img src="screenshots/mobile 7.png" width="190px" title="Login screen"/> 
</p>

<p> Login with Facebook <br/> 
 <img src="screenshots/desktop 8.png" width="590px" title="Login with Facebook screen"/>
 <img src="screenshots/mobile 8.png" width="190px" title="Login with Facebook screen"/> 
</p>

<p> Initial screen after login <br/> 
 <img src="screenshots/desktop 1.png" width="590px" title="Initial screen after login"/>
 <img src="screenshots/mobile 1.png" width="190px" title="Initial screen after login"/> 
</p>

<p> After clicking the next button <br/> 
 <img src="screenshots/desktop 2.png" width="590px" title="After clicking the next button screen"/>
 <img src="screenshots/mobile 2.png" width="190px" title="After clicking the next button screen"/> 
</p>

<p> Search Pokemon <br/> 
 <img src="screenshots/desktop 3.png" width="590px" title="Search Pokemon screen"/>
 <img src="screenshots/mobile 3.png" width="190px" title="Search Pokemon screen"/> 
</p>


<p> Pokemon Info <br/> 
 <img src="screenshots/desktop 4.png" width="590px" title="Pokemon Info screen"/>
 <img src="screenshots/mobile 4.png" width="190px" title="Pokemon Info screen"/> 
</p>


<p> Loading <br/> 
 <img src="screenshots/desktop 5.png" width="590px" title="Loading screen"/>
 <img src="screenshots/mobile 5.png" width="190px" title="Loading screen"/> 
</p>


<p> No Match Found <br/> 
 <img src="screenshots/desktop 6.png" width="590px" title="No Match Found screen"/>
 <img src="screenshots/mobile 6.png" width="190px" title="No Match Found screen"/> 
</p>

<p> Favourites pokemons <br/> 
 <img src="screenshots/desktop 9.png" width="590px" title="Favourites pokemons screen"/>
 <img src="screenshots/mobile 9.png" width="190px" title="Favourites pokemons screen"/> 
</p>

<p> Search within favourites <br/> 
 <img src="screenshots/desktop 10.png" width="590px" title="Search within favourites screen"/>
 <img src="screenshots/mobile 10.png" width="190px" title="Search within favourites screen"/> 
</p>

<p> Logout <br/> 
 <img src="screenshots/desktop 11.png" width="590px" title="Logout screen"/>
 <img src="screenshots/mobile 11.png" width="190px" title="Logout screen"/> 
</p>
