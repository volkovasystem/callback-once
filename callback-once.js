!function(global,factory){if("function"==typeof define&&define.amd)define([],factory);else if("undefined"!=typeof exports)factory();else{factory(),global.callbackOnce={}}}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:this,(function(){"use strict";module.exports=function callbackOnce(callback){if("function"==typeof callback){if(callback.$callData instanceof WeakMap==1&&"function"==typeof callback.$callData.get(callback).$checkCallCount&&"function"==typeof callback.$callData.get(callback).$addCallCount)return callback;if(callback.$callData instanceof WeakMap==1)return Object.defineProperty(callback.$callData.get(callback),"$callCount",{value:0,configurable:!1,enumerable:!1,writable:!0}),Object.defineProperty(callback.$callData.get(callback),"$addCallCount",{value:function(){callback.$callData.get(callback).$callCount++},configurable:!1,enumerable:!1,writable:!1}),Object.defineProperty(callback.$callData.get(callback),"$checkCallCount",{value:function(){return callback.$callData.get(callback).$callCount<1},configurable:!1,enumerable:!1,writable:!1}),!0===Array.isArray(callback.$callData.get(callback).$effectList)&&callback.$callData.get(callback).$effectList.push((function(procedure,parameterList,result,scope){if(!1===callback.$callData.get(callback).$checkCallCount()){const callCount=callback.$callData.get(callback).$callCount;throw new Error(["cannot execute callback more than once","@call-count: "+callCount])}return callback.$callData.get(callback).$addCallCount(),result})),callback;{const delegateCallback=function delegateCallback(){let result=void 0;try{result=callback.apply(this,arguments)}catch(error){result=error}finally{return delegateCallback.$callData.get(delegateCallback).$callEffect(callback,arguments,result,this)}};return Object.defineProperty(delegateCallback,"$callData",{value:(new WeakMap).set(delegateCallback,{}),configurable:!1,enumerable:!1,writable:!1}),Object.defineProperty(delegateCallback.$callData.get(delegateCallback),"$callEffect",{value:function(procedure,parameterList,result,scope){return delegateCallback.$callData.get(delegateCallback).$effectList.map((function(effect){return effect(procedure,parameterList,result,scope)})).pop()},configurable:!1,enumerable:!1,writable:!1}),Object.defineProperty(delegateCallback.$callData.get(delegateCallback),"$effectList",{value:[],configurable:!1,enumerable:!1,writable:!1}),Object.defineProperty(delegateCallback.$callData.get(delegateCallback),"$callCount",{value:0,configurable:!1,enumerable:!1,writable:!0}),Object.defineProperty(delegateCallback.$callData.get(delegateCallback),"$addCallCount",{value:function(){delegateCallback.$callData.get(delegateCallback).$callCount++},configurable:!1,enumerable:!1,writable:!1}),Object.defineProperty(delegateCallback.$callData.get(delegateCallback),"$checkCallCount",{value:function(){return delegateCallback.$callData.get(delegateCallback).$callCount<1},configurable:!1,enumerable:!1,writable:!1}),delegateCallback.$callData.get(delegateCallback).$effectList.push((function(procedure,parameterList,result,scope){if(!1===delegateCallback.$callData.get(delegateCallback).$checkCallCount()){const callCount=delegateCallback.$callData.get(delegateCallback).$callCount;throw new Error(["cannot execute callback more than once","@call-count: "+callCount])}return delegateCallback.$callData.get(delegateCallback).$addCallCount(),result})),delegateCallback}}return callbackOnce((function(){}))}}));