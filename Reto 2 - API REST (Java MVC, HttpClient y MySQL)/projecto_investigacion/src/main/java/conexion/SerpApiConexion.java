package conexion;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class SerpApiConexion {
	
	public HttpResponse<String> llamarApi(String id) throws IOException, InterruptedException, URISyntaxException{
		
	 	//SE CREA HttpCLient
		HttpClient client = HttpClient.newHttpClient();
		
		//PARAMETROS
		String url = "https://serpapi.com/search?engine=google_scholar_author";
		String apiKey = "cf5e3f023ca0afe26c366be2462dc8f41867d7ab1664768f66445c1772889013";
		Integer num = 0;
		
		//URL DE API
		//https://serpapi.com/search?engine=google_scholar_author&api_key=xxxxxxxxxx&author_id=xxxxxxxxxxx&num=xxx
	    String requestUrl = url + "&api_key=" + apiKey + "&author_id=" + id + "&num=" + num;
	    
	    //SOLICITUD GET
	    HttpRequest request = HttpRequest.newBuilder()
	            .uri(URI.create(requestUrl))
	            .build();
	    
	    HttpResponse<String> response = client.send(request,
	            HttpResponse.BodyHandlers.ofString());
	
	    //System.out.println(response.body());
	    
	    return response;
	}
    
}
