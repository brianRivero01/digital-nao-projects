UNIDADES = [
    'cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve',
    'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'
]
def convertir_a_palabras(numero):
    if 0 <= numero <= 19:
        return UNIDADES[numero]
    else:
        return 'Número fuera de rango'

numero = int(input('Ingrese un número: '))
resultado = convertir_a_palabras(numero)
print(f'El número {numero} se escribe como "{resultado}".')
