package com.example.antonio.koteles.androidimpl;

import android.content.Intent;
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

import static com.example.antonio.koteles.androidimpl.R.id.nameInput;

public class MainActivity extends AppCompatActivity {


    Button save ;
    ArrayList<String> addArray  = new ArrayList<String>();
    EditText txt;
    ListView show;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        txt = (EditText) findViewById(nameInput);
        show = (ListView) findViewById(R.id.myListView);
        save = (Button) findViewById(R.id.addBtn);


        save.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String getInput = txt.getText().toString();

                if (addArray.contains(getInput)) {
                    Toast.makeText(getBaseContext(), "Item already there", Toast.LENGTH_LONG).show();
                } else if (getInput == null || getInput.trim().equals("")) {
                    Toast.makeText(getBaseContext(), "IInput is empty", Toast.LENGTH_LONG).show();
                } else {
                    addArray.add(getInput);
                    ArrayAdapter<String> adapter = new ArrayAdapter<String>(MainActivity.this, android.R.layout.simple_list_item_1, addArray);
                    show.setAdapter(adapter);
                    ((EditText) findViewById(R.id.nameInput)).setText("");
                }
            }
        });



        // event for clicking on a list view item
        // opens a new activity
        show.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                // iau stringul itemului selectat
                String selectedFromList =(String) (show.getItemAtPosition(position));

                // trimit spre activitatea ce se va deschide stringul
                Intent myIntent = new Intent(view.getContext(), ListItemActivity.class).putExtra("itemName",selectedFromList);

                // pornesc noua activitate
                startActivityForResult(myIntent, 0);

            }
        });

    }
}
