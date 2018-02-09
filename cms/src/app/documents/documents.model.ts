export class Document{
  public documentId: number;
  public name: string;
  public description: string;
  public documentUrl: string;
  public children: string;

  constructor(documentId: number, name: string,description: string, documentUrl: string, children: string){
    this.documentId = documentId;
    this.name = name;
    this.description = description;
    this.documentUrl = documentUrl;
    this.children = children;
  }
}
