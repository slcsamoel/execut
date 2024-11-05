import { useForm } from '@inertiajs/inertia-react'
import React, { useState , useEffect } from 'react';


export default function EditPrestadorObra({close , model ,obra}) {

    const {data, setData, put, reset, errors} = useForm({
        dataFim : '',
        nomePrestador: model.prestador? model.prestador.nomePrestador : '',
    });

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        put(route('funcionarios.update',obra.id ,model.id), {
            data,
            onSuccess: () => {
                reset(),
                close()
            },
        });
    }

    useEffect(() => {
        setData({...data,
            nomePrestador: model.prestador ? model.prestador.nomePrestador : '',
        });
    }, [model]);

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
                            <label htmlFor="dataFim" className="col-form-label">Data Fim</label>
                            <input type="date" className="form-control" name='dataFim' value={data.dataFim} onChange={onChange} id="dataFim"/>
                            {errors && <div className='text-danger mt-1'>{errors.dataFim}</div>}
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
