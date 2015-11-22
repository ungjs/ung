# ung

A static resources manager.

[![Dependency Status](https://david-dm.org/ungjs/ung/status.svg?style=flat)](https://david-dm.org/ungjs/ung)
[![Build Status](http://img.shields.io/travis/ungjs/ung.svg?style=flat)](https://travis-ci.org/ungjs/ung)
[![npm version](https://badge.fury.io/js/ung.svg)](http://badge.fury.io/js/ung)


## Installation

```
npm install -g ung
```


## Creating an ung package

An ung package has to have a `package.json` in its root directory. The ung specific
options should be in the `"ungConfig"` section of the json file. The available options are:

* `src` - the directory which will contain the bundled resources. The bundled resources
are pushed to the [ung server][]. The default value is `./dist`.
* `bundle` - an array of commands that bundle the package.
* `registry` - the URL address of the [ung server][]. The default value is `http://localhost:9595`

Here is an example of a `package.json` file of an ung package:

```js
{
  "name": "foo",
  "version": "1.0.0",
  "ungConfig": {
    "src": "./dist",
    "bundle": [
      "rm -rf dist",
      "gulp build"
    ],
    "registry": "http://localhost:9595"
  }
}
```


## Commands

* [ung publish](#ung-publish)
* [ung push](#ung-push)


### ung publish

Packs and sends the package to the ung server.


### ung push

Adds a package to a reference.

Usage Example:

```
ung push main.js foo@3.21.2
```

This command adds the `3.21.2` version of the `foo` package to the `main.js`
reference.

In order to remove a package from a reference the `:` character has to be added
before the package name:

```
ung push main.js :foo
```

This command will remove the `foo` package from the `main.js` reference.


## License

The MIT License (MIT)


[ung server]: https://github.com/ungjs/ung-server
