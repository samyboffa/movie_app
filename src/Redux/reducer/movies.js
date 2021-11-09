const initialState = { loading: false, topUps: [], error: null };

// pure function=> (state, {type,payload})=>
export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GETTOPUPLOADING":
      return { ...state, loading: true };
    case "GETTOPUPSUCCESS":
      return { ...state, topUps: action.payload, loading: false };
    case "GETTOPUPERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
