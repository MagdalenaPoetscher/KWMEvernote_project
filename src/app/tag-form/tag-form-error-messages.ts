
export class ErrorMessage{
  constructor(
    public forControl:string,
    public forValidator: string,
    public text:string) {}
}

export const TagFormErrorMessages = [
  new ErrorMessage('title', 'required', 'Einen Tag Namen eingeben!')
]
