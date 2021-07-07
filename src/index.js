import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

// What we need:
//    1.  An app component to determine location and month
//    2.  Take that information and pass it as a prop to a child component
//    3.  This child component will display different text/icons based on the the prop

//  Class
class App extends React.Component {
  state = { lat: null, errorMessage: '' };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ lat: position.coords.latitude }),
      (err) => this.setState({ errorMessage: err.message })
    );
  }
  //  helper method: use this for conditional logic
  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return (
        <div style={{ margin: '1rem' }}>Error: {this.state.errorMessage}</div>
      );
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }

    return <Spinner message="Please accept location request" />;
  }

  render() {
    return <div className="border red">{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));

if (module.hot) {
  module.hot.accept();
}

//  We are extending to React.Component because it lets us borrow functionality from another class called React.Component. AKA subclassing

//  Rules of Class Components-------------------------------------
//    1.  Must be a JS class
//    2.  must extend React.Component
//    3.  must define a 'render' method that returns some JSX

//  Rules of State-------------------------------------
//    1.  Only usable with class components
//    2.  You will confuse props with state
//    3.  'State' is a JS object that contains data relevant to a comp
//    4.  Updating 'state' on a component causes the component to (almost instantly rerender)
//    5.  State must be initialized when a component is created
//    6.  state can only be updated using the function 'setState'

//  Constructor -------------------------------------------
//    This will be automatically called first anytime an instance of the class is created (anytime we show it on the screen)
//      -This makes it a good location to initialize the state
//    "props" must be passed through it
//    "super(props);" must be called in the constructor

//  Initializing State --------------------------------------
//    1.  Create a JS object:     {}
//    2.  Assigning a key value pair to it:  { key: value }
//            - numbers are usually defaulted to value of null
//    3.  Assigning the result to the state:
//            this.state = { key: value }
//    - Now, we can freely reference this.state and its properties anywhere in the component

//  Updating State Properties --------------------------------------
//    must use this.setState()
//    1.  make an object in the callback that recieves the info we want
//        { lat: position.coords.latitude }
//    2.  Place this inside the this.setState() function.
//    3.  setState will automatically trigger the render function with the updated information

//  Render() --------------------------------------
//  Must be called in a class
//  Do not do the "work" in this function call

//  App Lifecyle --------------------------------------------
//    1.  JS file loaded by browser
//    2.  Instance of App component is created
//    3.  App components 'constructor' function gets called
//    4.  State object is created and assigned to the this.state property
//    5.  We call geolocation service (which takes some amount of time)
//    7.  React calls the component render method
//    ...
//    8.  We get our result of the geolocation
//    9.  We update our state object with a call to this.setState()
//    10. React sees that we updated the state of a component
//    11. React calls our render method a second time with the new info
//    12. Render method returns some updated jsx

//   Conditionally Rendering Content -----------------------------------
//    Think about what the options are:
//      1. Have Latitude, no errorMessage = show latitude
//      2. No Latitude, Have errorMessage = show error
//      3. No Latitude, No errorMessage = show "loading"

//  Component Lifecycle Methods -----------------------------------------
//    1.  Constructor
//    2.  Render
//        'cntent visable on screen'
//    3.  componentDidMount - this will be called once immediately after
//        'sit and wait for updates
//    4.  componentDidUpdate - this will be called after every update
//        'sit and wait until this component is no longer shown
//    5.  componentWillUnmount

//  When to use the lifecycle methods --------------------------------
//    1.  constructor:  good place to do one-time set up, state init,
//                      data loading (network request to outside api)
//    2.  render: return some jsx, avoid doing anything else
//    3.  componentDidMount:  good place to do some initial data loading,
//                            try to keep it here and not in constructor
//    4.  componentDidUpdate: data loading when state/props change
//             ex: network request everytime a user clicks on a button
//    5.  componentWillUnmount: used to do cleanup, to remove a component

//  taking a prop from state on the app component and passing it as a prop down to the season display
//  anytime we call setState inside the parent component and update the latitude, the app component is goingn to rerender itself, which is going to cause SeasonDisplay to update as well. If the latitude value changes, the new latitude value will replace it in the seasonDisplay as well

//  setState will not just rerender the component itself, but the children its showing as well

//  Review ------------------------------------------------------------
//  Class Components:
//      1.  Easier to organize code
//      2.  Can make use of state: makes it easier to handle user input
//              - plus data loading events
//      3.  Understands lifecycle events
