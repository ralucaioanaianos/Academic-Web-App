

class Faculty:

    def __init__(self, id, name, section, noYears, chief):
        self.__id = id
        self.__name = name
        self.__section = section
        self.__noYears = noYears
        self.__chief = chief

    @property
    def id(self):
        return self.__id

    @property
    def name(self):
        return self.__name

    @property
    def section(self):
        return self.__section

    @property
    def noYears(self):
        return self.__noYears

    @property
    def chief(self):
        return self.__chief

    def __str__(self):
        return str(self.__id) + ", '" + self.__name + "-" + self.__section + "', " + str(self.__noYears) + ", '" + self.__chief + "'"
