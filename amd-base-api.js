/**
 * BASE API FOR AMD(Asyncronous Module Definition) loaders like RequireJS
 *
 * Created by rahulp on 13-07-2015.
 */

'use strict';

((factory) => {

    if(!requirejs && !requirejs.config) throw new Error("RequireJS is not loaded correctly...");; // Exit from here

    /* RequireJS Configuartion settings */
    requirejs.config({
        paths: {
            jquery: 'https://code.jquery.com/jquery-2.1.4.min.js'
        }
    });

    if (typeof define === 'function' && define.amd) {
        factory();
    } else {
        throw new Error("RequireJS is not loaded correctly...");
    }
})(()=>{
    define(['jquery'], ($) => {

        let api = {},
            _httpAjax = (httpMethod, webApiMethod, id, query, postData, enableCache) =>  {

                let deferred = $.Deferred(),
                    url,
                    requestPayload;

                if (!!query && !query.startsWith('?')) {
                    query = '?' + query;
                }

                url = webApiUrl + "api/" + webApiMethod + (!!id ? "/" + id : "") + (query || "");

                $.ajaxSetup({ cache: !!enableCache });

                var requestData = {
                    cache: !!enableCache,
                    url: url,
                    type: httpMethod,
                    data: !!postData ? JSON.stringify(postData) : null,
                    contentType: "application/json"
                };

                $.ajax(requestData).done(function (data) {
                    api.methods[webApiMethod] = api.methods[webApiMethod] || {};
                    api.methods[webApiMethod][(id || "") + (!!query ? "?" + query : "")] = data;
                    deferred.resolve(data);
                }).fail(function (err) {
                    deferred.reject(err);
                });

                return deferred.promise();

            };

        api.get = (method, id, query, enableCache = false) => {
            return _httpAjax('GET', method, id, query, null, enableCache);
        };

        api.post = (method, id, query, postData, enableCache = false) => {
            return _httpAjax('POST', method, id, query, postData, enableCache);
        };

        api.put = (method, id, query, postData, enableCache = false) => {
            return _httpAjax('PUT', method, id, query, postData, enableCache);
        };

        api.delete = (method, id, query, enableCache = false)=> {
            return _httpAjax('DELETE', method, id, query, null, enableCache);
        };

        return api;

    });
});