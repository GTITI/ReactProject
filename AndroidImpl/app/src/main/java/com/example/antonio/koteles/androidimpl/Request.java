package com.example.antonio.koteles.androidimpl;

/**
 * Created by Koteles on 11/7/2016.
 */

// class for REQUEST sent by a customer
public class Request{
    private String name;
    private String address;
    private String productName;
    private String description;


    //constructor
    public Request(String nameParam, String addressParam , String productNameParam, String descriptionParam){
        this.name = nameParam;
        this.address = addressParam;
        this.productName = productNameParam;
        this.description = descriptionParam;
    }

    //getters-setters
    public String getName(){return this.name;}
    public String getAddress(){return this.address;}
    public String getDescription(){return this.description;}
    public String getProductName(){return  this.productName;}

    public void setName(String name){this.name = name;}
    public void setAddress(String address){this.address = address;}
    public void setDescription(String description){this.description = description;}
    public void setProductName(String productName){this.productName = productName;}

    // to string
    public String toString(){
        return "Name: " + this.name + "\nAddress: " + this.address + "\nProduct name: " + this.productName + "\nDesription: " + this.description;
    }
}
