

class Teacher:

    def __init__(self, username, name):
        self.__username = username
        self.__name = name

    @property
    def username(self):
        return self.__username

    @property
    def name(self):
        return self.__name

    def __str__(self):
        return "'" + self.__username + "'"
