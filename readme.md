<h1 align="center">
	<img src="https://github.com/zotovY/movieman-web/blob/main/.github/logo.png?raw=true" height="100px" />
	<br/>
	Movieman
</h1>


Service where you can write a review for your favourite movies, discuss with a moviegoer and find a great movie for your
rest

![Movieman preview](https://github.com/zotovY/movieman-web/blob/main/.github/preview.png?raw=true)

### Available commands

- ``start`` run next.js server
- ``build`` build project
- ``dev`` run next.js server in dev mode
- ``test`` run unit tests
- ``storybook`` start storybook server
- ``build-storybook`` build storybook documentation

### Start locally

- Setup [API server](https://github.com/zotovY/movieman-server)
- Clone repository
  ```bash
  git clone https://github.com/zotovY/movieman-web
  ```
- Install all dependencies
  ```bash
  yarn
  ``` 
- Create ``security`` folder in root and put your SSL certificates in
   ```bash
    security/cert.cert # your certificate
    security/cert.key  # key for your certificate 
   ```
- Run server with ``yarn start`` or ``yarn dev``


### Technologies used 
 - [Next.JS](https://nextjs.org/) & [React](https://reactjs.org/) as main frameworks
 - [Redux](https://redux.js.org/) – state manager with addons like [react-redux](), [redux-thunk](https://github.com/reduxjs/redux-thunk), [@reduxjs/toolkit](https://github.com/reduxjs/redux-toolkit)
 - [Typescript](https://www.typescriptlang.org/)  – programming language
 - [Styled components](https://github.com/styled-components/styled-components) – styling tool
 - [Formik](https://github.com/formium/formik) – tool for building forms
 - [Framer motion](https://www.framer.com/motion/) for animations
 - [Storybook](https://storybook.js.org/) – documentation tool
 - [Jest](https://github.com/facebook/jest) – testing tool
 - [react-toastify](https://github.com/fkhadra/react-toastify), [react-responsive-carousel](https://github.com/leandrowd/react-responsive-carousel), [react-loading-skeleton](https://github.com/dvtng/react-loading-skeleton) for UI

### Contribution
Do you like this project? Want to contribute and make it cooler? 
You can easily do it! First, check 
[contribution.md](https://github.com/zotovY/movieman-web/blob/main/contribution.md). 
Here you can find instructions that can help to build this project. 

### Author
This project was build by [Yaroslav Zotov](https://linkup.zotov.dev/zotovy).

