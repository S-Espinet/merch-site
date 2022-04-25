import React from 'react';
import NewItem from './NewItem';
import ItemList from './ItemList';
import ItemDetail from './ItemDetail';
import EditItem from './EditItem';

class ItemControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      mainItemList: [],
      selectedItem: null,
      editing: false
    };
  }

  handleClick = () => {
    if (this.state.selectedItem !== null) {
      this.setState({
        formVisibleOnPage: false,
        selectedItem: null,
        editing: false
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage
      }));
    }
  }

  handleCreateNewItem = (newItem) => {
    const newMainItemList = this.state.mainItemList.concat(newItem);
    this.setState({
      mainItemList: newMainItemList,
      formVisibleOnPage: false,
    });
  }

  handleDetailsSelectedItem = (id) => {
    const selectedItem = this.state.mainItemList.filter(item => item.id === id)[0];
    this.setState({selectedItem: selectedItem});
  }

  handleDeleteSelectedItem = (id) => {
    const newMainItemList = this.state.mainItemList.filter(item => item.id !== id);
    this.setState({
      mainItemList: newMainItemList,
      selectedItem: null
    });
  }
  handleUpdateClick = () => {
    this.setState({editing:true});
  }

  handleUpdateItemInList = (itemToUpdate) => {
    const updatedMainItemList = this.state.mainItemList
      .filter(item => item.id !== this.state.selectedItem.id)
      .concat(itemToUpdate);
    this.setState({
      mainItemList: updatedMainItemList,
      editing: false, 
      selectedItem: null
    });
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
        onClickingEdit = {this.handleUpdateClick} />
      buttonText = "Return to Item List";
    } else if (this.state.selectedItem != null) {
      currentlyVisibleState = <ItemDetail item = {this.state.selectedItem}/>
      buttonText = "Return to Item List";
    } else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewItem onNewItemCreation={this.handleCreateNewItem}/>
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <ItemList itemList = {this.state.mainItemList} onItemSelection={this.handleDetailsSelectedItem}/>;
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

export default ItemControl;