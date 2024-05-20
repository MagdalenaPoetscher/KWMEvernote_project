import {Catalogue} from "./catalogue";

export class CatalogueFactory {
  static empty():Catalogue{
    return new Catalogue(0,'', 0);
  }


  static fromObject(rawCatalogue: any):Catalogue{
    return new Catalogue(
      rawCatalogue.id, rawCatalogue.name, rawCatalogue.user_id);
  }
}
