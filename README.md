flow-pow
========

Transform stream factory to exponentiate numeric data stream values according a specified power.


## Installation

``` bash
$ npm install flow-pow
```

## API

To create a stream factory,

``` javascript
var powerStream = require( 'flow-pow' );

// Create a new factory:
var pStream = powerStream();
```

### pStream.exponent( [value] )

This method is a setter/getter. If no `value` is provided, returns the configured `exponent`; default is `1`. To set the `exponent`,

``` javascript
pStream.exponent( 3 );
```

### pStream.stream()

To create a new power stream,

``` javascript
var stream = pStream.stream();
```


## Usage

Methods are chainable.

``` javascript
powerStream()
	.exponent( 3 )
	.stream()
	.pipe( /* writable stream */ );
```


## Examples

``` javascript
var eventStream = require( 'event-stream' ),
	pStream = require( 'flow-pow' );

// Create some data...
var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round(Math.random()*10);
}

// Create a readable stream:
var readStream = eventStream.readArray( data );

// Create a new power stream:
var stream = pStream()
	.exponent( 3 )
	.stream();

// Pipe the data:
readStream.pipe( stream )
	.pipe( eventStream.map( function( d, clbk ) {
		clbk( null, d.toString()+'\n' );
	}))
	.pipe( process.stdout );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions.

Assuming you have installed Mocha, execute the following command in the top-level application directory to run the tests:

``` bash
$ mocha
```

All new feature development should have corresponding unit tests to validate correct functionality.


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.

