import { useForm } from '@inertiajs/inertia-react'
import React, { useState , useEffect } from 'react';

export default function EditTipoFornecedor({close , model}) {

    const {data, setData, put, reset, errors} = useForm({
        nomeTipo: model.nomeTipo,
        descricao: model.descricao,
    });

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        put(route('tipos-fornecedores.update', model.id), {
            data,
            onSuccess: () => {
                reset(),
                close()
            },
        });
    }

    useEffect(() => {
        setData({...data,
            nomeTipo: model.nomeTipo,
            descricao: model.descricao,
        });
    }, [model]);

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="nomeTipo" className="col-form-label">Nome:</label>
                            <input type="text" className="form-control" name='nomeTipo' value={data.nomeTipo} onChange={onChange} id="nomeTipo"/>
                            {errors && <div className='text-danger mt-1'>{errors.nomeTipo}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="descricao" className="col-form-label">Descrição</label>
                            <input type="text" className="form-control" name='descricao' value={data.descricao} onChange={onChange} id="descricao"/>
                            {errors && <div className='text-danger mt-1'>{errors.descricao}</div>}
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
