from service.service import Service
from ui.consoleUi import ConsoleUi

if __name__ == '__main__':
    service = Service()
    console = ConsoleUi(service)
    console.start()
