from exceptions.uiException import UiException

from utils.coursePriorities import *

class ConsoleUi:

    def __init__(self, service):
        self.__service = service
        self.__noUsers = 0
        self.__noStudents = 0
        self.__noTeachers = 0
        self.__noStaff = 0

    def __readUsers(self):
        print()
        self.__noUsers = int(input("Enter the number of users: "))

        self.__noTeachers = int(input("Enter the number of teachers: "))

        if self.__noTeachers < 10:
            raise UiException("Too few teachers!")

        self.__noStudents = int(input("Enter the number of students: "))

        self.__noStaff = self.__noUsers - (self.__noTeachers + self.__noStudents)

        if self.__noStaff <= 0:
            raise UiException("Too many students and teachers for the given number of users!")

        print("Staff members: " + str(self.__noStaff))

    def __getUsersString(self):
        users = self.__service.getUsers()

        usersString = ''

        for u in users:
            usersString += 'INSERT INTO "user"(username, password, role) VALUES (' + str(u) + ');'
            usersString += '\n'

        return usersString

    def __getUserDataString(self):
        userData = self.__service.getUserData()

        userDataString = ''

        for u in userData:
            userDataString += 'INSERT INTO "user_data"(username, name, surname, email, phone_number, home_address, cnp) VALUES (' + str(u) + ');'
            userDataString += '\n'

        return userDataString

    def __getStaffString(self):
        staff = self.__service.getStaff()

        staffString = ''

        for s in staff:
            staffString += 'INSERT INTO "staff"(username) VALUES (' + str(s) + ');'
            staffString += "\n"

        return staffString

    def __getTeacherString(self):
        teachers = self.__service.getTeachers()

        teacherString = ''

        for t in teachers:
            teacherString += 'INSERT INTO "teacher"(username) VALUES (' + str(t) + ');'
            teacherString += "\n"

        return teacherString

    def __getFacultyString(self):
        fac = self.__service.getFaculties()

        facultiesString = ''

        for f in fac:
            facultiesString += 'INSERT INTO "faculty"(fid, name, noyears, chief) VALUES (' + str(f) + ');'
            facultiesString += "\n"

        return facultiesString

    def __groupString(self):
        groups = self.__service.getGroups()

        groupString = ''

        for f in groups:
            groupString += 'INSERT INTO "group"(gid, faculty, year) VALUES (' + str(f) + ');'
            groupString += "\n"

        return groupString

    def __studentString(self):
        students = self.__service.getStudents()

        studentString = ''

        for f in students:
            if f.group2 == None:
                studentString += 'INSERT INTO "student"(username, group1, scholarship) VALUES (' + str(f) + ');'
            else:
                studentString += 'INSERT INTO "student"(username, group1, group2, scholarship) VALUES (' + str(f) + ');'
            studentString += "\n"

        return studentString

    def __coursePrioritiesString(self):
        coursePriorityString = ''
        for c in coursePriorities:
            coursePriorityString += 'INSERT INTO "course_priority"(pid, priority) VALUES (' + str(c[0]) + ", '" + c[1] + "');"
            coursePriorityString += '\n'

        return coursePriorityString

    def __courseString(self):
        courses = self.__service.getCourses()

        courseString = ''

        for f in courses:
            courseString += 'INSERT INTO "course"(cid, name, fid, year, teacher, semester, maxstudents, priority, credits) VALUES (' + str(f) + ');'
            courseString += "\n"

        return courseString

    def __optionalCourseString(self):
        optionals = self.__service.getOptionalCourses()

        optionalsString = ''

        for o in optionals:
            optionalsString += 'INSERT INTO "optional_course"(cid, username) VALUES (' + str(o[0]) + ", '" + o[1] + "');"
            optionalsString += '\n'

        return optionalsString

    def __studentEnrollmentString(self):
        enrollments = self.__service.getStudentEnrollments()

        enrollmentsString = ''

        for o in enrollments:
            enrollmentsString += 'INSERT INTO "studentenrollment"(username, fid, year) VALUES (' + str(o) + ");"
            enrollmentsString += '\n'

        return enrollmentsString

    def __optionalEnrollmentString(self):
        optEnroll = self.__service.getOptionalEnrollments()

        optEnrollString = ''

        for o in optEnroll:
            optEnrollString += 'INSERT INTO "optional_course_enrollment"(username, cid, preference) VALUES (' + str(o) + ");"
            optEnrollString += '\n'

        return optEnrollString

    def __gradeString(self):
        grades = self.__service.getGrades()

        gradeString = ''

        for g in grades:
            gradeString += 'INSERT INTO "grade"(gradevalue, username, cid) VALUES (' + str(g) + ");"
            gradeString += '\n'

        return gradeString

    def __run(self):
        self.__service.generateData(self.__noUsers, self.__noTeachers, self.__noStudents, self.__noStaff)

        file = open("generatedData.sql", 'w', encoding='utf-8')

        userInsertString = self.__getUsersString()
        userDataInsertString = self.__getUserDataString()
        staffInsertString = self.__getStaffString()
        teacherInsertString = self.__getTeacherString()
        facultyInsertString = self.__getFacultyString()
        groupInsertString = self.__groupString()
        studentInsertString = self.__studentString()
        coursePrioritiesInsertString = self.__coursePrioritiesString()
        courseInsertString = self.__courseString()
        optionalCourseInsertString = self.__optionalCourseString()
        studentEnrollmentInsertString = self.__studentEnrollmentString()
        optionalEnrollmentInsertString = self.__optionalEnrollmentString()
        gradeInsertString = self.__gradeString()

        file.write(userInsertString)
        file.write("\n")
        file.write(userDataInsertString)
        file.write("\n")
        file.write(staffInsertString)
        file.write("\n")
        file.write(teacherInsertString)
        file.write("\n")
        file.write(facultyInsertString)
        file.write("\n")
        file.write(groupInsertString)
        file.write("\n")
        file.write(studentInsertString)
        file.write("\n")
        file.write(coursePrioritiesInsertString)
        file.write("\n")
        file.write(courseInsertString)
        file.write("\n")
        file.write(optionalCourseInsertString)
        file.write("\n")
        file.write(studentEnrollmentInsertString)
        file.write("\n")
        file.write(optionalEnrollmentInsertString)
        file.write("\n")
        file.write(gradeInsertString)
        file.write("\n")

        file.close()

    def start(self):
        running = True

        while running:
            try:
                self.__readUsers()
                self.__run()
            except UiException as ex:
                print(ex)
                continue

            running = False
