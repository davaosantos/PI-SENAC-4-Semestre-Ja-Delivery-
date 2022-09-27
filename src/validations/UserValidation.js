import * as yup from 'yup';

export const userSchema = yup.object().shape({
    nome: yup.string().required("Digite o nome"),
    telefone: yup.number().required("Digite o telefone"),
    email: yup.string().required("Digite o email"),
    data_nascimento: yup.date().required("Digite a data de nascimento"),
    tipo_usuario:yup.string().required("Insira um usuario"),
    cpf:  yup.string().min(11).max(11).required("Insira o cpf"),
    senha: yup.string().required("Insira uma senha")
});


export const updateSchema = yup.object().shape({
    nome: yup.string().required("Digite o nome"),
    telefone: yup.number().required("Digite o telefone"),
    data_nascimento: yup.date().required("Digite a data de nascimento"),
    tipo_usuario:yup.string().required("Insira um usuario"),
    senha: yup.string().required("Insira uma senha")
});

export const modalSchema = yup.object().shape({
    nome: yup.string().required("Digite o nome")
});





export const cpfSchema = yup.object().shape({
    cpf: yup.string().min(11).max(11).required()
});

/** 
 * export const userSchema = yup.object().shape({
    nome: yup.string().required("Digite o nome"),
    telefone: yup.number().required("Digite o telefone"),
    email: yup.string().required("Digite o email"),
    data_nascimento: yup.date().required("Digite a data de nascimento"),
    tipo_usuario:yup.string().required("Insira um usuario"),
    cpf:  yup.string().min(11).max(11).required("Insira o cpf"),
    senha: yup.string().required("Insira uma senha")
});
*/

