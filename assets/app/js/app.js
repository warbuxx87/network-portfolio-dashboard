var app = angular.module('proview', []);

app.filter('ceil', function() {
	return function(input) {
		return Math.ceil(input);
	};
});

app.controller('MainCtrl', ['$http', '$scope', function($http, $scope) {
	$scope.btc = []
	$scope.trades = []
	$scope.balance = []

	var upd_btc = function() {
		$http.get('https://btc.alkemi.ai/updates')
			.then(function(response) {
				$scope.btc = response.data;
				var buy_market = response.data.markets[0];
				var sell_market = response.data.markets[0];
				var total_volume = 0;
				for (var i = 1; i < response.data.markets.length; i++) {
					if (response.data.markets[i].buy_take < buy_market.buy_take)
						buy_market = response.data.markets[i];
					if (response.data.markets[i].sell_take > sell_market.sell_take)
						sell_market = response.data.markets[i];
				}
				for (var i = 0; i < response.data.markets.length; i++) {
					total_volume = total_volume + response.data.markets[i].volume;
				}
				$scope.btc.buy_market = buy_market;
				$scope.btc.sell_market = sell_market;
				$scope.btc.total_volume = total_volume;
				$scope.btc.margin = 0;
				if (buy_market.buy_take < sell_market.sell_take)
					$scope.btc.margin = sell_market.sell_take - buy_market.buy_take;
				setTimeout(upd_btc, 1500);
			})
			.catch(function() {
				setTimeout(upd_btc, 1500);
			});
	};

	var upd_eth = function() {
		$http.get('https://eth.alkemi.ai/updates')
			.then(function(response) {
				$scope.eth = response.data;
				var buy_market = response.data.markets[0];
				var sell_market = response.data.markets[0];
				var total_volume = 0;
				for (var i = 1; i < response.data.markets.length; i++) {
					if (response.data.markets[i].buy_take < buy_market.buy_take)
						buy_market = response.data.markets[i];
					if (response.data.markets[i].sell_take > sell_market.sell_take)
						sell_market = response.data.markets[i];
				}
				for (var i = 0; i < response.data.markets.length; i++) {
					total_volume = total_volume + response.data.markets[i].volume;
				}
				$scope.eth.buy_market = buy_market;
				$scope.eth.sell_market = sell_market;
				$scope.eth.total_volume = total_volume;
				$scope.eth.margin = 0;
				if (buy_market.buy_take < sell_market.sell_take)
					$scope.eth.margin = sell_market.sell_take - buy_market.buy_take;
				setTimeout(upd_eth, 1500);
			})
			.catch(function() {
				setTimeout(upd_eth, 1500);
			});
	};


	var upd_ltc = function() {
		$http.get('https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=USD')
			.then(function(response) {
				var ltc = response.USD;
				$scope.ltc.idx = ltc;
				setTimeout(upd_ltc, 1500);
			})
			.catch(function() {
				setTimeout(upd_ltc, 1500);
			});
	};


	var upd_trades = function() {
		var total_profit = 0;
		var total_trades = 0;
		var usd = 0;
		var btc = 0;
		$http.get('https://api.alkemi.ai')
			.then(function(response) {
				$scope.trades = response.data;
				for (var i = 0; i < response.data.bots.length; i++) {
					total_profit = total_profit + response.data.bots[i].profits;
				}
				for (var i = 0; i < response.data.exchanges.length; i++) {
					total_trades = total_trades + response.data.exchanges[i].total;
				}
				btc = $scope.trades.stats[0].btc;
				usd = $scope.trades.stats[0].usd;
				if (btc != 0) {
					$scope.balance.btc = btc;
				}
				if (usd != 0) {
					$scope.balance.usd = usd;
				}
				if (total_profit != 0) {
					$scope.trades.total_profit = total_profit;
				}
				if (total_trades) {
					$scope.trades.total_trades = total_trades;
				}
				setTimeout(upd_trades, 10000);
			})
			.catch(function() {
				setTimeout(upd_trades, 10000);
			});
	};

	$scope.getClass = function(value) {
		if ((typeof value) == "string" & value == "Buy") {
			return "green";
		}
		if ((typeof value) == "string" & value == "Sell") {
			return "red";
		}
		if ((typeof value) == "string") return "";
		if (value == 0) return "";
		return value > 0 ? 'green' : 'red';
	};

	var d = new Date();
	d = d.getDate();
	d = 48 - d;
	d = 30 - d;

	// days remaining in cycle
	$scope.d = d;
	// percent of cycle completed
	$scope.p = d * 3.33;


	upd_btc();
	upd_eth();
	upd_ltc();
	upd_trades();

	// need this functions and assignments after upd_trades is called
	//$scope.btcp = btc.idx
	//$scope.usdp =

	app.config(['RollbarProvider', function(RollbarProvider) {
		RollbarProvider.init({
			accessToken: "***REMOVED***",
			captureUncaught: true,
			payload: {
				environment: 'production'
			}
		});
	}]);
}]);
