# Environment manager

Environment manager for build tasks. 

[![npm version](https://badge.fury.io/js/env-manager.svg)](https://www.npmjs.com/package/env-manager)
[![Build Status](https://secure.travis-ci.org/ziflex/env-manager.svg?branch=master)](http://travis-ci.org/ziflex/env-manager)  

Creates environment variables for build tasks.
```env-manager``` will read environment name from passed parameter ```--env``` and will take particular file with environment variables.
For matching will be used default pattern - ```environment.{env}.json``` which can be overridden.


## Install

```sh

    $ npm install --save-dev env-manager

```

## Basic Usage

#### ./{gulp|grunt}file.js

```javascript
    
    var env = require('env-manager')({
        argv: process.argv
    });

```


### API

#### manager(options)   

#### options.dir
Type: `string`.  
Files lookup folder.    
Optional.  
Default ```__dirname```. 


#### options.base
Type: `string`.  
Base file with environment variables.  
If defined, base file will be extended with matched file.  
Optional.  

#### options.pattern
Type: `string`.  
File matching pattern based on arguments.  
Optional.  
Default ```environment.{env}.json```.    
