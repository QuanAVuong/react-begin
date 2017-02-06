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


/******************************************
					APP
*******************************************/

var App = React.createClass({
	getInitialState: function() {
		return {
			fishes: {},
			order: {},
		}
	},

	// addFish method here instead of in <AddFishForm />, to be passed down
	addFish: function(fish) {
		var timestamp = (new Date()).getTime(); // give fishes unique IDs
		this.state.fishes["fish-" + timestamp] = fish; // update state object

		// actually set state: pass object with new state
		// NOT (this.state): pass the entire state is slow
		// be specific, keep amount of comparisons as few as possible
		this.setState({ fishes: this.state.fishes }); 
	},

	loadSamples: function() {
		this.setState({
			fishes: require("./sample-fishes")
		})
	},

	renderFish: function(key) { // key = fish1, fish2 etc
		return <Fish key={key} index={key} details={this.state.fishes[key]} />
	},

	render: function() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
					{/*Displaying Sample Fishes*/}
					<ul className="list-of-fishes">
						{/*Loop through fishes; JSX has no builtin templating logic*/}
						{ // usually using arrayName.map(),
						  // Object.keys(): array of all keys eg. fish1, fish2...
						  Object.keys(this.state.fishes).map( this.renderFish )
						}
					</ul>
				</div>
				<Order />
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
			</div>
		)
	}
})


/*
	Add Fish Form <AddFishForm />
 */
var Fish = React.createClass({
	render: function() {
		var details = this.props.details;
		return (
			<li className="menu-fish">
				<img src={details.image} alt={details.name} />
				<h3 className="fish-name">
					{details.name}
					<span className="price">{helpers.formatPrice(details.price)}</span>
				</h3>
				<p>{details.desc}</p>
			</li>
		)
	}
})


/*
	Add Fish Form <AddFishForm />
 */

var AddFishForm = React.createClass({
	createFish: function(event) {
		// 1. Stop the form from submitting
		event.preventDefault();
		// 2. Take data from form => create object
		var fish = {
			name: this.refs.name.value,
			price: this.refs.price.value,
			status: this.refs.status.value,
			desc: this.refs.desc.value,
			image: this.refs.image.value,
		}
		console.log(fish);
		// 3. Add fish to App State
		// App.addFish(fish) would makes sense, but addFish isn't in AddFishForm
		this.props.addFish(fish); // passed down from <Inventory addFish={...this.props}/>
		this.refs.fishForm.reset(); // reset form's input fields
		
	},

	render : function() {
	  return ( // ref referencing corresponding nodes
	    <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
	      <input type="text" ref="name" placeholder="Fish Name"/>
	      <input type="text" ref="price" placeholder="Fish Price" />
	      <select ref="status">
	        <option value="available">Fresh!</option>
	        <option value="unavailable">Sold Out!</option>
	      </select>
	      <textarea type="text" ref="desc" placeholder="Desc"></textarea>
	      <input type="text" ref="image" placeholder="URL to Image" />
	      <button type="submit">+ Add Item </button>
	    </form>
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
			<div>
				<h2>Inventory</h2>
				<AddFishForm {...this.props} />
				{/*Button to prepopulate fish samples*/}
				<button onClick={this.props.loadSamples} >Load Sample Fishes</button>
			</div>
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
