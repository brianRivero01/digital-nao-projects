class MenuTelefonico:
    def mostrar_menu(self):
        print("Bienvenido al menú telefónico:")
        print("1. Saldo")
        print("2. Recargar")
        print("3. Transferir")
        print("4. Salir")

    def procesar_opcion(self, opcion):
        if opcion == "1":
            self.mostrar_saldo()
        elif opcion == "2":
            self.realizar_recarga()
        elif opcion == "3":
            self.realizar_transferencia()
        elif opcion == "4":
            print("Gracias por usar el menú telefónico. ¡Hasta luego!")
            return False
        else:
            print("Opción inválida. Por favor, seleccione una opción válida.")

    def mostrar_saldo(self):
        # Lógica para mostrar el saldo del usuario
        print("Tu saldo actual es $100")

    def realizar_recarga(self):
        # Lógica para realizar una recarga
        print("Recarga exitosa. Tu saldo se ha actualizado.")

    def realizar_transferencia(self):
        # Lógica para realizar una transferencia
        print("Transferencia realizada con éxito.")


menu = MenuTelefonico()

# Loop principal del menú telefónico
while True:
    menu.mostrar_menu()
    opcion = input("Seleccione una opción: ")
    resultado = menu.procesar_opcion(opcion)

    if resultado is False:
        break
