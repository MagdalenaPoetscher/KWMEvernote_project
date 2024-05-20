import {Todo} from "./todo";

export class TodoFactory {

  static empty():Todo{
    return new Todo(0, '', '',
      new Date(), false, 0, 0, 0,
      [{id:0, url:'', title:''}], [{id:0, title:'', user_id:1}]);

  }

  static fromObject(rawTodo: any):Todo{
    return new Todo(
      rawTodo.id, rawTodo.title,
      rawTodo.description, rawTodo.due,
      rawTodo.done, rawTodo.user_id,
      rawTodo.note_id, rawTodo.catalogue_id,
      rawTodo.images, rawTodo.tags);
  }
}
