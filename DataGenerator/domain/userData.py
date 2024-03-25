
class UserData:

    def __init__(self, username, name, surname, email, phone, address, cnp):
        self.__username = username
        self.__name = name
        self.__surname = surname
        self.__email = email
        self.__phone = phone
        self.__address = address
        self.__cnp = cnp

    @property
    def username(self):
        return self.__username

    @property
    def name(self):
        return self.__name

    @property
    def surname(self):
        return self.__surname

    @property
    def email(self):
        return self.__email

    @property
    def phone(self):
        return self.__phone

    @property
    def address(self):
        return self.__address

    @property
    def cnp(self):
        return self.__cnp

    def __str__(self):
        return "'" + self.__username + "', '" + self.__name + "', '" + self.__surname + "', '" + self.__email + \
               "', '" + self.__phone + "', '" + self.__address + "', '" + self.__cnp + "'"
