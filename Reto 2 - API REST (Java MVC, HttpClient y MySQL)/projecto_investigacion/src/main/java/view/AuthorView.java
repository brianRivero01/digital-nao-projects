package view;

import java.io.IOException;
import java.net.URISyntaxException;
import javax.swing.*;


public class AuthorView{
	   
		JFrame f;    
	    public void TableAuthor(String authorId, String authorName, String authorAffiliation, String authorEmail) throws IOException, InterruptedException, URISyntaxException{    
	    	
		    f=new JFrame();    
		    
		    //FILAS
		    String data[][]={ {authorId,authorName,authorAffiliation,authorEmail}};    
		           
		    //COLUMNAS
		    String column[]={"ID","NAME","AFFILLIATION","EMAIL"};    
		    
		    //CREAMOS TABLA
		    JTable jt=new JTable(data,column);
		    
		    //TAMAÑO DE RECTANGULO
		    jt.setBounds(30,40,200,300);     
		    //SCROLL
		    JScrollPane sp=new JScrollPane(jt);    
		    f.add(sp);          
		    //TAMAÑO DE VENTANA
		    f.setSize(500,300);  
		    //VER TABLA
		    f.setVisible(true);    
	    }     

}  

