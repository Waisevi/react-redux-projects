const initialState = {
  books: [],
  loading: true,
  error: null,
  cartItems : []
};

const updateCartItems = (cartItems, item, idx) => {
  if(item.count === 0) {
    return [
      ...cartItems.slice(0,idx),
      ...cartItems.slice(idx + 1)
    ];
  }
  if(idx === -1) {
    return [...cartItems,item];
  }
  return [
    ...cartItems.slice(0,idx),
    item,
    ...cartItems.slice(idx + 1)
  ];
};

const updateCartItem = (book, item, quantity) => {
  if (item) {
    return {
      ...item,
      count: item.count + quantity,
      total: item.total + quantity*book.price
    };
  } else {
    return {
      id: book.id,
      title: book.title,
      count: 1,
      total: book.price
    };
  }
};

const updateOrder = (state, bookId, quantity) => {
  const book = state.books.find((book) => book.id === bookId);
  const itemIndex = state.cartItems.findIndex(({id}) => id === bookId);
  const item = state.cartItems[itemIndex];

  const newItem = updateCartItem(book, item, quantity);
  return {
      ...state,
      cartItems: updateCartItems(state.cartItems, newItem, itemIndex)
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST':
      return {
        ...state,
        books: [],
        loading: true,
        error: null
      };
    case 'FETCH_BOOKS_SUCCESS':
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: null
      };
    case 'FETCH_BOOKS_FAILURE' :
      return {
        ...state,
        books: [],
        loading: false,
        error: action.payload
      };
    case 'BOOK_ADDED_TO_CART' :
      return updateOrder(state, action.payload, 1);
    case 'BOOK_REMOVED_FROM_CART':
      return updateOrder(state, action.payload, -1);
    case 'ALL_BOOKS_REMOVED_FROM_CART':
      const allDeleteItem = state.cartItems.find(({id}) => id === action.payload);
      return updateOrder(state, action.payload, -allDeleteItem.count);
    default:
      return state;
  }
};

export default reducer;
