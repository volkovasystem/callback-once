"use strict";

//;	@code-space:template-engine:
const assert = require( "assert" );
const util = require( "util" );

const strictAssert = (
	assert
	.strict
);

//;	@procedure:check-directory:
const checkDirectory = (
	async	function checkDirectory( directoryPath ){
					const fs = require( "fs" );
					const path = require( "path" );

					const fsAsync = (
						fs
						.promises
					);

					(
							directoryPath
						=	(
								path
								.resolve(
									(
										directoryPath
									)
								)
							)
					);

					try{
						return	(
									(
										await	fsAsync
												.stat(
													(
														directoryPath
													)
												)
									)
									.isDirectory( )
								);
					}
					catch( error ){
						return	(
									false
								);
					}
			}
);
//;	@procedure:check-directory;

//;	@procedure:check-file:
const checkFile = (
	async	function checkFile( filePath ){
					const fs = require( "fs" );
					const path = require( "path" );

					const fsAsync = (
						fs
						.promises
					);

					(
							filePath
						=	(
								path
								.resolve(
									(
										filePath
									)
								)
							)
					);

					try{
						return	(
									(
										await	fsAsync
												.stat(
													(
														filePath
													)
												)
									)
									.isFile( )
								);
					}
					catch( error ){
						return	(
									false
								);
					}
			}
);
//;	@procedure:check-file;

//;	@procedure:get-directory-file-list:
const getDirectoryFileList = (
	async	function getDirectoryFileList( directoryPath ){
				const fs = require( "fs" );
				const path = require( "path" );

				const fsAsync = (
					fs
					.promises
				);

				(
						directoryPath
					=	(
							path
							.resolve(
								(
									directoryPath
								)
							)
						)
				);

				try{
					return	(
								await	fsAsync
										.readdir(
											(
												directoryPath
											),

											(
												{
													"withFileTypes": (
														true
													)
												}
											)
										)
							);
				}
				catch( error ){
					return	(
								[ ]
							);
				}
			}
);
//;	@procedure:get-directory-file-list;

//;	@procedure:execute-shell-script:
const executeShellScript = (
	async	function executeShellScript( shellScript, moduleDirectoryPath ){
				const childProcess = require( "child_process" );
				const path = require( "path" );

				const execAsync = (
					util
					.promisify(
						(
							childProcess
							.exec
						)
					)
				);

				if(
						(
								typeof
								moduleDirectoryPath
							==	"string"
						)

					&&	(
								moduleDirectoryPath
								.length
							>	0
						)
				){
					(
							moduleDirectoryPath
						=	(
								path
								.resolve(
									(
										moduleDirectoryPath
									)
								)
							)
					);
				}
				else{
					(
							moduleDirectoryPath
						=	(
								process
								.cwd( )
							)
					);
				}

				try{
					const	{
								stdout,
								stderr
							}
						=	(
								await	execAsync(
											(
												shellScript
											),

											(
												{
													"cwd": (
														moduleDirectoryPath
													)
												}
											)
										)
							);

					return	(
								{
									"outputLog": (
										stdout
										.trim( )
									),

									"errorLog": (
										stderr
										.trim( )
									)
								}
							);
				}
				catch( error ){
					return	(
								{
									"error": (
										util
										.inspect(
											(
												error
											)
										)
									)
								}
							);
				}
			}
);
//;	@procedure:execute-shell-script;

