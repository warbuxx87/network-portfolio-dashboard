//== Class definition

var DatatableChildRemoteDataDemo = function() {
	//== Private functions

	// demo initializer
	var demo = function() {

		var datatable = $('#m_datatable_exchanges').mDatatable({
			// datasource definition
			data: {
				type: 'remote',
				source: {
					read: {
						url: 'https://api.alkemi.ai/bots',
						method: 'GET',
					},
				},
				pageSize: 10, // display 20 records per page
				//serverPaging: true,
				//serverFiltering: false,
				//serverSorting: true,
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
					field: 'checkbox',
					title: '',
					template: '{{OrderId}}',
					sortable: false,
					width: 20,
					textAlign: 'center',
					selector: {
						class: 'm-checkbox--solid m-checkbox--brand'
					},
				}, {
					field: 'OrderTypeAsString',
					title: 'Type',
					// callback function support for column rendering
					template: function(row) {
						var status = {
							'Buy': {
								'title': 'Buy',
								'class': ' m-badge--success'
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
					title: 'Amount',
				}, {
					field: 'Pair.PrimaryCurrency',
					title: 'Currency',
				}, {
					field: 'Price',
					title: 'Price',
				}, {
					field: 'FeePercentage',
					title: 'FeePercentage',
				}, {
					field: 'FeeCosts',
					title: 'FeeCosts',
				}, {
					field: 'Profits',
					title: 'Profits',
				}, {
					field: 'Notes',
					title: 'Notes',
				},
				{
					field: 'OrderStatus',
					title: 'Status',
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
				},
			],
		});

		function subTableInit(e) {
			$('<div/>').attr('id', 'child_data_ajax_' + e.data.RecordID).appendTo(e.detailCell).mDatatable({
				data: {
					type: 'remote',
					source: {
						read: {
							url: 'inc/api/datatables/demos/orders.php',
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
					field: 'RecordID',
					title: '#',
					sortable: false,
					width: 20,
					responsive: {
						hide: 'xl'
					},
				}, {
					field: 'OrderID',
					title: 'Order ID',
					template: function(row) {
						return '<span>' + row.OrderID + ' - ' + row.ShipCountry + '</span>';
					},
				}, {
					field: 'ShipCountry',
					title: 'Country',
					width: 100,
				}, {
					field: 'ShipAddress',
					title: 'Ship Address',
				}, {
					field: 'ShipName',
					title: 'Ship Name',
				}, {
					field: 'TotalPayment',
					title: 'Payment',
					type: 'number',
				}, {
					field: 'Status',
					title: 'Status',
					// callback function support for column rendering
					template: function(row) {
						var status = {
							1: {
								'title': 'Pending',
								'class': 'm-badge--brand'
							},
							2: {
								'title': 'Delivered',
								'class': ' m-badge--metal'
							},
							3: {
								'title': 'Canceled',
								'class': ' m-badge--primary'
							},
							4: {
								'title': 'Success',
								'class': ' m-badge--success'
							},
							5: {
								'title': 'Info',
								'class': ' m-badge--info'
							},
							6: {
								'title': 'Danger',
								'class': ' m-badge--danger'
							},
							7: {
								'title': 'Warning',
								'class': ' m-badge--warning'
							},
						};
						return '<span class="m-badge ' + status[row.Status].class + ' m-badge--wide">' + status[row.Status].title + '</span>';
					},
				}, {
					field: 'Type',
					title: 'Type',
					// callback function support for column rendering
					template: function(row) {
						var status = {
							1: {
								'title': 'Online',
								'state': 'danger'
							},
							2: {
								'title': 'Retail',
								'state': 'primary'
							},
							3: {
								'title': 'Direct',
								'state': 'accent'
							},
						};
						return '<span class="m-badge m-badge--' + status[row.Type].state + ' m-badge--dot"></span>&nbsp;<span class="m--font-bold m--font-' + status[row.Type].state + '">' +
							status[row.Type].title + '</span>';
					},
				}, ],
			});
		}
	};

	return {
		//== Public functions
		init: function() {
			// init dmeo
			demo();
		},
	};
}();

jQuery(document).ready(function() {
	DatatableChildRemoteDataDemo.init();
});
