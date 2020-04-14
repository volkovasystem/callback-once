"use strict";

/*;
	@module-license:
		MIT License

		Copyright (c) 2020 Richeve S. Bebedor <richeve.bebedor@gmail.com>
		@copyright: Richeve S. Bebedor <@year: 2020> <@contact: richeve.bebedor@gmail.com>

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license
*/

const callbackOnce = (
	function callbackOnce( callback ){
		/*;
			@parameter-definition:
				{
					"callback": "[@type: function]"
				}
			@end-parameter-definition

			@result-definition:
				{
					"result": "[@type: function]"
				}
			@end-result-definition
		*/

		if(
				typeof
				callback
			==	"function"
		){
			if(
					(
							(
											callback
											.$callData
								instanceof	WeakMap
							)
						===	true
					)

				&&	(
							typeof
							(
								callback
								.$callData
								.get(
									callback
								)
							)
							.$checkCallCount
						==	"function"
					)

				&&	(
							typeof
							(
								callback
								.$callData
								.get(
									callback
								)
							)
							.$addCallCount
						==	"function"
					)
			){
				return	callback;
			}
			else{
				const delegateCallback = (
					function delegateCallback( ){
						try{
							if(
									(
										delegateCallback
										.$callData
										.$checkCallCount( )
									)
								>	1
							){
								throw	(
											new	Error(
													[
														"cannot execute callback more than once",

														`@call-count: ${ delegateCallback.$callData.$callCount }`
													]
												)
										);
							}
							else{
								delegateCallback
								.$callData
								.$addCallCount( );
							}

							return	(
										callback
										.apply(
											this,
											arguments
										)
									);
						}
						finally{
							callback = undefined;
						}
					}
				);

				Object
				.defineProperty(
					delegateCallback,

					"$callData",

					{
						"value": (
							(
								new	WeakMap( )
							)
							.set(
								delegateCallback,

								{ }
							)
						),

						"configurable": false,
						"enumerable": false,
						"writable": false
					}
				);

				Object
				.defineProperty(
					(
						delegateCallback
						.get(
							delegateCallback
						)
					),

					"$callCount",

					{
						"value": 0,

						"configurable": false,
						"enumerable": false,
						"writable": true
					}
				);

				Object
				.defineProperty(
					(
						delegateCallback
						.$callData
						.get(
							delegateCallback
						)
					),

					"$addCallCount",

					{
						"value": (
							function addCallCount( ){
								(
									delegateCallback
									.$callData
									.get(
										delegateCallback
									)
								)
								.$callCount++;
							}
						),

						"configurable": false,
						"enumerable": false,
						"writable": false
					}
				);

				Object
				.defineProperty(
					(
						delegateCallback
						.$callData
						.get(
							delegateCallback
						)
					),

					"$checkCallCount",

					{
						"value": (
							function $checkCallCount( ){
								return	(
											(
												delegateCallback
												.$callData
												.get(
													delegateCallback
												)
											)
											.$callCount
										);
							}
						),

						"configurable": false,
						"enumerable": false,
						"writable": false
					}
				);

				return	delegateCallback;
			}
		}
		else{
			return	(
						callbackOnce(
							function callback( ){
								return	undefined
							}
						)
					);
		}
	}
);

module.exports = callbackOnce;
