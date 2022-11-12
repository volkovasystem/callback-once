!function(f){"function"==typeof define&&define.amd?define(f):f()}((function(){"use strict";
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
*/const CALLBACK_ONCE=Symbol("callback-once"),CALLED=Symbol("called"),callbackOnce=function callbackOnce(callback){try{if("function"!=typeof callback)throw new Error(["#invalid-callback-parameter;","invalid callback parameter;","@callback:",`${callback};`]);if(!0===callback[CALLBACK_ONCE])return callback;if(!0===callback[CALLED])throw new Error(["#invalid-callback-parameter;","invalid callback parameter;","callback called;","@callback:",`${callback};`]);const{proxy:onceCallback,revoke:revokeCallback}=Proxy.revocable(callback,{apply:function apply(targetCallback,scope,parameterList){try{return targetCallback.apply(scope,parameterList)}finally{Object.defineProperty(targetCallback,CALLED,{value:!0,configurable:!1,enumerable:!1,writable:!1}),revokeCallback()}},get:function get(targetCallback,property,value,proxyCallback){return property===CALLBACK_ONCE||targetCallback[property]}});return Object.defineProperty(callback,"targetCallback",{value:callback,configurable:!1,enumerable:!1,writable:!1}),onceCallback}catch(error){throw new Error(["#cannot-callback-once;","cannot callback once;","cannot execute callback once;","@error-data:",`${error.stack};`])}};callbackOnce.configure=function configureCallbackOnce(option){return callbackOnce.bind(option)},module.exports=callbackOnce}));