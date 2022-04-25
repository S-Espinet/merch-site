import React from "react";
import PropTypes from "prop-types";

function ItemDetail(props) {
  const { item, onClickingDelete } = props;
  return (
    <React.Fragment>
      <h1>Item Details</h1>
      <h3>{item.name}</h3>
      <h3>{item.description}</h3>
      <h3>{item.quantity}</h3>
      <button onClick={props.onClickingEdit}>Update Item</button>
      <button onClick={()=> onClickingDelete(item.id) }>Delete Item</button>
    </React.Fragment>
  );
}

ItemDetail.propTypes = {
  item: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
  onClickingPurchase: PropTypes.func
};


export default ItemDetail;