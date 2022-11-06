"use strict";

/*;
	@license:module:
		MIT License

		Copyright (c) 2020-present Richeve S. Bebedor <richeve.bebedor@gmail.com>

		@license:copyright:
			Richeve S. Bebedor

			<@license:year-range:2020-present;>

			<@license:contact-detail:richeve.bebedor@gmail.com;>
		@license:copyright;

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
	@license:module;
*/

const CALLBACK_ONCE = (
	Symbol( "callback-once" )
);

const CALLED = (
	Symbol( "called" )
);

const callbackOnce = (
	function callbackOnce( callback ){
		/*;
			@definition:
				@procedure:#callbackOnce
					@description:
						Single execution callback wrapper.
					@description;
				@procedure;

				@parameter:#callback
					@type:
							function
					@type;

					@description:
					@description;
				@parameter;

				@result:#result
					@type:
							function
					@type;

					@description:
					@description;
				@result;

				@trigger:#trigger
					@type:
							object:as:Error
					@type;

					@description:
					@description;

					@tag:#invalid-callback-parameter;
					@tag:#cannot-callback-once;
				@trigger;
			@definition;
		*/

		try{
			if(
					(
							typeof
							callback
						!=	"function"
					)
			){
				throw	(
							new	Error(
									(
										[
											"#invalid-callback-parameter;",

											"invalid callback parameter;",

											"@callback:",
											`${ callback };`
										]
									)
								)
						);
			}

			if(
					(
							callback[ CALLBACK_ONCE ]
						===	true
					)
			){
				return	(
							callback
						);
			}

			if(
					(
							callback[ CALLED ]
						===	true
					)
			){
				throw	(
							new	Error(
									(
										[
											"#invalid-callback-parameter;",

											"invalid callback parameter;",
											"callback called;",

											"@callback:",
											`${ callback };`
										]
									)
								)
						);
			}

			const	{
						proxy: onceCallback,
						revoke: revokeCallback
					}
				=	(
						Proxy
						.revocable(
							(
								callback
							),

							(
								{
									"apply": (
										function apply(
											targetCallback,
											scope,
											parameterList
										){
											try{
												return	(
															targetCallback
															.apply(
																(
																	scope
																),

																(
																	parameterList
																)
															)
														);
											}
											finally{
												Object.defineProperty(
													(
														targetCallback
													),

													(
														CALLED
													),

													(
														{
															"value": (
																true
															),

															"configurable": (
																false
															),

															"enumerable": (
																false
															),

															"writable": (
																false
															),
														}
													)
												);

												revokeCallback( );
											}
										}
									),

									"get": (
										function get(
											targetCallback,
											property,
											value,
											proxyCallback
										){
											if(
													(
															property
														===	CALLBACK_ONCE
													)
											){
												return	(
															true
														);
											}
											else{
												return	(
															targetCallback[ property ]
														);
											}
										}
									)
								}
							)
						)
					);

			Object.defineProperty(
				(
					onceCallback
				),

				(
					"target"
				),

				(
					{
						"value": (
							callback
						),

						"configurable": (
							false
						),

						"enumerable": (
							false
						),

						"writable": (
							false
						),
					}
				)
			);

			return	(
						onceCallback
					);
		}
		catch( error ){
			throw	(
						new	Error(
								(
									[
										"#cannot-callback-once;",

										"cannot callback once;",
										"cannot execute callback once;",

										"@error-data:",
										`${ error.stack };`
									]
								)
							)
					);
		}
	}
);

(
		module
		.exports
	=	(
			callbackOnce
		)
);
