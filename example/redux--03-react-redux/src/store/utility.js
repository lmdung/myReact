export const updateObject = (state, updateValue) => {
  return {
    ...state,
    ...updateValue
  }
}