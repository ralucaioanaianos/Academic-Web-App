import names
import string
import random

from domain.course import Course
from domain.faculty import Faculty
from domain.grade import Grade
from domain.group import Group
from domain.optionalEnrollment import OptionalEnrollment
from domain.staff import Staff
from domain.student import Student
from domain.studentEnrollment import StudentEnrollment
from domain.teacher import Teacher
from domain.user import User
from domain.userData import UserData
from utils.faculties import *
from utils.coursePriorities import *


class Service:

    def __init__(self):
        self.__users = []
        self.__userData = []
        self.__teachers = []
        self.__students = []
        self.__staff = []
        self.__faculties = []
        self.__groups = []
        self.__courses = []
        self.__optionalCourses = []
        self.__studentEnrollments = []
        self.__optionalEnrollments = []
        self.__grades = []

    def __generateUser(self, fullName, role):
        username = fullName.split(' ')
        username = (username[0] + username[1]).lower()

        for us in self.__users:
            if us.username == username:
                return None

        S = random.randint(8, 12)

        password = ''.join(random.choices(string.ascii_uppercase + string.digits, k=S))

        return User(username, password, role)

    def __generateUserData(self, fullName):
        username = fullName.split(' ')
        name = username[0]
        surname = username[1]
        username = (username[0] + username[1]).lower()
        email = username + '@yahoo.com'
        phone = ''.join(random.choice('0123456789') for _ in range(10))
        address = ''.join(random.choice(string.ascii_lowercase) for _ in range(random.randint(10, 15)))
        cnp = ''.join(random.choice('0123456789') for _ in range(13))

        return UserData(username, name, surname, email, phone, address, cnp)

    def __generateTeachers(self, noTeachers):
        for i in range(noTeachers):
            fullName = names.get_full_name()

            user = self.__generateUser(fullName, "teacher")
            if user == None:
                return
            userData = self.__generateUserData(fullName)
            teacher = Teacher(user.username, fullName)

            self.__users.append(user)
            self.__userData.append(userData)
            self.__teachers.append(teacher)

    def __generateStaff(self, noStaff):
        for i in range(noStaff):
            fullName = names.get_full_name()

            user = self.__generateUser(fullName, "staff")
            if user == None:
                return
            userData = self.__generateUserData(fullName)
            staff = Staff(user.username, fullName)

            self.__users.append(user)
            self.__userData.append(userData)
            self.__staff.append(staff)

    def __generateFaculties(self):
        chiefs = random.sample([teacher.username for teacher in self.__teachers], noSections)

        id = 1

        for faculty in faculties.keys():
            for section in faculties[faculty].keys():
                name = faculty
                sec = section
                noYears = 3
                ch = chiefs[id - 1]

                fac = Faculty(id, name, sec, noYears, ch)

                self.__faculties.append(fac)

                id += 1

    def __generateGroups(self):
        id = 1

        for fac in self.__faculties:
            for i in range(fac.noYears):
                for _ in range(noGroupsPerSection):
                    group = Group(id, fac.id, i + 1)

                    self.__groups.append(group)

                    id += 1

    def __generateStudents(self, noStudents):
        for i in range(noStudents):
            fullName = names.get_full_name()

            group1 = random.choice(self.__groups)
            group2 = random.choice(self.__groups)
            while group2.id == group1.id or (group2.facultyId == group1.facultyId and group2.year == group1.year):
                group2 = random.choice(self.__groups)

            prob = random.uniform(0, 1)

            if prob < 0.9:
                group2 = None

            user = self.__generateUser(fullName, "student")
            if user == None:
                return
            userData = self.__generateUserData(fullName)
            if group2 != None:
                student = Student(fullName, user.username, 0, group1.id, group2.id)
            else:
                student = Student(fullName, user.username, 0, group1.id)

            self.__users.append(user)
            self.__userData.append(userData)
            self.__students.append(student)

    def __generateCourses(self):
        id = 1

        for fac in self.__faculties:
            for course in faculties[fac.name][fac.section]:
                name = course[0]
                fid = fac.id
                year = course[2] // 2 + course[2] % 2
                teacehr = random.choice([t.username for t in self.__teachers])
                semester = course[2]
                maxStud = random.randint(150, 215)
                priority = course[1]
                credit = random.randint(1, 7)

                c = Course(id, name, fid, year, teacehr, semester, maxStud, priority, credit)
                self.__courses.append(c)

                id += 1

    def __generateOptionalCourses(self):
        for course in self.__courses:
            if course.priority == 2:
                id = course.id
                teacher = course.teacher

                self.__optionalCourses.append((id, teacher))

    def __generateStudentEnrollment(self):
        for student in self.__students:
            gr1Id = student.group1
            gr2Id = student.group2

            for group in self.__groups:
                if group.id == gr1Id:
                    enr = StudentEnrollment(student.username, group.facultyId, group.year)
                    self.__studentEnrollments.append(enr)
                elif gr2Id != None and group.id == gr2Id:
                    enr = StudentEnrollment(student.username, group.facultyId, group.year)
                    self.__studentEnrollments.append(enr)

    def __optionalEnrollment(self, noStudents):
        nrSt = random.randint(noStudents / 2, noStudents)

        studentEnrollments = random.sample(self.__studentEnrollments, nrSt)

        for enrollment in studentEnrollments:
            r = random.randint(1, 5)

            if enrollment.year == 1:
                continue

            i = 1

            cids = random.sample([optional[0] for optional in self.__optionalCourses], r)

            for cid in cids:
                opEnr = OptionalEnrollment(enrollment.username, cid, i)
                i += 1
                ok = True
                for oE in self.__optionalEnrollments:
                    if oE.username == opEnr.username and oE.cid == opEnr.cid:
                        ok = False
                if ok:
                    self.__optionalEnrollments.append(opEnr)

    def __generateGrades(self):
        for enrollment in self.__studentEnrollments:
            for course in self.__courses:
                if enrollment.fid == course.fid and enrollment.year == course.year:
                    grade = Grade(random.randint(1, 10), enrollment.username, course.id)

                    self.__grades.append(grade)

    def getGrades(self):
        return self.__grades

    def getOptionalEnrollments(self):
        return self.__optionalEnrollments

    def getStudentEnrollments(self):
        return self.__studentEnrollments

    def getOptionalCourses(self):
        return self.__optionalCourses

    def getCourses(self):
        return self.__courses

    def getStudents(self):
        return self.__students

    def getGroups(self):
        return self.__groups

    def getFaculties(self):
        return self.__faculties

    def getTeachers(self):
        return self.__teachers

    def getStaff(self):
        return self.__staff

    def getUserData(self):
        return self.__userData

    def getUsers(self):
        return self.__users

    def generateData(self, noUsers, noTeachers, noStudents, noStaff):
        self.__generateStaff(noStaff)
        self.__generateTeachers(noTeachers)
        self.__generateFaculties()
        self.__generateGroups()
        self.__generateStudents(noStudents)
        self.__generateCourses()
        self.__generateOptionalCourses()
        self.__generateStudentEnrollment()
        self.__optionalEnrollment(noStudents)
        self.__generateGrades()
