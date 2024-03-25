

class StudentEnrollment:

    def __init__(self, username, fid, year):
        self.__username = username
        self.__fid = fid
        self.__year = year

    @property
    def username(self):
        return self.__username

    @property
    def year(self):
        return self.__year

    @property
    def fid(self):
        return self.__fid

    def __str__(self):
        return "'" + self.__username + "', " + str(self.__fid) + ", " + str(self.__year)
