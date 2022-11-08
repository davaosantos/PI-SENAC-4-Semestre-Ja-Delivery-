import * as yup from 'yup';

export const clienteSchema = yup.object().shape({
    nome: yup.string().required("Digite o nome").min(8)
});
