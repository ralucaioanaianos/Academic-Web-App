

class OptionalEnrollment:

    def __init__(self, username, cid, order):
        self.__username = username
        self.__cid = cid
        self.__order = order

    @property
    def username(self):
        return self.__username

    @property
    def cid(self):
        return self.__cid

    @property
    def order(self):
        return self.__order

    def __str__(self):
        return "'" + self.__username + "', " + str(self.__cid) + ", " + str(self.__order)
