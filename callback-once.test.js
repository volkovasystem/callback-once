"use strict";

const assert = require( "assert" );

const strictAssert = assert.strict;

const callbackOnce = require( "./callback-once.js" );

(
	function( ){
		const testCallback = (
			callbackOnce(
				function testCallback( ){
					return	true;
				}
			)
		);

		strictAssert
		.equal(
			(
				testCallback( )
			),
			(
				true
			),
			(
				"Test callback procedure must return true."
			)
		);

		strictAssert
		.throws(
			(
				testCallback
			),
			(
				/\#callback\-called\-more\-than\-once\;/
			),
			(
				"Test callback must throw Error#callback-called-more-than-once;"
			)
		);
	}
)( );
