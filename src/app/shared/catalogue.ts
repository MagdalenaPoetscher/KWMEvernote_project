import {Todo} from "./todo";
import {Note} from "./note";
export {Todo} from "./todo";
export {Note} from "./note";

export class Catalogue {

  constructor(
    public id: number,
    public name: string,
    public user_id: number,
    public notes?: Note[],
    public todos?: Todo[]){}
}
