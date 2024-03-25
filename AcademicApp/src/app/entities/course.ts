export class Course{
  
  constructor(
    public cid: number,
    public name: string,
    public fid: number,
    public year: number,
    public teacher: string,
    public semester: number,
    public maxstudents: number,
    public priority: number,
    public credits: number
   ) {}
}
