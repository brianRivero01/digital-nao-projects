package controller;


import java.io.IOException;
import java.net.URISyntaxException;
import java.net.http.HttpResponse;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.RestController;

import conexion.SerpApiConexion;
import model.Author;


@RestController
public class AuthorController {
	
	 public Author obtenerAuthor(String id) throws IOException, InterruptedException, URISyntaxException {
		 
		 	//LLAMAMOS A LA API
		 	SerpApiConexion conexion = new SerpApiConexion();
		 	HttpResponse<String> response=conexion.llamarApi(id);
	        
		    //CREO OBJETO JSON PARA LUEGO OBTENER DATOS EN ESPECIFICO DE LA API
	        JSONObject obj = new JSONObject(response.body());
	        
	        //LLAMO AL AUTOR
	        Author author = new Author();
	        author = Author.FromJson(obj);
	       
	        return author;

	       
	 }
	
}
