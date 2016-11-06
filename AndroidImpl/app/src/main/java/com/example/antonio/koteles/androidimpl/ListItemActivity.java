package com.example.antonio.koteles.androidimpl;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.TextView;

import static com.example.antonio.koteles.androidimpl.R.id.receivedTextId;

/**
 * Created by Koteles on 11/6/2016.
 */

public class ListItemActivity extends AppCompatActivity {

    TextView textReceived;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.list_item_activity);



        String s = getIntent().getStringExtra("itemName");

        textReceived = (TextView) findViewById(receivedTextId);
        textReceived.setText(s);
        


    }
}
