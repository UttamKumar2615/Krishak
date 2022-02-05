import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import firebase from "firebase/app";
import App from "./App";

const firebaseConfig = {
  apiKey: "AIzaSyCyElIsjiwwHfd4-4xV32-TMUZZnlNcnXo",
  authDomain: "krishi-mart-ut.firebaseapp.com",
  projectId: "krishi-mart-ut",
  storageBucket: "krishi-mart-ut.appspot.com",
  messagingSenderId: "1008860817961",
  appId: "1:1008860817961:web:76c13d7dc906afad794a38",
  measurementId: "G-BQBX7XFPPK",
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let root = document.getElementById("root");
ReactDOM.render(<App />, root);
