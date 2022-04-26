import React from 'react';
import NewItem from './NewItem';
import ItemList from './ItemList';
import ItemDetail from './ItemDetail';
import EditItem from './EditItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ItemControl extends React.Component {

  constructor(props) {
    super(props);
console.log(props);
    this.state = {
      selectedItem: null,
      editing: false
    };
  }

  handleClick = () => {
    if (this.state.selectedItem !== null) {
      this.setState({
        selectedItem: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = {
        type: 'TOGGLE_FORM'
      }
      dispatch(action);
    }
  }
  handleCreateNewItem = (newItem) => {
    const { dispatch } = this.props;
    const { id, name, description, quantity} = newItem;
    const action = {
      type: 'ADD_ITEM',
      id: id,
      name: name,
      description: description,
      quantity: quantity
    }
    dispatch(action);
    const action2 = {
      type: 'TOGGLE_FORM'
    }
    dispatch(action2);
  }

  handleDetailsSelectedItem = (id) => {
    const selectedItem = this.props.mainItemList[id];
    this.setState({selectedItem: selectedItem});
  }

  handleDeleteSelectedItem = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: 'DELETE_ITEM',
      id: id
    }
    dispatch(action);
    this.setState({
      selectedItem: null
    });
  }
  handleUpdateClick = () => {
    this.setState({editing:true});
  }

  handleUpdateItemInList = (itemToUpdate) => {
    const { dispatch } = this.props;
    const { id, name, description, quantity} = itemToUpdate;
    const action = {
      type: 'ADD_ITEM',
      id: id,
      name: name,
      description: description,
      quantity: quantity
    }
    dispatch(action);
    this.setState({
      editing: false, 
      selectedItem: null
    });
  }


  handleSell = () => {
    const selectedItem = this.state.selectedItem
    if (selectedItem.quantity > 0) {
      selectedItem.quantity -= 1;
      this.setState({selectedItem: selectedItem});
    }
  }

  render () {
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.editing) {
      currentlyVisibleState = <EditItem item = {this.state.selectedItem}
      onUpdateItem = {this.handleUpdateItemInList}/>
      buttonText = "Return to Item List";
    } else if (this.state.selectedItem != null) {
      currentlyVisibleState = 
      <ItemDetail
        item = {this.state.selectedItem}
        onClickingDelete = {this.handleDeleteSelectedItem}
        onClickingEdit = {this.handleUpdateClick} 
        onClickingBuy = {this.handleSell}/>
      buttonText = "Return to Item List";
    } else if (this.state.selectedItem != null) {
      currentlyVisibleState = <ItemDetail item = {this.state.selectedItem}/>
      buttonText = "Return to Item List";
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewItem onNewItemCreation={this.handleCreateNewItem}/>
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <ItemList itemList = {this.props.mainItemList} onItemSelection={this.handleDetailsSelectedItem}/>;
      buttonText = "Add Item";
    } 
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button> 
      </React.Fragment>
    );
  }
}
ItemControl.propTypes = {
  mainItemList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    mainItemList: state.mainItemList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}
ItemControl = connect(mapStateToProps)(ItemControl);

export default ItemControl;