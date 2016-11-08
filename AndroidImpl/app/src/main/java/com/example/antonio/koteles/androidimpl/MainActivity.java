package com.example.antonio.koteles.androidimpl;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.Iterator;

import static com.example.antonio.koteles.androidimpl.R.id.addressInput;
import static com.example.antonio.koteles.androidimpl.R.id.descriptionInput;
import static com.example.antonio.koteles.androidimpl.R.id.nameInput;
import static com.example.antonio.koteles.androidimpl.R.id.productNameInput;

public class MainActivity extends AppCompatActivity {


    // buttons
    private Button save ;
    private Button refresh;


    // inputs
    private EditText nameTxt;
    private EditText addressTxt;
    private EditText productNameTxt;
    private EditText descriptionTxt;


    // list view
    public static ListView show;

    // the array that holds the requests
    public  static ArrayList<Request> requestsArray  = new ArrayList<Request>();

    Request a = new Request("Antonio Koteles", "Via Csutakos 79 Salonta", "Samsung galaxy s4", "Ecranul este fisurat");
    Request b = new Request("George Buz", "MIhai Eminescu 45 Ciumeghiu", "Iphone 4s", "Butonul de start nu mai raspunde");



    // function for sending email based on the introduced requests
    public void sendMail(View view){

        String reqString = "\n------------------------------------------------\n";
        for(int i = 0; i< requestsArray.size() ; i++){
            reqString += requestsArray.get(i).toString();
            reqString += "\n------------------------------------------------\n";
        }

        Intent intent = null, chooser = null;

        intent = new Intent(Intent.ACTION_SEND);
        intent.setData(Uri.parse("mailto:"));
        String[] to = {"k.antonio_16@yahoo.com"};
        intent.putExtra(Intent.EXTRA_EMAIL, to);
        intent.putExtra(Intent.EXTRA_SUBJECT,"Trims de Toni");
        intent.putExtra(Intent.EXTRA_TEXT,"Requests list: \n" + reqString);
        intent.setType("message/rfc822");
        chooser = Intent.createChooser(intent, "Send email");
        startActivity(chooser);
    }


    // checks if a request is contained by a list of requests comparing each field
    public static boolean contains(ArrayList<Request> list, Request r){
        for(Iterator<Request> i = list.iterator(); i.hasNext(); ) {
            Request rec = i.next();
            if(rec.getAddress().equals(r.getAddress()) && rec.getDescription().equals(r.getDescription())
                    && rec.getName().equals(r.getName()) && rec.getProductName().equals(r.getProductName())){
                return true;
            }
        }
        return false;
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        requestsArray.add(a);requestsArray.add(b);

    // initializez componentele de UI
        nameTxt = (EditText) findViewById(nameInput);
        addressTxt = (EditText) findViewById(addressInput);
        productNameTxt = (EditText) findViewById(productNameInput);
        descriptionTxt = (EditText) findViewById(descriptionInput);

        show = (ListView) findViewById(R.id.myListView);
        save = (Button) findViewById(R.id.addBtn);
        refresh = (Button) findViewById(R.id.refreshBtn);


        refresh.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(requestsArray.isEmpty()){
                    Toast.makeText(getBaseContext(), "List is empty", Toast.LENGTH_LONG).show();
                }else{
                    ArrayAdapter<Request> adapter = new ArrayAdapter<Request>(MainActivity.this, android.R.layout.simple_list_item_1, requestsArray);
                    show.setAdapter(adapter);
                }

            }
        });





        // saves a new request in the list and shows it into the list view
        save.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String getName = nameTxt.getText().toString();
                String getAddress = addressTxt.getText().toString();
                String getProductName = productNameTxt.getText().toString();
                String getDescription = descriptionTxt.getText().toString();

                Request r = new Request(getName, getAddress, getProductName, getDescription);

                if (contains(requestsArray,r)) {
                    Toast.makeText(getBaseContext(), "Item already in the list", Toast.LENGTH_LONG).show();
                } else if (getName == null || getName.trim().equals("") || getAddress == null ||
                        getAddress.equals("") || getProductName == null || getProductName.equals("") ||
                        getDescription == null || getDescription.equals("")) {
                    Toast.makeText(getBaseContext(), "Some input is empty", Toast.LENGTH_LONG).show();
                } else {

                    requestsArray.add(r);
                    ArrayAdapter<Request> adapter = new ArrayAdapter<Request>(MainActivity.this, android.R.layout.simple_list_item_1, requestsArray);
                    show.setAdapter(adapter);
                    ((EditText) findViewById(R.id.nameInput)).setText("");
                    ((EditText) findViewById(R.id.addressInput)).setText("");
                    ((EditText) findViewById(R.id.productNameInput)).setText("");
                    ((EditText) findViewById(R.id.descriptionInput)).setText("");

                }
            }
        });



        // event for clicking on a list view item
        // opens a new activity
        show.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                // iau requestul  selectat
                Request selectedFromList =(Request) (show.getItemAtPosition(position));

                // trimit spre activitatea ce se va deschide stringul
                Intent myIntent = new Intent(view.getContext(), ListItemActivity.class);
                myIntent.putExtra("itemName",selectedFromList.getName());
                myIntent.putExtra("itemAddress",selectedFromList.getAddress());
                myIntent.putExtra("itemProductName",selectedFromList.getProductName());
                myIntent.putExtra("itemDescription",selectedFromList.getDescription());
                myIntent.putExtra("itemPosition",position);

                // pornesc noua activitate
                startActivityForResult(myIntent, 0);

            }
        });

    }
}
