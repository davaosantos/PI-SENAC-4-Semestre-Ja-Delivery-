import * as yup from 'yup';

export const userSchema = yup.object().shape({
    nome: yup.string().required(),
    telefone: yup.number().required(),
    email: yup.string().required(),
    data_nascimento: yup.date().required(),
    tipo_usuario:yup.string().required(),
    cpf:  yup.string().min(11).max(11).required(),
    senha: yup.string().required()
});

export const cpfSchema = yup.object().shape({
    cpf: yup.string().min(11).max(11).required()
});

