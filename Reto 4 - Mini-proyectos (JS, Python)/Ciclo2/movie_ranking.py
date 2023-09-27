import requests
from bs4 import BeautifulSoup

url = 'https://www.boxofficemojo.com/year/world/2018/'

response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Buscar la tabla que contiene el ranking de películas
tabla = soup.find('table', class_='mojo-body-table')

# Buscar todas las filas de la tabla
# Retorna una lista
filas = tabla.find_all('tr')

# Recorrer las filas para obtener la información de cada película
ranking = []
for fila in filas[1:11]:  # Ignorar la primera fila de encabezado y tomar solo las 10 primeras filas
    columnas = fila.find_all('td')
    posicion = columnas[0].text.strip() #Elimina espacios en blanco 
    titulo = columnas[1].text.strip()
    recaudacion = columnas[2].text.strip()

    ranking.append((posicion, titulo, recaudacion))

# Mostrar el ranking
print('Ranking de películas (2018):')
for posicion, titulo, recaudacion in ranking:
    print(f'{posicion}. {titulo} - Recaudación: {recaudacion}')
