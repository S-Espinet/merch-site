import React from "react";
import { v4 } from 'uuid';
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";

function NewItem(props) {
  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleNewItemSubmission}
        buttonText="Submit" />
    </React.Fragment>
  );
  function handleNewItemSubmission(event) {
    event.preventDefault();
    // console.log(event.target.name.value);
    // console.log(event.target.description.value);
    // console.log(event.target.quantity.value);
    props.onNewItemCreation({
      name: event.target.name.value, 
      description: event.target.description.value, 
      quantity: Number(event.target.quantity.value),
      id: v4()
    });
  }
}

NewItem.propTypes = {
  onNewItemCreation: PropTypes.func
};

export default NewItem;