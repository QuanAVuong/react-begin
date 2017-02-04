var React = require("react");
var ReactDOM = require("react-dom");

/*
	APP
*/

var App = React.createClass({
	render: function() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<h3>menu</h3>
				</div>
				<Order />
				<Inventory />
			</div>
		)
	}
})

/*
	Header
*/

var Header = React.createClass({
	render: function() {
		return (
			<p>Header</p>
		)
	}
})

/*
	Order
*/

var Order = React.createClass({
	render: function() {
		return (
			<p>Order</p>
		)
	}
})

/*
	Inventory
*/

var Inventory = React.createClass({
	render: function() {
		return (
			<p>Inventory</p>
		)
	}
})


/*
	StorePicker
*/

var StorePicker = React.createClass({
	render: function() {
		var name = "Q";
		return (
			<form className="store-selector">
				<h2>Please Enter A Store, {name}</h2>
				<input type="text" ref="storeId" />
				<input type="Submit" />
			</form>
		)
	}
})

// Mounting <StorePicker /> to the page
ReactDOM.render(
	<App />,
	document.querySelector("#main")
);
