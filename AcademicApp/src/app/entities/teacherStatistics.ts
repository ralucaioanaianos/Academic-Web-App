import {CourseStatistics} from "./courseStatistics";

export class TeacherStatistics{
  constructor(
    public username: string,
    public fullName: string,
    public courseStatisticsList: CourseStatistics[]
  ) {}
}
