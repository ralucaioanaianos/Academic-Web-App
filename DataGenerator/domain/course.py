
class Course:

    def __init__(self, id, name, fid, year, teacher, semester, maxStud, priority, credits):
        self.__id = id
        self.__name = name
        self.__fid = fid
        self.__year = year
        self.__teacher = teacher
        self.__semester = semester
        self.__maxStud = maxStud
        self.__priority = priority
        self.__credits = credits

    @property
    def id(self):
        return self.__id

    @property
    def name(self):
        return self.__name

    @property
    def fid(self):
        return self.__fid

    @property
    def year(self):
        return self.__year

    @property
    def teacher(self):
        return self.__teacher

    @property
    def semester(self):
        return self.__semester

    @property
    def maxStud(self):
        return self.__maxStud

    @property
    def priority(self):
        return self.__priority

    @property
    def credits(self):
        return self.__credits

    def __str__(self):
        return str(self.__id) + ", '" + self.__name + "', " + str(self.__fid) + ", " + str(self.__year) + \
               ", '" + self.__teacher + "', " + str(self.__semester) + ", " + str(self.__maxStud) + \
               ", " + str(self.__priority) + ", " + str(self.__credits)
