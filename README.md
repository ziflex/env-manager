# Environment manager

Environment manager for build tasks. 

[![npm version](https://badge.fury.io/js/env-manager.svg)](https://www.npmjs.com/package/env-manager)
[![Build Status](https://secure.travis-ci.org/ziflex/env-manager.svg?branch=master)](http://travis-ci.org/ziflex/env-manager)  

```env-manager``` will match file with environment variables based on passed arguments.


## Install

```sh

    $ npm install --save-dev env-manager

```

## Usage

### Basic

For example, we have these files with environment variables.

```sh
    
    root
      environment.dev.json  
      environment.test.json  
      environment.prod.json  

```

```javascript
    
    var env = require('env-manager')({
        argv: process.argv
    });

```
Running this command.

```sh

    npm run build -- --env dev

```

Will return a content from ```environment.dev.json```.

### Merge

In order to avoid boilerplate code we can define base `environment.json` with default values
and override them with values from matched file:

```sh
    
    root
      environment.json
      environment.dev.json  
      environment.test.json  
      environment.prod.json  

```

```javascript
    
    var env = require('env-manager')({
        argv: process.argv,
        base: 'environment.json'
    });

```

```sh

    npm run build -- --env dev

```

Will return a content from ```environment.json``` merged with ```environment.dev.json```.

### Custom pattern and directory

It's possible to define a custom match pattern and custom target directory.
Both of these options are independent.

```sh
    
    root
      environments
        linux
          dev.json
          prod.json
        windows
          dev.json
          prod.json

```

```javascript
    
    var path = require('path');
    var env = require('env-manager')({
        argv: process.argv,
        pattern: '{platform}/{env}.json',
        dir: path.join(__dirname, 'environments')
    });

```

```sh

    npm run build -- --env dev --platform linux

```

Will return a content from ```environments/linux/dev.json```.

## API

#### manager(options)   

#### options.argv
Type: `Array<string>`.  
Node arguments.  
Required.  

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
