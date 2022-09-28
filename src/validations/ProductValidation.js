import * as yup from 'yup';

export const productSchema = yup.object().shape({
    nome: yup.string().max(200).required("Digite o nome do produto"),
    avaliacao: yup.number().required("Insira uma avaliação"),
    descricao: yup.string().max(2000).required("Digite a descrição do produto"),
    preco: yup.date().required("Digite o preço do produto"),
    quantidade: yup.number().required("Insira a quantidade em estoque"),
});

export const nomeProductSchema = yup.object().shape({
    nome: yup.string().max(200).required("Digite o nome do produto")
});

export const descricaoProductSchema = yup.object().shape({
    descricao: yup.string().max(2000).required("Digite a descrição do produto")
});

