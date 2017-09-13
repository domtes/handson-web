# UX PowerTools for web applications

This project implements a live styleguide compatible with the [UXPT Sketch design project][1].

It is implemented using PUG and SASS and can be built using [Gulp][2] or [CodeKit][3].

## Instructions

The development server can be launched using Docker.
First, build the image:

    $ docker build -t uxpt .

This will build the *uxpt* docker image with Gulp and all the  dependencies.
Once the image has been built it can be run using the following:

    $ docker run --rm -it              \
      -p 3000:3000                     \
      -p 3001:3001                     \
      -v $(pwd)/src:/home/node/app     \
      -v $(pwd)/build:/home/node/build uxpt

Once the server starts open the browser at the ```http://DOCKER-HOST:3000``` address to see the live reloading preview.
Browser windows will be automatically reloaded when source files are updated.

On the **3001** port number is served the [Browser-sync](https://www.browsersync.io) management UI.


[1]: https://www.uxpower.tools/
[2]: https://gulpjs.com/
[3]: https://codekitapp.com/
