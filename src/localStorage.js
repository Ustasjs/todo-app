export function addToLS(list) {
  const listForStorage = JSON.stringify(list);
  localStorage.setItem('taskList', listForStorage);
}

export function getFromLS() {
  const resultList = localStorage.getItem('taskList');
  return JSON.parse(resultList);
}

export function removeFromLS() {
  localStorage.removeItem('taskList');
}
