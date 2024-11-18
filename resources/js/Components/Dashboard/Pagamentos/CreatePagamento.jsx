import { useForm } from '@inertiajs/inertia-react'
import React, { useState , useEffect } from 'react';


export default function CreatePagamento({close}) {

    const {data, setData, post, reset, errors} = useForm({
        tipoPagamento: '',
        moeda: '',
    });

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('pagamentos.store'), {
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
                            <label htmlFor="tipoPagamento" className="col-form-label">Nome do tipo de pagamento </label>
                            <input type="text" className="form-control" name='tipoPagamento' value={data.tipoPagamento} onChange={onChange} id="tipoPagamento"/>
                            {errors && <div className='text-danger mt-1'>{errors.tipoPagamento}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="moeda" className="col-form-label">Moeda</label>
                            <input type="text" className="form-control" name='moeda' value={data.moeda} onChange={onChange} id="moeda"/>
                            {errors && <div className='text-danger mt-1'>{errors.moeda}</div>}
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
