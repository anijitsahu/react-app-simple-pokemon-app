# react-app-simple-pokemon-app
A Simple Pokemon Application using [React JS](https://reactjs.org/docs/getting-started.html), a JavaScript library to make awesome UI by Facebook and [HTML5](https://www.w3schools.com/html/html5_intro.asp), [CSS3](https://www.w3schools.com/css/).

This application uses [React JS](https://reactjs.org/docs/getting-started.html) component oriented UI creation paradigm. All components are written in [JSX](https://reactjs.org/docs/jsx-in-depth.html) and ES6 style and are
combined to get a single build for production purpose using [Webpack 4](https://webpack.js.org/concepts/). For *error handling* [ComponentDidCatch](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html), the new feature of [React JS](https://reactjs.org/docs/getting-started.html) is added.

ES6 `module` creation along with `import /export` is used. [Babel](https://babeljs.io/docs/en/babel-preset-react) is used to *transpile* all [JSX](https://reactjs.org/docs/jsx-in-depth.html) code to vanilla JavaScript code. To install all the dependecies `npm` is used.

For UI creation [HTML5](https://www.w3schools.com/html/html5_intro.asp) and [CSS3](https://www.w3schools.com/css/) are used. [Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout), the new feature of [CSS3](https://www.w3schools.com/css/) is used for layout creation purpose. Some of the [Fontawesome](https://fontawesome.com/) icons are added for aesthetic purpose.

This is a *responsive web application* for viewing in both Mobile and Desktop.


## Features
- This is just a Simple Pokemon Application
- Next Pokemons can be seen by clicking `>` button
  - Next button will not be shown when the last image is reached
- Previous Pokemons can be seen clicking `<` button
  - While loading the first image previous button will not be there for obvious reason 
  
 <br>
 <ul>
  <li> This follows responsive web design paradigm </li>
  <li> Mobile view is supported </li>
  <li> No database / storage is there. So no changes are <i>persistant</i> </li>
  <li> Pokemons are served from the <i>external</i> URL</li>
 </ul> 


## Installation

1. Clone the repository using `git clone https://github.com/anijitsahu/react-app-simple-pokemon-app.git` from `Git Bash / Command Prompt`
2. Navigate inside the directory by `cd react-app-simple-pokemon-app`
3. Install all the necessary dependecies by using `npm install` (optional)
4. Navigate to the directory `dist`
5. Open `index.html` page in a web browser 
 
*tested with <img src="screenshots/chrome.png" width="20px" title="Google Chrome">Google Chrome v70 and <img src="screenshots/firefox.png" width="25px" title="Firefox Developer edition">Mozilla Firefox Developer Editon*  
