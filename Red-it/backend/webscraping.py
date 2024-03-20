import requests
from bs4 import BeautifulSoup
import re
# The URL of the webpage you want to extract text from
def getWebPageContent(url):
    response = requests.get(url)
    webpage = response.content

    # Create a BeautifulSoup object and specify the parser
    soup = BeautifulSoup(webpage, 'html.parser')
    pattern = re.compile(r'\[.*?\]')
    # Find all paragraph tags and extract text
    paragraphs = soup.find_all('p')
    extracted_text = ''
    for paragraph in paragraphs:
        text_without_quotes_or_newlines = paragraph.text.replace('"', '').replace("'", "").replace("\n", " ").replace("\r", " ")
        text_without_quotes_or_newlines = re.sub(pattern, '', text_without_quotes_or_newlines)
        extracted_text += text_without_quotes_or_newlines
    return extracted_text
