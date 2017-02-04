var React = require("react");
var ReactDOM = require("react-dom");

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
	<StorePicker />,
	document.querySelector("#main")
);
