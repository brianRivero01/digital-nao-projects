package model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.json.JSONObject;

@Entity
public class Author {
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "id_author")
	private String key_author;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "affiliation")
	private String affiliation;
	
	@Column(name = "email")
	private String email;
	
	
	public Author() {

	}
	
	public static Author FromJson(JSONObject obj) {

		String authorId = obj.getJSONObject("search_metadata").getString("id");
		String authorName = obj.getJSONObject("author").getString("name");
		String authorAffiliation = obj.getJSONObject("author").getString("affiliations");
		String authorEmail = obj.getJSONObject("author").getString("email");
		
	    return new Author(authorId,authorName, authorAffiliation, authorEmail);
	    
	}
	

	public Author(String key_author, String name, String affiliation, String email) {
		this.key_author = key_author;
		this.name = name;
		this.affiliation = affiliation;
		this.email = email;
	}


	public String getKey_author() {
		return key_author;
	}


	public void setKey_author(String key_author) {
		this.key_author = key_author;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getAffiliation() {
		return affiliation;
	}


	public void setAffiliation(String affiliation) {
		this.affiliation = affiliation;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}
	
	
}
