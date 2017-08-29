package com.bridgeLabz.crudOperation.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
@Entity
@Table(name = "student")
public class Student implements Serializable{
	@Id
	@GenericGenerator(name="generate" , strategy="increment")
	@GeneratedValue(generator="generate")
	@Column(name="stud_id")
private int id;
	
	@Column(name="stud_name")
private String name;
	
	@Column(name="stud_branch")
private String branch;

//default constructor
public Student(){
	System.out.println(getClass().getSimpleName());
}
@Override
public String toString() {
	return "Student [id=" + id + ", name=" + name + ", branch=" + branch + "]";
}
public int getId() {
	return id;
}
public void setId(int id) {
	this.id = id;
}
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
public String getBranch() {
	return branch;
}
public void setBranch(String branch) {
	this.branch = branch;
}

}
