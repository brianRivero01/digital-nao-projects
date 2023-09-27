package com.example.projecto_investigacion;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Scanner;
import javax.persistence.*;

import org.springframework.boot.autoconfigure.SpringBootApplication;

import controller.AuthorController;
import model.Author;
import view.AuthorView;


@SpringBootApplication
public class ProjectoInvestigacionApplication {

	public static void main(String[] args) throws IOException, InterruptedException, URISyntaxException{
		
		//ABRIMOS CONEXIÓN A BASE DE DATOS
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("PersistenceAppPU");
		//PARA INTERACTUAR CON LA BD 
		EntityManager em = emf.createEntityManager();
		
		try {
			//SE INICIA LA TRANSACCIÓN PARA INSERTAR DATOS A LA BD  
			em.getTransaction().begin();
			
			//INTRODUCIMOS ID DEL AUTHOR DESDE LA CONSOLA
			Scanner reader = new Scanner(System.in);
			System.out.print("Introduzca id del autor: ");
			String id_author = reader.nextLine();
			
			//CREAMOS OBJETO DEL CONTROLADOR
	    	AuthorController authorController = new AuthorController();
	    	
	    	//OBTENEMOS EL AUTOR
	    	Author author = authorController.obtenerAuthor(id_author);
			
			//SE ALMACENA LA ENTIDAD EN LA BD
			em.persist(author);
			em.flush();
			em.getTransaction().commit();
			
			//CREAMOS OBJETO DE LA VISTA
			AuthorView auv = new AuthorView();
			
			//LLAMAMOS AL METODO PARA OBTENER DATOS SOBRE EL AUTOR EN UNA VENTANA
			auv.TableAuthor(author.getKey_author(), author.getName(), author.getAffiliation(), author.getEmail());
			
		}catch (Exception e) {
			//REVERTIR CAMBIOS EN CASO DE QUE ALGO SALGA MAL 
			em.getTransaction().rollback();		}
       
	}

}
