# webpack-starter

Webpack starter that includes ES6 and Scss.

## Setting up
First, install dependencies.

	npm i

## Usage

**The public folder needs to be on a server root directory in order to work properly.**

### Overview

Use the following entry points for your scripts and styles:
- **src/js/main.js**
- **src/scss/style.scss**

**index.html** is located in the **public** folder. Imports are already set up.

**src/js/App.js** contains a starter class and is instanciated by default in **main.js**.

**src/scss/style.scss** already includes two files located in the **essentials** folder: **variables.scss** and **main.scss**.

### Tips & tricks

If you need to call an asset file (image, font, etc) from your scss, create a dedicated folder in **src/scss** then refer to it like if you were in the **src/scss/style.scss** file (whatever where you actually are). For example:

    background-image: url('./images/yourImage.svg');

An asset file called from the HTML must be located in **public/theTypeOfAsset**. Example:

	<img alt="Your Image Called From HTML" src="images/yourImageCalledFromHTML.png">

In order for this to work, your site root **must** be at root of server. Example: *http://localhost:3000* is fine but *http://localhost/mySite/trunk* won't work.

## Run
#### Watch for development

	npm run dev

#### Build for production

	npm run prod

## Credits
This project is based on [sample-project](https://github.com/Hugotgot/sample-project) by [Hugotgot](https://github.com/Hugotgot).
