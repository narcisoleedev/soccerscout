"Modulo WebEngine para WebScrapping"
from abc import ABC, abstractmethod
from typing import Literal
from requests import get, Timeout
from bs4 import BeautifulSoup

from playwright.sync_api import sync_playwright
from plugins.scraping.user_agent import UserAgent


class WebEngineException(ValueError):
    "Exception Class WebEngine"

    def __init__(self, *args: object) -> None:
        "Construtor"
        super().__init__(*args)


class WebEngineABC(ABC):
    "Abstract Class WebEngine"

    @abstractmethod
    def get_html(self, url: str) -> str:
        "Abstract Method to Override"
        return ""

    @staticmethod
    def parse_html(html: str) -> BeautifulSoup:
        "Parser Method HTML -> BeautifulSoup"
        return BeautifulSoup(html, "html.parser")


class WebEnginePlaywright(WebEngineABC):
    "Class WebEngine Playwright"

    def get_html(self, url: str) -> str:
        "Extract HTML Method using webdriver"
        process = sync_playwright().start()
        browser = process.firefox.launch(headless=True)
        page = browser.new_page(ignore_https_errors=True)
        try:
            page.goto(url=url, wait_until="load", timeout=0.0)
            html = page.content()
        except TimeoutError:
            html = ""
        page.close()
        browser.close()
        process.stop()
        return html


class WebEngineRequests(WebEngineABC):
    "Class WebEngine Requests"

    def get_html(self, url: str) -> str:
        "Extract HTML Method using requests"
        try:
            response = get(
                url=url, timeout=30, headers={"User-Agent": UserAgent.get_random()}
            )
            return response.text if response.status_code == 200 else ""
        except Timeout:
            return ""


class WebEngine(WebEngineABC):
    "Adapter Class WebEngine"

    def __init__(self, engine: Literal["requests", "driver"]) -> None:
        """
        Valid Engines -> [requests, driver]
        """
        super().__init__()
        self.engine = engine

    def get_html(self, url: str) -> str:
        "Extract Method"
        if self.engine == "requests":
            webengine = WebEngineRequests()
            return webengine.get_html(url)
        if self.engine == "driver":
            webengine = WebEnginePlaywright()
            return webengine.get_html(url)
        raise WebEngineException("Invalid option of a engine")
