import { useForm } from '@inertiajs/inertia-react'
import React, { useState , useEffect } from 'react';
import { formatarCampoTextParaNumerico } from '../../../../Utils/helpers';


export default function CreateMateriasObra({close , Fornecedores, obra}) {

    const {data, setData, post, reset, errors} = useForm({
        idObra: obra.id,
        nomeMaterial: '',
        descricaoMaterial: '',
        valor: '',
        idFornecedor: '',
    });

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('materiais.store',obra.id), {
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
                            <label htmlFor="idFornecedor" className="col-form-label">Fornecedor:</label>
                            <select
                                className="form-control"
                                name='idFornecedor'
                                value={data.idFornecedor}
                                onChange={onChange}
                                id="idFornecedor"
                            >
                                <option value="">Selecione o Fornecedor</option>
                                {Fornecedores.map((fornecedor) => (
                                    <option key={fornecedor.id} value={fornecedor.id}>
                                        {fornecedor.razaoSocial}
                                    </option>
                                ))}
                            </select>
                            {errors && <div className='text-danger mt-1'>{errors.idFornecedor}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="nomeMaterial" className="col-form-label">Nome:</label>
                            <input type="text" className="form-control" name='nomeMaterial' value={data.nomeMaterial} onChange={onChange} id="nomeMaterial" />
                            {errors && <div className='text-danger mt-1'>{errors.nomeMaterial}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="descricaoMaterial" className="col-form-label">Descrição:</label>
                            <textarea type="text" className="form-control" name='descricaoMaterial' value={data.descricaoMaterial} onChange={onChange} id="descricaoMaterial" />
                            {errors && <div className='text-danger mt-1'>{errors.descricaoMaterial}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="valor" className="col-form-label">Valor:</label>
                            <input type="text" className="form-control" name='valor' value={data.valor} onInput={e => formatarCampoTextParaNumerico(e)} onChange={onChange} id="valor" />
                            {errors && <div className='text-danger mt-1'>{errors.valor}</div>}
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