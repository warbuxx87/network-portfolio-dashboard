//== Class definition

var DatatableChildRemoteDataBot = function() {
	//== Private functions

	// demo initializer
	var bot = function() {

		var datatable = $('#m_datatable_bots').mDatatable({
			// datasource definition
			data: {
				type: 'remote',
				source: {
					read: {
						url: 'https://api.alkemi.ai/bots',
						method: 'GET',
					},
				},
				pageSize: 10, // display 10 records per page
				//serverPaging: false,
				//serverFiltering: false,
				//serverSorting: false,
			},

			// layout definition
			layout: {
				theme: 'default',
				scroll: false,
				height: null,
				footer: false,
			},

			// column sorting
			sortable: true,

			pagination: true,

			detail: {
				title: 'Load sub table',
				content: subTableInit,
			},

			search: {
				input: $('#generalSearch'),
			},

			// columns definition
			columns: [{
					field: 'OrderId',
					title: '',
					sortable: false,
					width: 20,
					textAlign: 'center',
				}, {
					field: 'Exchange',
					title: 'Exchange',
					sortable: false,
					width: 75,
					textAlign: 'center',
					// callback function support for column rendering
					template: function(row) {
						var status = {
							'USD': {
								'title': 'Bitstamp',
							},
							'USDT': {
								'title': 'Binance',
							},
						};
						return '<span>' + status[row.Pair.SecondaryCurrency].title + '</span>';
					},
				}, {
					field: 'OrderTypeAsString',
					title: 'Type',
					width: 40,
					textAlign: 'center',
					// callback function support for column rendering
					template: function(row) {
						var status = {
							'Buy': {
								'title': 'Buy',
								'class': ' m-badge--primary'
							},
							'Sell': {
								'title': 'Sell',
								'class': ' m-badge--brand'
							},
						};
						return '<span class="m-badge ' + status[row.OrderTypeAsString].class + ' m-badge--wide">' + status[row.OrderTypeAsString].title + '</span>';
					},
				}, {
					field: 'Amount',
					title: 'Size',
					width: 40,
					textAlign: 'center',
				}, {
					field: 'Pair.PrimaryCurrency',
					title: 'Pair',
					width: 40,
				}, {
					field: 'Price',
					title: 'Price',
					width: 60,
					textAlign: 'center',
				}, {
					field: 'FeePercentage',
					title: 'Fee %',
					textAlign: 'center',
					responsive: {
						hidden: 'md',
					},
				}, {
					field: 'FeeCosts',
					title: 'Fee',
					width: 50,
					textAlign: 'center',
				}, {
					field: 'Profits',
					title: 'Profit',
					width: 40,
					textAlign: 'center',
				}, {
					field: 'Notes',
					title: 'Unique',
					width: 0,
					responsive: {
						hidden: 'md',
					},
				},
				{
					field: 'OrderStatus',
					title: 'Status',
					responsive: {
						hidden: 'md'
					},
					// callback function support for column rendering
					template: function(row) {
						var status = {
							'Timeout': {
								'title': 'Timeout',
								'state': 'warning'
							},
							'Canceled': {
								'title': 'Canceled',
								'state': 'danger'
							},
							'Completed': {
								'title': 'Completed',
								'state': 'accent'
							},
						};
						return '<span class="m-badge m-badge--' + status[row.OrderStatus].state + ' m-badge--dot"></span>&nbsp;<span class="m--font-bold m--font-' + status[row.OrderStatus].state + '">' +
							status[row.OrderStatus].title + '</span>';
					},
				}, {
					field: 'AddedTime',
					title: 'Date',
					sortable: 'desc',
					width: 160,
					// callback function support for column rendering
					template: function(row) {
						return row.AddedTime.substring(0, 10) + ' ' + row.AddedTime.substring(11, 19);
					},
				},
			],
		});

		function subTableInit(e) {
			$('<div/>').attr('id', 'child_data_ajax_' + e.data.RecordID).appendTo(e.detailCell).mDatatable({
				data: {
					type: 'remote',
					source: {
						read: {
							url: 'https://api.alkemi.ai/bots',
							request: 'GET',
							headers: {
								'x-my-custom-header': 'some value',
								'x-test-header': 'the value'
							},
							params: {
								// custom query params
								query: {
									generalSearch: '',
									CustomerID: e.data.RecordID,
								},
							},
						},
					},
					pageSize: 10,
					serverPaging: true,
					serverFiltering: false,
					serverSorting: true,
				},

				// layout definition
				layout: {
					theme: 'default',
					scroll: true,
					height: 300,
					footer: false,

					// enable/disable datatable spinner.
					spinner: {
						type: 1,
						theme: 'default',
					},
				},

				sortable: true,

				// columns definition
				columns: [{
						field: 'OrderId',
						title: '',
						sortable: false,
						width: 20,
						textAlign: 'center',
					}, {
						field: 'Exchange',
						title: 'Exchange',
						sortable: false,
						width: 75,
						textAlign: 'center',
						// callback function support for column rendering
						template: function(row) {
							var status = {
								'USD': {
									'title': 'Bitstamp',
								},
								'USDT': {
									'title': 'Binance',
								},
							};
							return '<span>' + status[row.Pair.SecondaryCurrency].title + '</span>';
						},
					}, {
						field: 'OrderTypeAsString',
						title: 'Type',
						width: 40,
						textAlign: 'center',
						// callback function support for column rendering
						template: function(row) {
							var status = {
								'Buy': {
									'title': 'Buy',
									'class': ' m-badge--primary'
								},
								'Sell': {
									'title': 'Sell',
									'class': ' m-badge--brand'
								},
							};
							return '<span class="m-badge ' + status[row.OrderTypeAsString].class + ' m-badge--wide">' + status[row.OrderTypeAsString].title + '</span>';
						},
					}, {
						field: 'Amount',
						title: 'Size',
						width: 40,
						textAlign: 'center',
					}, {
						field: 'Pair.PrimaryCurrency',
						title: 'Pair',
						width: 40,
					}, {
						field: 'Price',
						title: 'Price',
						width: 60,
						textAlign: 'center',
					}, {
						field: 'FeePercentage',
						title: 'Fee %',
						textAlign: 'center',
						responsive: {
							hidden: 'md',
						},
					}, {
						field: 'FeeCosts',
						title: 'Fee',
						width: 50,
						textAlign: 'center',
					}, {
						field: 'Profits',
						title: 'Profit',
						width: 40,
						textAlign: 'center',
					}, {
						field: 'Notes',
						title: 'Unique',
						width: 0,
						responsive: {
							hidden: 'md',
						},
					},
					{
						field: 'OrderStatus',
						title: 'Status',
						responsive: {
							hidden: 'md'
						},
						// callback function support for column rendering
						template: function(row) {
							var status = {
								'Timeout': {
									'title': 'Timeout',
									'state': 'warning'
								},
								'Canceled': {
									'title': 'Canceled',
									'state': 'danger'
								},
								'Completed': {
									'title': 'Completed',
									'state': 'accent'
								},
							};
							return '<span class="m-badge m-badge--' + status[row.OrderStatus].state + ' m-badge--dot"></span>&nbsp;<span class="m--font-bold m--font-' + status[row.OrderStatus].state + '">' +
								status[row.OrderStatus].title + '</span>';
						},
					}, {
						field: 'AddedTime',
						title: 'Date',
						sortable: 'desc',
						width: 160,
						// callback function support for column rendering
						template: function(row) {
							return row.AddedTime.substring(0, 10) + ' ' + row.AddedTime.substring(11, 19);
						},
					},
				],
			});
		}
	};

	return {
		//== Public functions
		init: function() {
			// init dmeo
			bot();
		},
	};
}();

jQuery(document).ready(function() {
	DatatableChildRemoteDataBot.init();
});
