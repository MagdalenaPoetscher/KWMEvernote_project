import {Note} from "./note";
export {Note} from "./note";

export class User {


  constructor(
    public id: number,
    public firstname?: string,
    public lastname?: string,
    public notes?: Note[],){
  }
}
