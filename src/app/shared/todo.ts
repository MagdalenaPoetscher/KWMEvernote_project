import {Image} from "./image";
import {Tag} from "./tag";
export {Image} from "./image";
export {Tag} from "./tag";

export class Todo {

  constructor(
    public id: number,
    public title: string,
    public description: string,
    public due: Date,
    public done: boolean,
    public user_id: number,
    public note_id?: number,
    public catalogue_id?: number,
    public images?: Image[],
    public tags?: Tag[],
    ) {
  }
}
