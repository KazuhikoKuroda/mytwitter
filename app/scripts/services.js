'use strict';

function twitterService($q) {
	var authResult = false;
	return {
		initialize: function() {
			// OAuth の公開キーを設定する。
			OAuth.initialize('JNxnfqtFp1IILAedYNeNybsLalI', {
				cache: true
			});
			authResult = OAuth.create('twitter');
		},
		isReady: function() {
			return authResult;
		},
		connectTwitter: function() {
			var deferred = $q.defer();
			OAuth.popup('twitter').done(function(result) {
				authResult = result;
				deferred.resolve();
			});
			return deferred.promise;
		},
		clearCache: function() {
			OAuth.clearCache('twitter');
			authResult = false;
		},
		getLatestTweets: function() {
			var deferred = $q.defer(),
				url = '/1.1/statuses/home_timeline.json';

			authResult.get(url)
				.done(function(result) {
					deferred.resolve(result);
				})
				.fail(function(err) {
					deferred.reject(err);
				});
			return deferred.promise;
		},
		getMe: function() {
			var deferred = $q.defer();

			authResult.me()
				.done(function(result) {
					deferred.resolve(result);
				})
				.fail(function(err) {
					deferred.reject(err);
				});
			return deferred.promise;
		},
		getUserTimeline: function() {
			var deferred = $q.defer(),
				url = '/1.1/statuses/user_timeline.json';

			authResult.get(url)
				.done(function(result) {
					deferred.resolve(result);
				})
				.fail(function(err) {
					deferred.reject(err);
				});
			return deferred.promise;
		},
		postTweet: function(message) {
			var deferred = $q.defer(),
				url = '/1.1/statuses/update.json',
				params = {
					data: {
						status: message
					}
				};

			authResult.post(url, params)
				.done(function(result) {
					deferred.resolve(result);
				}).fail(function(err) {
					deferred.reject(err);
				});
			return deferred.promise;
		}
	};
}

angular.module('mytwitterApp.services', [])
	.factory('twitterService', twitterService);