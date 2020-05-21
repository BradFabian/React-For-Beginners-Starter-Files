import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  static propTypes = {
    history: PropTypes.object,
  };
  myInput = React.createRef();
  //To access THIS in custom method declare a property set to arrow function//
  goToStore = (event) => {
    //1. Stop form from submitting
    event.preventDefault();

    //2. get text from that input
    const storeName = this.myInput.current.value;

    //3. Change the page to /store/whatever-they-entered
    this.props.history.push(`/store/${storeName}`);
  };
  render() {
    return (
      <Fragment>
        <form className="store-selector" onSubmit={this.goToStore}>
          <h2>Please Enter A Store</h2>
          <input
            type="text"
            ref={this.myInput}
            required
            placeholder="Enter Store Name"
            defaultValue={getFunName()}
          />
          <button type="submit">Visit Store</button>
        </form>
      </Fragment>
    );
  }
}

export default StorePicker;
