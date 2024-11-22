import { useForm } from '@inertiajs/inertia-react'
import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { maskPhone, maskCnpj } from '../../../Utils/helpers';

export default function CreateFornecedor({close , tipos}) {
    const [estados, setEstados] = useState([]);
    const [cidades , setCidades] = useState([]);

    const {data, setData, post, reset, errors} = useForm({
        razaoSocial: '',
        cnpj: '',
        telefone: '',
        idTipo: '',
        logradouro:'',
        complemento:'',
        cidade:'',
        estado:'',
    });

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

    const listarEstados = () => {

        axios.get(`https://brasilapi.com.br/api/ibge/uf/v1`)
        .then((response) => {
            setEstados(response.data);
        })
        .catch((error) => {
            console.error("Error fetching related items:", error);
        });
    };

    const listarCidades = (estado) => {

        axios.get(`https://brasilapi.com.br/api/ibge/municipios/v1/${estado}?providers=dados-abertos-br,gov,wikipedia`)
        .then((response) => {
            setCidades(response.data);
        })
        .catch((error) => {
            console.error("Error fetching related items:", error);
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('fornecedores.store'), {
            data,
            onSuccess: () => {
                reset(),
                close()
            },
        });
    }

    useEffect(() => {
        listarEstados();
     }, []);

     useEffect(() => {
         if (data.estado) {
             listarCidades(data.estado);
         }
     }, [data.estado]);

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="razaoSocial" className="col-form-label">Razão social/NomeCompleto</label>
                            <input type="text" className="form-control" name='razaoSocial' value={data.razaoSocial} onChange={onChange} id="razaoSocial"/>
                            {errors && <div className='text-danger mt-1'>{errors.razaoSocial}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="cnpj" className="col-form-label">Cnpj:</label>
                            <input type="text" className="form-control" name='cnpj' value={data.cnpj} onChange={(e)=> setData('cnpj',maskCnpj(e.target.value))} id="cnpj"/>
                            {errors && <div className='text-danger mt-1'>{errors.cnpj}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="telefone" className="col-form-label">Telefone:</label>
                            <input type="text" className="form-control" name='telefone' value={data.telefone} onChange={(e)=> setData('telefone',maskPhone(e.target.value))} id="telefone"/>
                            {errors && <div className='text-danger mt-1'>{errors.telefone}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="idTipo" className="col-form-label">Tipo:</label>
                            <select
                                className="form-control"
                                name='estado'
                                value={data.idTipo}
                                onChange={onChange}
                                id="idTipo"
                            >
                                <option value="">Selecione o Tipo</option>
                                {tipos.map((tipo) => (
                                    <option key={tipo.id} value={tipo.id}>
                                        {tipo.nomeTipo}
                                    </option>
                                ))}
                            </select>
                            {errors && <div className='text-danger mt-1'>{errors.idTipo}</div>}
                        </div>

                        <hr className="horizontal dark" />
                        <p className="text-uppercase text-sm">Informações de Endereço</p>
                        <div className="form-group">
                            <label htmlFor="logradouro" className="col-form-label">Logradouro:</label>
                            <input type="text" className="form-control" name='logradouro' value={data.logradouro} onChange={onChange} id="logradouro"/>
                            {errors && <div className='text-danger mt-1'>{errors.logradouro}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="complemento" className="col-form-label">Complemento:</label>
                            <input type="text" className="form-control" name='complemento' value={data.complemento} onChange={onChange} id="complemento"/>
                            {errors && <div className='text-danger mt-1'>{errors.complemento}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="estado" className="col-form-label">Estado(UF):</label>
                            <select
                                className="form-control"
                                name='estado'
                                value={data.estado}
                                onChange={onChange}
                                id="estado"
                            >
                                <option value="">Selecione um estado</option>
                                {estados.map((estado) => (
                                    <option key={estado.sigla} value={estado.sigla}>
                                        {estado.nome}
                                    </option>
                                ))}
                            </select>
                            {errors && <div className='text-danger mt-1'>{errors.estado}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="cidade" className="col-form-label">Cidade:</label>
                            <select
                                className="form-control"
                                name='cidade'
                                value={data.cidade}
                                onChange={onChange}
                                id="cidade"
                                disabled={!data.estado}
                            >
                                <option value="">Selecione uma cidade</option>
                                {cidades.map((cidade, index) => (
                                    <option key={index} value={cidade.nome}>
                                        {cidade.nome}
                                    </option>
                                ))}
                            </select>
                            {errors && <div className='text-danger mt-1'>{errors.cidade}</div>}
                        </div>

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="submit" className="btn bg-gradient-primary">Salvar</button>
                </div>
            </form>
        </>

    )
}
