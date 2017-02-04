var React = require("react");
var ReactDOM = require("react-dom");

// REACT ROUTER	
var ReactRouter  = require("react-router");
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;

// separate npm module: import code for HTML5's push state
var createBrowserHistory = require("history/lib/createBrowserHistory");

/*
	APP
*/

var App = React.createClass({
	render: function() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
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
  render : function() {
    return (
      <header className="top">
        <h1>Catch
          <span className="ofThe">
            <span className="of">of</span>
            <span className="the">the</span>
          </span>
          Day</h1>
        <h3 className="tagline"><span>{this.props.tagline}</span></h3> 
      </header>
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


/*NOT FOUND*/
var NotFound = React.createClass({
	render: function() {
		return <h1>404 Page Not Found!</h1>
	}
})

 // ROUTES
 var routes = (
 	<Router history={createBrowserHistory()}> 
 		{/*path "/": home page; component: StorePicker, not App */}
 		<Route path="/" component={StorePicker} />
 		{/* storeId: placeholder eg. clumsy-grumpy-leaves*/}
 		<Route path="/store/:storeId" component={App} />
 		<Route path="*" component={NotFound} />
 	</Router>
 ) // will need to pass to ReactDOM to render routers instead of App




// Mounting <StorePicker /> to the page
ReactDOM.render(
	routes,
	document.querySelector("#main")
);
