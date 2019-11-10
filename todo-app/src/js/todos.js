import uuidv4 from 'uuid/v4';
import { database } from '../firebase/firebase';

let todos = []; // todo array - { id(string), todo(string), completed(boolean) }

/**
 * Retrieve todos data from cloud database(firebase)
 * 
 * @param null
 * @returns Firebase promise: if succeed, return the todo array, otherwise return false
 */
const loadTodos = () => {
  return database.ref('todos').once('value').then((dataSnapshot) => {
    const todosData = [];
    dataSnapshot.forEach((childSnapshot) => {
      todosData.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });
    todos = todosData;
    return todos;
  }).catch((e) => {
    console.log('Load todos error:' + e.message);
    return false;
  });
}

/**
 * Retrieve one todo data from cloud database(firebase) based on its id
 * 
 * @param null
 * @returns Firebase promise: if succeed, return the todo object, otherwise return false
 */
const loadOneTodo = (id) => {
  return database.ref(`todos/${id}`).once('value').then((dataSnapshot) => {
    const todoData = {
      id,
      ...dataSnapshot.val()
    };
    return todoData;
  }).catch((e) => {
    console.log('Load one todo error: ' + e.message);
    return false;
  });
}

/**
 * Return todos
 * 
 * @param null
 * @returns {Object} todos array of object
 */
const getTodos = () => todos;

/** 
 * Delete a todo by its id and save the new todos array to local storage
 * 
 * @param String the id of the todo to be deleted
 * @returns null
*/
const deleteTodo = (id) => {
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if(todoIndex !== -1) {
    return database.ref(`todos/${id}`).remove().then(() => {
      todos.splice(todoIndex, 1);
    }).catch((e) => {
      console.log('Delete todo error:' + e.message);
      return false;
    });
  };
};

/** 
 * Create a new todo task and save it to cloud(firebase) database
 * 
 * @param String todo text of the task
 * @returns Firebase promise
*/
const createTodo = (todoText) => {
  if(todoText === '') {
    return;
  }
  const newTodo = {
    task: todoText,
    completed: false
  }
  return database.ref('todos').push(newTodo).then((ref) => {
    todos.push({
      id: ref.key,
      ...newTodo
    });
  }).catch((e) => {
    console.log('Create todo error:' + e.message);
    return false;
  });
}

/**
 * Update a todo by its id. If it is completed, set it to be incomplete; otherwise, set complete
 * And update the todos data in cloud database
 * 
 * @param String the id of the todo to be updated
 * @returns null 
 */
const toggleTodoComplete = (id) => {
  const todoIndex = todos.findIndex(todo => todo.id === id);
  const todo = todos.find(todo => todo.id === id);
  todo.completed = !todo.completed;
  return database.ref(`todos/${id}`).update(todo).then(() => {
    todos[todoIndex] = todo;
  }).catch((e) => {
    console.log('Toggle todo complete error:' + e.message);
    return false;
  });
};

export { getTodos, loadTodos, loadOneTodo, deleteTodo, createTodo, toggleTodoComplete};
