<div align="center">
  <br/>
  <h1><b> BnB-homes 🏠️🛠️</b></h1>
  <h4>BnB Homes is an app that allows users to view homes and reserve them for stays. It features a simple authentication and it is built with Rails and React (styled with Tailwind-CSS).
<a name="readme-top"></a>
</h4>

</div>

<!-- TABLE OF CONTENTS -->

# 📗 Table of Contents

- [📖 About the Project](#about-project)
  - [🛠 Built With](#built-with)
    - [Key Features](#key-features)
- [💻 Getting Started](#getting-started)
  - [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
- [:notebook: API Documentation](#api-docs)
- [👥 Authors](#authors)
- [🤝 Contributing](#contributing)
- [⭐️ Show your support](#support)
- [🙏 Acknowledgements](#acknowledgements)
- [📝 License](#license)

<!-- PROJECT DESCRIPTION -->

# 📖 [BnB-homes-Backend](https://github.com/peterdtitan/BnB-homes/tree/dev/server) <a name="about-project"></a> <a name="about-project"></a>

**BnB-homes Backend** is a Rails project which gives the API for the BnB-homes Frontend.

## 🛠 Built With <a name="built-with"></a>

This app is built with Ruby on Rails and Postgresql.

### Tech Stack <a name="tech-stack"></a>

> <li><a href="https://www.ruby-lang.org/en/">Ruby</a></li>
> <li><a href="https://rubyonrails.org/">Ruby on Rails</a></li>
> <li><a href="https://www.postgresql.org/">Postgresql</a></li>
> <li><a href="https://reactjs.org/">React</a></li>
> <li><a href="https://redux.js.org/">Redux</a></li>

<!-- Features -->

### Key Features <a name="key-features"></a>

- [x] Authentication
- [x] Authorization
- [x] CRUD

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## 💻 Getting Started <a name="getting-started"></a>

## To get a local copy up and running, follow these steps.

### Prerequisites

In order to run this project you need:

- Mac or PC
- Install Ruby
- Install Rails
- Install Postgresql
- Install npm
- Understanding of Ruby

### App Screenshot

![App](https://github.com/peterdtitan/BnB-homes/assets/92449229/3f50b422-a9d3-4ece-92fb-6b96543dd4a4)


### Initial State of Kanban Board

![kanban](https://user-images.githubusercontent.com/92449229/256266758-11cd96b1-b12c-4d0e-ab5d-d4fba7afd40f.png)

[Kanban](https://github.com/users/peterdtitan/projects/10)

### Setup

- Clone this repository to your desired folder:

```sh
   git clone https://github.com/peterdtitan/BnB-homes.git
```

- Navigate into the cloned folder

```sh
cd server
```

### Install

Install this project with the following:

```sh
  bundle install
```

- Set up the database and change the username and password of your Postgres account in

```sh
config/database.yml
```

```sh
rails db:create db:migrate db:seed
```

- Start the server

```sh
rails s
```

- Run the tests

```sh
rspec ./spec/models
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### :notebook: API Documentation <a name="api-docs"></a>

- Run the server with `rails s` command
- The open [API Documentation](https://localhost:3000/api-docs) in your browser.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



# 📖 [BnB-homes Front-End](https://github.com/peterdtitan/BnB-homes/tree/dev/server) <a name="about-project"></a> <a name="about-project"></a>

<b>BnB-homes</b> is a website where users can book a homes, cancel a booking. The user can also see the details of a homes.

## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>


<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://reactjs.org/">React.js</a></li>
    <li>Redux</li>
    <li>CSS</li>
  </ul>
</details>

<!-- GETTING STARTED -->

## 💻 Getting Started <a name="getting-started"></a>


To get a local copy up and running, follow these steps.

### Prerequisites

In order to run this project you need:
- [x] A web browser like Google Chrome.
- [x] A code editor like Visual Studio Code with Git and Node.js.

You can check if Git is installed by running the following command in the terminal.
```
$ git --version
```

Likewise for Node.js and npm for package installation.
```
$ node --version && npm --version
```
### Setup

Clone this repository using the GitHub link provided below.


### Install

In the terminal, go to your file directory and run this command.

```
$ git clone https://github.com/peterdtitan/BnB-homes.git
```

- Navigate into the cloned folder

```sh
cd client
```

```bash

$ npm install
```

### Usage


Kindly modify the files as needed.

In the project directory, you can run:
```
$ npm start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.

You may also see any lint errors in the console.



### Run tests

To run tests, run the following command:

- To Test:-

```bash
   npm test
```

- To check Styelint error:-

```bash
   npx stylelint "\*_/_.{css,scss}"
```

- To check Eslint error:-

```bash
   npx eslint "**/*.{js,jsx}"
```

- To check webhint error:-

```bash
  npx hint .
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- AUTHORS -->

## 👥 Authors <a name="authors"></a>

👤 **Peter Okorafor**

- GitHub: [@peterdtitan](https://github.com/peterdtitan)
- LinkedIn: [@Peter OKorafor](https://linkedin.com/in/peterokorafor)

👤 **Rishi Mishra**

- GitHub: [@Rishi Mishra]( https://github.com/Rishi-Mishra0704)
- LinkedIn: [@Rishi Mishra](https://www.linkedin.com/in/rishi-mishra-756718257/)


👤 **Santosh Konappanavar**

- GitHub: [@Santosh-Konappanavar](https://github.com/Santosh-Konappanavar/Portfolio-mobile-setup)
- LinkedIn: [@Santosh Konappanavar](https://www.linkedin.com/in/santosh-konappanavar/)


👤 **Karan Jain**

- GitHub: [@karanjain2212](https://github.com/karanjain2212)
- LinkedIn: [@karanjain2212](https://linkedin.com/in/karanjain2212)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/peterdtitan/BnB-homes/issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- SUPPORT -->

## ⭐️ Show your support <a name="support"></a>

If you like this project, please give a ⭐️

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGEMENTS -->

## 🙏 Acknowledgments <a name="acknowledgements"></a>

we would like to thank:

- [Murat Korkmaz](https://www.behance.net/muratk) for a beautiful, efficient, and accessible user interface [Design](https://www.behance.net/gallery/26425031/Vespa-Responsive-Redesign).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## 📝 License <a name="license"></a>

This project is [MIT](https://github.com/peterdtitan/BnB-homes/blob/dev/LICENSE) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
