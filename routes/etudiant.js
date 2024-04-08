const express = require('express');
const router = express.Router();
const Etudiant = require('../models/etudinat');
const validateMW = require('../middlewares/validateMW');
const etudiantSchema = require('../validators/etudiantSchema');
router.get("/", async(req, res, next) => {
    const etudiants = await Etudiant.find();
    res.json(etudiants);
});

router.get("/find/:id", validateMW(etudiantSchema), async(req, res, next) => {
    const etudiant = await Etudiant.findById(req.params.id);
    res.json(etudiant);
});

router.post('/add', validateMW(etudiantSchema), async(req, res, next) => {
    const etudiant = new Etudiant({
        Nom: req.body.Nom,
        Classe: req.body.Classe,
        Note: req.body.Note
    });
    await etudiant.save();
    res.json({ message: 'Etudiant added' });
});

router.put("/edit/:id", validateMW(etudiantSchema), async(req, res, next) => {
    const etud = await Etudiant.findById(req.params.id);
    etud.Nom = req.body.Nom;
    etud.Classe = req.body.Classe;
    etud.Note = req.body.Note;
    await etud.save();
    res.json({ message: "Etudiant updated" });
});

router.delete("/delete/:id", validateMW(etudiantSchema), async(req, res, next) => {
    await Etudiant.findByIdAndDelete(req.params.id);
    res.json({ message: "Etudiant deleted" });
});



router.get("/findByName/:name", validateMW(etudiantSchema), async(req, res, next) => {
    const etudiants = await Etudiant.find({ Nom: req.params.name });
    res.json(etudiants);
});

router.put('/updateNote/:id', async(req, res, next) => {
    try {
        const etudiant = await Etudiant.findById(req.params.id);
        if (!etudiant) {
            return res.status(404).json({ message: 'Etudiant not found' });
        }
        etudiant.Note = etudiant.Note + etudiant.Note * 0.2;
        const updatedEtudiant = await etudiant.save();
        res.json(updatedEtudiant);
    } catch (err) {
        next(err);
    }
});



module.exports = router;