# Adopt a christmas tree

## Pre-requisite

- Docker

## Setup

- `sh setup.sh` from the root directory
- `sh start.sh` from the root directory
- Go to localhost:8080 to access the host SPA
- You can login with username `Santa` and password `Xmas`

## What is AdoptAChristmasTree ?

AdoptAChristmasTree is a mock e-commerce web application that was created as an example of a micro-frontend architecture.

It uses Webpack module federation plugin to properly import components from three different micro-frontends into a shell / host Single Page Application. It follows the main architecture principles developped in _Building Micro-Frontends_ by Luca Mezzalira

It is composed of the following items:

- A NestJs api `christmas-tree-api` that encapsulates all the routes needed for the project. In a real micro-service architecture, the different domain tree, user, payment should all be managed by different micro-services. As this project was originately designed as frontend architecture example, it was chosen to regroup all the routes in a single backend application.
- A React frontend app Host that manages the Layout for the widget based Catalog page and the routing between the pages
- A React micro-frontend Payment that exposes a ReservationButton and a ShoppingCart component.
- A React micro-frontend Tree that exposes a CatalogList and a CatalogItem component
- A Next micro-frontend User that exposes the LoginPage and the UserMenu

## Where to start ?

- Import of components from remote micro-frontends to host application => you can look at the webpack configuration files `webpack.config.js` for React micro-frontends / host and next.config.js for the Next user micro-frontend
- Communication between micro-frontend
  - Js Event => you can look at the interaction between the CatalogList (in tree Microfrontend) when an item in the list is clicked and the ReservationButton (in payment micro-frontend). The common event used by those two components is the SELECT_TREE_EVENT
  - Url => you can look at LoginForm component and redirection to the catalogPage
  - LocalStorage => you can look at the token management both in the LoginForm (writing in local storage) and userMenu (deleting from local storage)

## Shared files

The `<mfe-name>-shared` directory in each micro-frontend could be merged into a single shared library that exports the api client + the event keys to keep a good synchronization between the micro-frontend. In the interest of time this wasn't done in this demo

## Security Disclaimer

AdoptAChristmas Tree was developped as a plug and play example so it does not provide secrets or environment variables in a separate file. Also the authentication logic / Jwt token management is completely mocked and should never be copied for a production environment.

For this reason it is not recommended to use the backend part of this project as a boilerplate to developp a nestjs application.
