import itemListReducer from '../../reducers/item-list-reducer';

describe('itemListReducer', () => {

    const currentState = {
      1: {name: 'sample',
      description: 'sample description',
      quantity: 4, 
      id: 1 },
      2: {name: 'myItem',
      description: 'Just my item',
      quantity: 3, 
      id: 2 },
    }
  
  let action;
  const itemData = {
    name: 'sample',
    description: 'sample description',
    quantity: 4,
    id :1
  };
  test('Should return default state if there is no action type passed into the reducer', () => {
    expect(itemListReducer({}, { type: null})).toEqual({});
  });

  test('Should successfully add new item to mainItemList', () => {
    const { name, description, quantity, id} = itemData;
    action = {
      type:'ADD_ITEM',
      name: name,
      description: description,
      quantity: quantity,
      id: id
    };
    expect(itemListReducer({},action)).toEqual({
      [id] : {
        name: name,
        description: description,
        quantity: quantity,
        id: id
      }
    });
  });

  test('Should successfully delete an item', () => {
    action = {
      type: 'DELETE_ITEM',
      id: 1
    };
    expect(itemListReducer(currentState, action)).toEqual({
      2: {name: 'myItem',
      description: 'Just my item',
      quantity: 3,
      id: 2 }
    });
  });
});