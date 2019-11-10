const filters = {
  searchText: '',
  hideComplete: false
}

const getFilters = () => filters;

const setFilters = (updates) => {
  if(typeof updates.searchText === 'string') {
    filters.searchText = updates.searchText;
  }
  if(typeof updates.hideComplete === 'boolean') {
    filters.hideComplete = updates.hideComplete;
  }
};

export { getFilters, setFilters };