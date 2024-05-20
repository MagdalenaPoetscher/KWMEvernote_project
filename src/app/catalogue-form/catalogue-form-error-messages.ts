
export class ErrorMessage{
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string){}
}
export const CatalogueFormErrorMessages = [
  new ErrorMessage('name', 'required', 'Ein Listenname muss eingegeben werden!')
]
