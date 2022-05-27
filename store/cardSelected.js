export const state = () => ({
  cardSelected: [],
});

export const mutations = {
  setCardSelected(state, payload) {
    state.cardSelected = payload;
  },
};

// export const getters = {
//   getCardSelect: (state) => {
//     return state.cardSelected;
//   },
// };

// export const action = {
//   addCardSelected(context, data) {
//     context.commit("setCardSelected", data);
//   },
// };
