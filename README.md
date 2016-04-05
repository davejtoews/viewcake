# Viewcake

An interactive presentation framework.

## Requires

* [NPM](https://www.npmjs.com)
* [Bower](http://bower.io)
* [MongoDB](https://www.mongodb.org)

## Installation

Clone repository then run

    npm install
    bower install

## Start

Make sure MongoDB is running, then from the root directory run

    npm start


##  Build tools

Default `gulp` task will build Sass and front end js and jsx. `gulp watch` will watch for changes. See gulpfile for subtasks.

## Views

* Presenter: *base.url/presentation/presenter*
* Viewer: *base.url/presentation/*
* Stagehand: *base.url/presentation/stagehand*

## API

    base.url/api/presentations
    base.url/api/views

See [Feathers API Docs](http://feathersjs.com/docs/)

Use [Postman](https://www.getpostman.com) to input data. Put POST data in request body, make sure **x-www-form-urlencoded** is selected

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).
