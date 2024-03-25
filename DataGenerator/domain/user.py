

class User:

    def __init__(self, username, password, role):
        self.__username = username
        self.__password = password
        self.__role = role

    @property
    def username(self):
        return self.__username

    @property
    def password(self):
        return self.__password

    @property
    def role(self):
        return self.__role

    def __str__(self):
        return "'" + self.__username + "', '" + self.__password + "', '" + self.__role + "'"
