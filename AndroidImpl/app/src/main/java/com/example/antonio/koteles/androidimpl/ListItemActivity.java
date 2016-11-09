package com.example.antonio.koteles.androidimpl;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import static com.example.antonio.koteles.androidimpl.MainActivity.contains;
import static com.example.antonio.koteles.androidimpl.MainActivity.requestsArray;
import static com.example.antonio.koteles.androidimpl.R.id.receivedTextAddress;
import static com.example.antonio.koteles.androidimpl.R.id.receivedTextDescription;
import static com.example.antonio.koteles.androidimpl.R.id.receivedTextName;
import static com.example.antonio.koteles.androidimpl.R.id.receivedTextProductName;


/**
 * Created by Koteles on 11/6/2016.
 */

public class ListItemActivity extends AppCompatActivity {


    // editable texts
    private EditText textReceivedName;
    private EditText textReceivedAddress;
    private EditText textReceivedProductName;
    private EditText textReceivedDescription;

    // button for saving changes
    private Button saveChanges ;





    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.list_item_activity);

        saveChanges = (Button) findViewById(R.id.saveChangesBtn); // iau butonul de save changes

        String nameGet = getIntent().getStringExtra("itemName");
        String addressGet = getIntent().getStringExtra("itemAddress");
        String productNameGet = getIntent().getStringExtra("itemProductName");
        String descriptionGet = getIntent().getStringExtra("itemDescription");
        final int pos = getIntent().getIntExtra("itemPosition",-1);



        // editabilele
        textReceivedName = (EditText) findViewById(receivedTextName);
        textReceivedName.setText(nameGet);

        textReceivedAddress = (EditText) findViewById(receivedTextAddress);
        textReceivedAddress.setText(addressGet);

        textReceivedProductName = (EditText) findViewById(receivedTextProductName);
        textReceivedProductName.setText(productNameGet);

        textReceivedDescription = (EditText) findViewById(receivedTextDescription);
        textReceivedDescription.setText(descriptionGet);

        // on click saves the changes
        saveChanges.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String getNewName = textReceivedName.getText().toString();
                String getNewAddress = textReceivedAddress.getText().toString();
                String getNewProductName = textReceivedProductName.getText().toString();
                String getNewDescription = textReceivedDescription.getText().toString();

                Request r = new Request(getNewName,getNewAddress,getNewProductName,getNewDescription);

                if (contains(requestsArray,r)) {
                    Toast.makeText(getBaseContext(), "Item already in the list", Toast.LENGTH_LONG).show();
                } else if (getNewName == null || getNewName.trim().equals("") || getNewAddress == null ||
                        getNewAddress.equals("") || getNewProductName == null || getNewProductName.equals("") ||
                        getNewDescription == null || getNewDescription.equals("")) {
                    Toast.makeText(getBaseContext(), "Some input is empty", Toast.LENGTH_LONG).show();
                } else {
                    requestsArray.set(pos,r);
                    Toast.makeText(getBaseContext(), "Saved", Toast.LENGTH_LONG).show();
                    finish();
                }
            }
        });


    }



}
