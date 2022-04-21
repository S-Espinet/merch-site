import React from "react";
import { v4 } from 'uuid';
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";

function NewItem(props) {
  function handleNewItemSubmission(event) {
    event.preventDefault();
    // console.log(event.target.name.value);
    // console.log(event.target.description.value);
    // console.log(event.target.quantity.value);
    props.onNewItemCreation({
      names: event.target.name.value, 
      description: event.target.description.value, 
      quantity: event.target.quantity.value, 
      id: v4()
    });
  }
  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleNewItemSubmission}
        buttonText="Submit" />
    </React.Fragment>
  );
}

NewItem.propTypes = {
  onNewItemCreation: PropTypes.func
};

export default NewItem;