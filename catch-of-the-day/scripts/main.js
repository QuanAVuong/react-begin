var React = require("react");
var ReactDOM = require("react-dom");

// REACT ROUTER	
var ReactRouter  = require("react-router");
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
// var Navigation = ReactRouter.Navigation; // .History instead
var History = ReactRouter.History;


// separate npm module "history": import code for HTML5's push state
var createBrowserHistory = require("history/lib/createBrowserHistory");

// Helper functions
var helpers = require("./helpers");


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
	// create mixins: populate StorePicker class with methods we need eg. History
	mixins: [History],
	
	// goToStore event handler:
	goToStore: function(event) { // pass event to prevent default
		event.preventDefault(); // else page reload after submitting, 
		console.log('Store submitted'); // and log won't be seen

		// GET DATA FROM INPUT (get value from the DOM)
		// this = StorePicker component
		// refs: referencing the node anywhere inside a component
		// eg. <input type="text" value="obnoxious-worried-knives" data-reactid=".0.1">
		console.log('storeId', this.refs.storeId)
		var storeId = this.refs.storeId.value;
		console.log('storeId value', storeId) // eg. obnoxious-worried-knives

		// pushState not available => require a mixin eg. ReactRouter.History
		this.history.pushState(null, "/store/" + storeId); 


		// transition from StorePicker to App components
	},

	render: function() {
		var name = "Q";
		return ( // listening for submit on form, since users may type, then enter
			<form className="store-selector" onSubmit={this.goToStore} >
				<h2>Please Enter A Store, {name}</h2>
				<input type="text" ref="storeId" defaultValue={helpers.getFunName()} />
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
