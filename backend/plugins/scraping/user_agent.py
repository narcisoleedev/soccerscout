"Módulo para randomização de UserAgent em requests"
from enum import Enum
from random import randint


class UserAgent(str, Enum):
    "Enum User Agent para requests"
    OPERA = """
        Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) 
        Chrome/51.0.2704.106 Safari/537.36 OPR/38.0.2220.41
    """.strip().replace(
        "\n", ""
    )
    CHROME = """
        Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko)
        Chrome/51.0.2704.103 Safari/537.36
    """.strip().replace(
        "\n", ""
    )
    SAFARI = """
        Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 
        (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1
    """.strip().replace(
        "\n", ""
    )

    @staticmethod
    def get_random():
        "Método randomico de acesso ao Enum"
        agents = [UserAgent.OPERA, UserAgent.CHROME, UserAgent.SAFARI]
        return agents[randint(0, len(agents) - 1)].value
