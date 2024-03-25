export interface CourseStatistics {
    cid: number,
    courseName: string,
    totalNumberOfStudents: number,
    passedStudents: number,
    failedStudents: number,
    marks: Array<number>
}
  