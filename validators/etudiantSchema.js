const yup = require('yup');

const etudiantSchema = yup.object().shape({
    Nom: yup.string().required(),
    Classe: yup.string().required(),
    Note: yup.number().min(0).max(20).required(),
});

module.exports = etudiantSchema;