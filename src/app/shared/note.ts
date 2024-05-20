import {Todo} from "./todo";
import {Tag} from "./tag";
import {User} from "./user";
import {Image} from "./image";
export {Todo} from "./todo";
export {Tag} from "./tag";
export {User} from "./user";
export {Image} from "./image";

export class Note {
  constructor(
    public id:number,
    public title:string,
    public description:string,
    public created_at: Date,
    public updated_at: Date,
    public user_id: number,
    public catalogue_id: number,
    //public firstname?: User,
    //public lastname?: User,
    public todos?: Todo[],
    public tags?: Tag[],
    public images?: Image[]){
  }
}
