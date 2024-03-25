

class Student:

    def __init__(self, name, username, scholarship, group1, group2=None):
        self.__name = name
        self.__username = username
        self.__group1 = group1
        self.__group2 = group2
        self.__scholarship = scholarship

    @property
    def username(self):
        return self.__username

    @property
    def name(self):
        return self.__name

    @property
    def group1(self):
        return self.__group1

    @property
    def group2(self):
        return self.__group2

    @property
    def scholarship(self):
        return self.__scholarship

    def __str__(self):
        if self.__group2 == None:
            return "'" + self.__username + "', " + str(self.__group1) + ", " + str(self.__scholarship)
        return "'" + self.__username + "', " + str(self.__group1) + ", " + str(self.__group2) + \
            ", " + str(self.__scholarship)
