

class Group:

    def __init__(self, id, facultyId, year):
        self.__id = id
        self.__facultyId = facultyId
        self.__year = year

    @property
    def id(self):
        return self.__id

    @property
    def facultyId(self):
        return self.__facultyId

    @property
    def year(self):
        return self.__year

    def __str__(self):
        return str(self.__id) + ", " + str(self.__facultyId) + ", " + str(self.__year)
