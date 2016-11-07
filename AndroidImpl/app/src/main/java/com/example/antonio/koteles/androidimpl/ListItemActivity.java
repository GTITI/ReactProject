package com.example.antonio.koteles.androidimpl;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import static com.example.antonio.koteles.androidimpl.R.id.receivedTextEditable;
import static com.example.antonio.koteles.androidimpl.R.id.receivedTextId;

//import static com.example.antonio.koteles.androidimpl.MainActivity.addArray;


/**
 * Created by Koteles on 11/6/2016.
 */

public class ListItemActivity extends AppCompatActivity {

    private TextView textReceived;

    private EditText textReceivedEditable;

    private Button saveChanges ;





    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.list_item_activity);

        saveChanges = (Button) findViewById(R.id.saveChangesBtn); // iau butonul de save changes

        String s = getIntent().getStringExtra("itemName");
        final int pos = getIntent().getIntExtra("itemPosition",-1);

        textReceived = (TextView) findViewById(receivedTextId);
        textReceived.setText(s);

        textReceivedEditable = (EditText) findViewById(receivedTextEditable);
        textReceivedEditable.setText(s);

        saveChanges.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
//                String getNewText = textReceivedEditable.getText().toString();
//
//
//
//                if (addArray.contains(getNewText)) {
//                    Toast.makeText(getBaseContext(), "Item already in the list", Toast.LENGTH_LONG).show();
//                } else if (getNewText == null || getNewText.trim().equals("")) {
//                    Toast.makeText(getBaseContext(), "Input is empty", Toast.LENGTH_LONG).show();
//                } else {
//                    textReceived.setText(getNewText);
//                    addArray.set(pos,getNewText);
//                }
            }
        });


    }



}
