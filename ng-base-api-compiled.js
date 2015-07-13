/**
 * BASE API FOR ANGULARJS APPS
 *
 * Created by rahpal<rahul.pal105@outlook.com> on 13-07-2015.
 */

'use strict';

angular.module('AngularJS.BaseApi', []).factory('BaseApiFactory', ['$http', '$q', function ($http, $q) {

    var api = {},
        _httpAjax = function _httpAjax(httpMethod, webApiMethod, id, query, postData, enableCache) {

        var deferred = $q.defer(),
            url = undefined,
            requestPayload = undefined;

        if (!!query && !query.startsWith('?')) {
            query = '?' + query;
        }

        url = webApiUrl + 'api/' + webApiMethod + (!!id ? '/' + id : '') + (query || '');

        requestPayload = {
            cache: !!enableCache,
            method: httpMethod,
            url: url,
            data: !!postData ? JSON.stringify(postData) : null,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(requestPayload).success(function (data, status, headers, config) {
            deferred.resolve(data);
        }).error(function (data, status, headers, config) {
            // do not reject the defer since we are redirecting the user to error page.
            deferred.reject(data);
        });

        return deferred.promise;
    };

    api.get = function (method, id, query) {
        var enableCache = arguments[3] === undefined ? false : arguments[3];

        return _httpAjax('GET', method, id, query, null, enableCache);
    };

    api.post = function (method, id, query, postData) {
        var enableCache = arguments[4] === undefined ? false : arguments[4];

        return _httpAjax('POST', method, id, query, postData, enableCache);
    };

    api.put = function (method, id, query, postData) {
        var enableCache = arguments[4] === undefined ? false : arguments[4];

        return _httpAjax('PUT', method, id, query, postData, enableCache);
    };

    api['delete'] = function (method, id, query) {
        var enableCache = arguments[3] === undefined ? false : arguments[3];

        return _httpAjax('DELETE', method, id, query, null, enableCache);
    };

    return api;
}]);

//# sourceMappingURL=ng-base-api-compiled.js.map