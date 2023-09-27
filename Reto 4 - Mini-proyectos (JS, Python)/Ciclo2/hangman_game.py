import random

peliculas = ["narnia","avatar","sonic","ratatouille"]

word = random.choice(peliculas).strip()

#cantidad de errores permitidos
errors = 4

#Va a contener todas las letras que ingresemos
intentGuess = []
run = True

while run:
    #Recorremos cada letra de la pelicula elegida
    for letter in word:
        #Si coincide con la que hemos ingresado:
        if letter.lower() in intentGuess:
            print(letter, end = ' ')
        #Sino:
        else:
            print('_', end = " ")

    print("\n")


    intent = input(f'Errors left {errors}. Next try: ')

    intentGuess.append(intent.lower())

    if intent.lower() not in word.lower():
        errors -= 1
        if errors == 0:
            print(f'Haz perdido. La palabra correcta era: {word}')
            break
    
    run = False
    for letter in word:
        if letter.lower() not in intentGuess:
            run = True

if run == False:

    print(f'Haz acertado! La palabra correcta era: {word}')