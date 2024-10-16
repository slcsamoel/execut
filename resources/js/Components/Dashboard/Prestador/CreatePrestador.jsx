import { useForm } from '@inertiajs/inertia-react'
import React, { useState , useEffect } from 'react';


export default function CreatePrestador({close , funcoes}) {

    const {data, setData, post, reset, errors} = useForm({
        nomePrestador: '',
        tipoPrestador: '',
        cpfCnpj: '',
        telefone: '',
        idFuncao: '',
        valorDiaria: ''
    });

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('prestadores.store'), {
            data,
            onSuccess: () => {
                reset(),
                close()
            },
        });
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="nomePrestador" className="col-form-label">Nome:</label>
                            <input type="text" className="form-control" name='nomePrestador' value={data.nomePrestador} onChange={onChange} id="nomePrestador"/>
                            {errors && <div className='text-danger mt-1'>{errors.nomePrestador}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="tipoPrestador" className="col-form-label">Tipo</label>
                            <input type="text" className="form-control" name='tipoPrestador' value={data.tipoPrestador} onChange={onChange} id="tipoPrestador"/>
                            {errors && <div className='text-danger mt-1'>{errors.tipoPrestador}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="cpfCnpj" className="col-form-label">CPF/CNPJ</label>
                            <input type="text" className="form-control" name='cpfCnpj' value={data.cpfCnpj} onChange={onChange} id="cpfCnpj"/>
                            {errors && <div className='text-danger mt-1'>{errors.cpfCnpj}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="telefone" className="col-form-label">Telefone</label>
                            <input type="text" className="form-control" name='telefone' value={data.telefone} onChange={onChange} id="telefone"/>
                            {errors && <div className='text-danger mt-1'>{errors.telefone}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="idFuncao" className="col-form-label">Função:</label>
                            <select
                                className="form-control"
                                name='estado'
                                value={data.idFuncao}
                                onChange={onChange}
                                id="idFuncao"
                            >
                                <option value="">Selecione uma função</option>
                                {funcoes.map((funcao) => (
                                    <option key={funcao.id} value={funcao.id}>
                                        {funcao.nomeFuncao}
                                    </option>
                                ))}
                            </select>
                            {errors && <div className='text-danger mt-1'>{errors.idFuncao}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="valorDiaria" className="col-form-label">Valor Diaria</label>
                            <input type="text" className="form-control" name='valorDiaria' value={data.valorDiaria} onChange={onChange} id="valorDiaria"/>
                            {errors && <div className='text-danger mt-1'>{errors.valorDiaria}</div>}
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
