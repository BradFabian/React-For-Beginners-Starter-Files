import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  // creating state
  state = {
    fishes: {},
    order: {},
  };

  static propTypes = {
    match: PropTypes.object,
  };
  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  //life cycle events
  addFish = (fish) => {
    // use react api to update state

    //1. take a copy of existing state
    const fishes = { ...this.state.fishes };
    //2. add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    //3. set the new fishes object to state
    this.setState({
      fishes: fishes,
    });
  };

  updateFish = (key, updatedFish) => {
    // Take a copy of existing state
    const fishes = { ...this.state.fishes };
    // update that state
    fishes[key] = updatedFish;
    // set the state
    this.setState({ fishes });
  };

  deleteFish = (key) => {
    //1. take a copy
    const fishes = {
      ...this.state.fishes,
    };
    //2. delete state
    fishes[key] = null;
    //3. update state;
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes,
    });
  };
  // custom functions
  addToOrder = (key) => {
    //take a copy of state
    const order = { ...this.state.order };
    // either add to order or update the number in our order
    order[key] = order[key] + 1 || 1;
    // call setState to update our state object
    this.setState({ order });
  };

  removeFromOrder = (key) => {
    //take a copy of state
    const order = { ...this.state.order };
    // delete
    delete order[key];
    // call setState to update our state object
    this.setState({ order });
  };
  // render
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
