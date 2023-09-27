#IMPORTAMOS LIBRERIAS 
#Para extraer datos de HTML
from bs4 import BeautifulSoup
#Para realizar la solicitud GET
import requests

#Hacemos la solicitud a la página y la almacenamos
page_to_scrape = requests.get("http://quotes.toscrape.com")

#Usamos la libreria BEAUTIFULSOUP para almacenar la pag. en una variable
soup = BeautifulSoup(page_to_scrape.text, 'html.parser')

#Guardamos todos aquellos elementos que tengan el atributo text [citas]
#quotes es una lista
quotes = soup.findAll('span', attrs={'class':'text'})

#Guardamos todos aquellos elementos que tengan el atributo author
#authors es una lista
authors = soup.findAll('small', attrs={"class":"author"})

#Usando zip iteramos las dos listas a la vez
for quote, author in zip(quotes, authors):
    print(quote.text + " - " + author.text)