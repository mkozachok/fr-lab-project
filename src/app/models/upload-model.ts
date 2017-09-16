export class Upload {

  $key: string;
  file:File;
  type: string;
  name:string;
  url:string;
  progress:number;
  createdAt: Date = new Date();

  constructor(file:File) {
    this.file = file;
    this.type = file.type;
  }
}
