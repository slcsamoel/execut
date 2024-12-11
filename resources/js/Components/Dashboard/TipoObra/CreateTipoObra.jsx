import { useForm } from '@inertiajs/inertia-react'
import React, { useState , useEffect } from 'react';


export default function CreateTipoObra({close}) {

    const {data, setData, post, reset, errors} = useForm({
        nomeTipo: '',
        descricaoTipo: '',
    });

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('tipos-obras.store'), {
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
                            <label htmlFor="nomeTipo" className="col-form-label">Nome:</label>
                            <input type="text" className="form-control" name='nomeTipo' value={data.nomeTipo} onChange={onChange} id="nomeTipo"/>
                            {errors && <div className='text-danger mt-1'>{errors.nomeTipo}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="descricaoTipo" className="col-form-label">Descrição</label>
                            <input type="text" className="form-control" name='descricaoTipo' value={data.descricaoTipo} onChange={onChange} id="descricaoTipo"/>
                            {errors && <div className='text-danger mt-1'>{errors.descricaoTipo}</div>}
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