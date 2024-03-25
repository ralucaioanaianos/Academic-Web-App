

class Grade:

    def __init__(self, value, username, cid):
        self.__value = value
        self.__username = username
        self.__cid = cid

    @property
    def value(self):
        return self.__value

    @property
    def username(self):
        return self.__username

    @property
    def cid(self):
        return self.__cid

    def __str__(self):
        return str(self.__value) + ", '" + self.__username + "', " + str(self.__cid)
