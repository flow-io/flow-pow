/**
*
*	STREAM: pow
*
*
*	DESCRIPTION:
*		- Transform stream factory to exponentiate numeric data stream values according a specified power.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	HISTORY:
*		- 2014/07/27: Created. [AReines].
*
*
*	DEPENDENCIES:
*		[1] through2
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. athan@nodeprime.com. 2014.
*
*/

(function() {
	'use strict';

	// MODULES //

	var // Through2 module:
		through2 = require( 'through2' );


	// FUNCTIONS //

	/**
	* FUNCTION: onData( exponent )
	*	Returns a callback which performs exponentation.
	*
	* @private
	* @param {Number} exponent
	* @returns {Function} callback
	*/
	function onData( exponent ) {
		/**
		* FUNCTION: onData( newVal, encoding, clbk )
		*	Data event handler. Performs exponentation.
		*
		* @private
		* @param {Number} newVal - streamed data value
		* @param {String} encoding
		* @param {Function} clbk - callback to invoke after performing exponentiation. Function accepts two arguments: [ error, chunk ].
		*/
		return function onData( newVal, encoding, clbk ) {
			clbk( null, Math.pow( newVal, exponent ) );
		}; // end FUNCTION onData()
	} // end FUNCTION onData()


	// STREAM //

	/**
	* FUNCTION: Stream()
	*	Stream constructor.
	*
	* @constructor
	* @returns {Stream} Stream instance
	*/
	function Stream() {
		this._exponent = 1;
		return this;
	} // end FUNCTION Stream()

	/**
	* METHOD: exponent( value )
	*	Setter and getter for exponent. If a value is provided, sets the exponent. If no value is provided, returns the exponent.
	*
	* @param {Number} value - exponent
	* @returns {Stream|Number} Stream instance or exponent
	*/
	Stream.prototype.exponent = function( value ) {
		if ( !arguments.length ) {
			return this._exponent;
		}
		if ( typeof value !== 'number' || value !== value ) {
			throw new Error( 'exponent()::invalid input argument. Exponent must be numeric.' );
		}
		this._exponent = value;
		return this;
	}; // end METHOD exponent()

	/**
	* METHOD: stream()
	*	Returns a through stream for performing exponentiation.
	*
	* @returns {object} through stream
	*/
	Stream.prototype.stream = function() {
		return through2({'objectMode': true}, onData( this._exponent ) );
	}; // end METHOD stream()


	// EXPORTS //

	module.exports = function createStream() {
		return new Stream();
	};

})();