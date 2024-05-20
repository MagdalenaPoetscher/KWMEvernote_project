
export class ErrorMessage{

  constructor(
    public forControl:string,
    public forValidator: string,
    public text:string){}
}

export const TodoFormErrorMessages = [
  new ErrorMessage('title', 'required', 'Ein Todo Titel muss eingegeben werden!'),
  new ErrorMessage('description', 'required', 'Eine Beschreibung muss eingegeben werden!' ),
  new ErrorMessage('due', 'required', 'Eine Fälligkeitsdatum muss eingegeben werden!' )
]
