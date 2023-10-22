import {reactive, toRefs} from 'vue';
import axios from 'axios';


const listState = reactive({
  lists: []
});

export function changeItem (newItem, listId) {
  listState.lists.forEach(list => {
    if (list.id === listId) {
      const index = list.items.findIndex(item => item.id === newItem.id);
      if (index !== -1) {
        list.items[index] = newItem;
      }
      list.marked = list.items.some(item => item.checked);
    }
  });
  saveChanges(listId);
}

export function markList (newList) {
  listState.lists?.forEach(list => {
    if (list.id === newList.id) {
      list.marked = newList.marked;
      list.items.forEach(item => item.checked = newList.marked);
    }
  });
}

export function changeListIsExpand (value, listId) {
  listState.lists.forEach(list => {
    if (list.id === listId) {
      list.isExpand = value;
    }
  });
}

export function removeItemSquare (removedSquareInItem, listId) {
  listState.lists.forEach(list => {
    if (list.id === listId) {
      const index = list.items.findIndex(item => item.id === removedSquareInItem.id);
      if (index !== -1) {
        list.items[index].value--;
      }
    }
  });
  saveChanges(listId);
}

export function getListsData () {
  axios.get('http://localhost:3000/lists').then((response) => {
    listState.lists = response.data;

  });
}

export function saveChanges (id) {
  let changedList = { ...listState.lists.find(list => list.id === id) };
  delete changedList.isExpand;
  axios.put(`http://localhost:3000/lists/${id}`, changedList)
    .then(response => {
      console.log('Изменения сохранены.');
    })
    .catch(error => {
      console.error(error);
    });
}

export default function useListState () {
  return { ...toRefs(listState) };
}