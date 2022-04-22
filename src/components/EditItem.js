import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";

function EditItem(props){
  const { item } = props;
  
  function handleEditItemSubmission(event) {
    event.preventDefault();
    props.onUpdateItem({
      name: event.target.name.value, 
      description: event.target.description.value, 
      quantity: event.target.quantity.value, 
      id: item.id
    });
  }
  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleEditItemSubmission} 
        buttonText="Edit Item" />
    </React.Fragment>
  );
}

EditItem.propTypes = {
  item: PropTypes.object,
  onEditItem: PropTypes.func
};

export default EditItem;