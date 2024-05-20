import {Note, Tag, Todo, User} from "./note";

export class NoteFactory {

  static empty():Note{
    return new Note(0, '', '',
      new Date(), new Date(),
      0, 0,
      [{id:0, title:'', due: new Date(), note_id:0,
        description:'', user_id: 1, done: false, catalogue_id: 0}],
      [{id:0, title:'', user_id:1}], [{id:0, url:'', title:''}]);

  }

  static fromObject(rawNote: any):Note{
    return new Note(
      rawNote.id, rawNote.title, rawNote.description, new Date(rawNote.created_at),
      new Date(rawNote.updated_at),
      rawNote.user_id,rawNote.catalogue_id, rawNote.todos, rawNote.tags, rawNote.images );
  }
}
