# Environment manager

Environment manager for build tasks.

[![npm version](https://badge.fury.io/js/env-manager.svg)](https://www.npmjs.com/package/env-manager)
[![Build Status](https://secure.travis-ci.org/ziflex/env-manager.svg?branch=master)](http://travis-ci.org/ziflex/env-manager)  

```env-manager``` matches a file with environment variables based on passed arguments.


## Install

```sh

    $ npm install --save-dev env-manager

```

## Usage

### Basic

For example, we have these files with environment variables. (```.js``` files also can be used)

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

#### Config override

Alternatevley, you can override config values by passing new values via CLI arguments.

```json
{
  "name": "config",
  "version": "1.0.0",
  "server": {
      "endpoint": "/api",
      "port": 9090
  }
}
```

```sh

    npm run build -- --version 1.1.0-alpha.1 --server.port 9091

```

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
Process arguments.  
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

#### options.defaults  
Type: `object`.  
Default arguments.  
Optional.  

## License
The MIT License (MIT)    
Copyright (C) 2015 Tim Voronov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