//;	@procedure:setup-test-directory:
const SETUP_TEST_DIRECTORY = (
	async	function SETUP_TEST_DIRECTORY( ){
				const shellParameterList = (
					process
					.argv
				);

				const DISABLE_SETUP_TEST_DIRECTORY_SHELL_PARAMETER = (
					"--disableSetupTestDirectory"
				);

				const DISABLE_SETUP_TEST_DIRECTORY_SHORT_SHELL_PARAMETER = (
					"--xstd"
				);

				const disableSetupTestDirectory = (
						(
								shellParameterList
								.includes(
									(
										DISABLE_SETUP_TEST_DIRECTORY_SHELL_PARAMETER
									)
								)
							===	true
						)

					||	(
								shellParameterList
								.includes(
									(
										DISABLE_SETUP_TEST_DIRECTORY_SHORT_SHELL_PARAMETER
									)
								)
							===	true
						)
				);

				if(
						(
								disableSetupTestDirectory
							===	true
						)
				){
					return	(
								true
							);
				}

				return	(
							await	executeShellScript(
										(
											"mkdir .test || true"
										)
									)
						);
			}
);
//;	@procedure:setup-test-directory;

//;	@procedure:clean-test-directory:
const CLEAN_TEST_DIRECTORY = (
	async	function CLEAN_TEST_DIRECTORY( ){
				const shellParameterList = (
					process
					.argv
				);

				const DISABLE_CLEAN_TEST_DIRECTORY_SHELL_PARAMETER = (
					"--disableCleanTestDirectory"
				);

				const DISABLE_CLEAN_TEST_DIRECTORY_SHORT_SHELL_PARAMETER = (
					"--xctd"
				);

				const disableCleanTestDirectory = (
						(
								shellParameterList
								.includes(
									(
										DISABLE_CLEAN_TEST_DIRECTORY_SHELL_PARAMETER
									)
								)
							===	true
						)

					||	(
								shellParameterList
								.includes(
									(
										DISABLE_CLEAN_TEST_DIRECTORY_SHORT_SHELL_PARAMETER
									)
								)
							===	true
						)
				);

				if(
						(
								disableCleanTestDirectory
							===	true
						)
				){
					return	(
								true
							);
				}

				return	(
							await	executeShellScript(
										(
											"rm -rfv .test || true"
										)
									)
						);
			}
);
//;	@procedure:clean-test-directory;
//;	@code-space:template-engine;

const callbackOnce = (
	require( "./callback-once.js" )
);

const TEST_CALLBACK_ONCE = (
	function TEST_CALLBACK_ONCE( ){
		try{
			const testCallback = (
				callbackOnce(
					function testCallback( value ){
						return	(
									value
								);
					}
				)
			);

			const actualValue = (
				testCallback(
					(
						true
					)
				)
			);

			const testValue = (
				true
			);

			strictAssert
			.equal(
				(
					actualValue
				),

				(
					testValue
				),

				(
					[
						"#test-sample-unit;",

						"test sample unit;",

						`must return, ${ testValue };`
					]
				)
			);

			return	(
						true
					);
		}
		catch( error ){
			console
			.error(
				(
					error
				)
			);

			return	(
						false
					);
		}
	}
);

const TEST_CALLBACK_ONCE_ERROR = (
	function TEST_CALLBACK_ONCE_ERROR( ){
		try{
			const testCallback = (
				callbackOnce(
					function testCallback( value ){
						return	(
									value
								);
					}
				)
			);

			testCallback(
				(
					true
				)
			);

			const testValue = (
				TypeError
			);

			strictAssert
			.throws(
				(
					testCallback
				),

				(
					testValue
				),

				(
					[
						"#test-callback-once-error;",

						"test callback once error;",

						`must throw, ${ testValue };`
					]
				)
			);

			return	(
						true
					);
		}
		catch( error ){
			console
			.error(
				(
					error
				)
			);

			return	(
						false
					);
		}
	}
);

(
	async	function TEST_SCENE_BASIC( ){
				(
					await	CLEAN_TEST_DIRECTORY( )
				);

				console
				.table(
					(
						[
							{
								"test": (
									"test callback once"
								),

								"result": (
									TEST_CALLBACK_ONCE( )
								)
							},

							{
								"test": (
									"test callback once error"
								),

								"result": (
									TEST_CALLBACK_ONCE_ERROR( )
								)
							}
						]
					)
				);

				(
					await	CLEAN_TEST_DIRECTORY( )
				);
			}
)( );
