# ung

A static resources manager.

[![Dependency Status](https://david-dm.org/zkochan/ung/status.svg?style=flat)](https://david-dm.org/zkochan/ung)
[![Build Status](http://img.shields.io/travis/zkochan/ung.svg?style=flat)](https://travis-ci.org/zkochan/ung)
[![npm version](https://badge.fury.io/js/ung.svg)](http://badge.fury.io/js/ung)


## Installation

```
$ npm install -g ung
```


## Commands

Available generators:

* [ung pack](#ung-pack)
* [ung publish](#ung-publish)
* [ung serve](#ung-serve)


### ung pack

Builds and packs the project in the current working directory for the give environment. Ung uses the configurations specified in the `ung.json` file to build the project.

Example of packing a project for production:
```bash
ung pack prod
```

This command will pack build and pack the project into a file called `foo-prod.tar.gz`.


### ung publish

Sends the packed project to the ung server.

Example of publishing to production:
```bash
ung publish prod
```

This command will send the packed project to the endpoint specified in `ung.json` for production. It will also remove the packed project from the file system.


### ung serve

Starts an ung server that can host static packages and has an endpoint for receiving new packages.

Example:
```bash
ung serve
```


##License

The MIT License (MIT)
