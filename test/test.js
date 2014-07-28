
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Test utilities:
	utils = require( './utils' ),

	// Module to be tested:
	powerStream = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'flow-pow', function tests() {
	'use strict';

	it( 'should export a factory function', function test() {
		expect( powerStream ).to.be.a( 'function' );
	});

	it( 'should provide a method to set/get the exponent', function test() {
		var pStream = powerStream();
		expect( pStream.exponent ).to.be.a( 'function' );
	});

	it( 'should set the exponent', function test() {
		var pStream = powerStream();
		pStream.exponent( 100 );
		assert.strictEqual( pStream.exponent(), 100 );
	});

	it( 'should not allow a non-numeric exponent', function test() {
		var pStream = powerStream(),
			values = [
				'5',
				[],
				{},
				null,
				undefined,
				NaN,
				false,
				function(){}
			];
		
		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}

		function badValue( value ) {
			return function() {
				pStream.exponent( value );
			};
		}
	});

	it( 'should provide a default behavior of having exponent equal to 1', function test( done ) {
		var data, expected, pStream, EXP = 1;

		// Simulate some data...
		data = [ 1,2,3,4,5 ];

		// Expected values:
		expected = [ 1,2,3,4,5 ];

		// Create a new power stream:
		pStream = powerStream()
			.exponent( EXP )
			.stream();

		// Mock reading from the stream:
		utils.readStream( pStream, onRead );

		// Mock piping a data to the stream:
		utils.writeStream( data, pStream );

		return;

		/**
		* FUNCTION: onRead( error, actual )
		*	Read event handler. Checks for errors and compares streamed data to expected data.
		*/
		function onRead( error, actual ) {
			expect( error ).to.not.exist;

			for ( var i = 0; i < expected.length; i++ ) {
				assert.strictEqual(
					actual[ i ],
					expected[ i ]
				);
			}
			done();
		} // end FUNCTION onRead()
	});

	it( 'should exponentiate piped data initialized with an arbitrary exponent', function test( done ) {
		var data, expected, pStream, EXP = 3;

		// Simulate some data...
		data = [ 1,2,3,4,5 ];

		// Expected values:
		expected = [ 1,8,27,64,125 ];

		// Create a new power stream:
		pStream = powerStream()
			.exponent( EXP )
			.stream();

		// Mock reading from the stream:
		utils.readStream( pStream, onRead );

		// Mock piping a data to the stream:
		utils.writeStream( data, pStream );

		return;

		/**
		* FUNCTION: onRead( error, actual )
		*	Read event handler. Checks for errors and compares streamed data to expected data.
		*/
		function onRead( error, actual ) {
			expect( error ).to.not.exist;

			for ( var i = 0; i < expected.length; i++ ) {
				assert.strictEqual(
					actual[ i ],
					expected[ i ]
				);
			}
			done();
		} // end FUNCTION onRead()
	});

});