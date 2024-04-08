const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Etudiant = new Schema({
    Nom: String,
    Classe: String,
    Note: Number
});

module.exports = mongoose.model("etudiant", Etudiant);