/**
 * BASE API FOR ANGULARJS APPS
 *
 * Created by rahpal<rahul.pal105@outlook.com> on 13-07-2015.
 */

"use strict";

((angular, factory) => {

    if (typeof define === 'function' && define.amd) {
        define(['angular'], function (angular) {
            return factory(angular);
        });
    } else {
        return factory(angular);
    }
})(angular || null, (angular) => {

    angular.module('AngularJS.BaseApi', [])
        .factory('BaseApiFactory', ['$http', '$q', function ($http, $q) {

            let api = {},
                _httpAjax = (httpMethod, webApiMethod, id, query, postData, enableCache) =>  {

                    let deferred = $q.defer(),
                        url,
                        requestPayload;

                    if (!!query && !query.startsWith('?')) {
                        query = '?' + query;
                    }

                    url = webApiUrl + "api/" + webApiMethod + (!!id ? "/" + id : "") + (query || "");

                    requestPayload = {
                        cache: !!enableCache,
                        method: httpMethod,
                        url: url,
                        data: !!postData ? JSON.stringify(postData) : null,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    };

                    $http(requestPayload)
                        .success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            // do not reject the defer since we are redirecting the user to error page.
                            deferred.reject(data);
                        });

                    return deferred.promise;

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
        }]);

});

