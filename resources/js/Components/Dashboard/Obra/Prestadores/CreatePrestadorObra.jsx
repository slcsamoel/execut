import { useForm } from '@inertiajs/inertia-react'
import React, { useState , useEffect } from 'react';


export default function CreatePrestadorObra({close , todosPrestadores, obra}) {

    const {data, setData, post, reset, errors} = useForm({
        idObra: obra.id,
        idPrestador: '',
        dataInicio: '',
    });

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('funcionarios.store',obra.id), {
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
                            <label htmlFor="idPrestador" className="col-form-label">Prestador:</label>
                            <select
                                className="form-control"
                                name='idPrestador'
                                value={data.idPrestador}
                                onChange={onChange}
                                id="idPrestador"
                            >
                                <option value="">Selecione o Prestador</option>
                                {todosPrestadores.map((prestador) => (
                                    <option key={prestador.id} value={prestador.id}>
                                        {prestador.nomePrestador}-{prestador.funcao.nomeFuncao}
                                    </option>
                                ))}
                            </select>
                            {errors && <div className='text-danger mt-1'>{errors.idPrestador}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="dataInicio" className="col-form-label">Data Inicio</label>
                            <input type="date" className="form-control" name='dataInicio' value={data.dataInicio} onChange={onChange} id="dataInicio"/>
                            {errors && <div className='text-danger mt-1'>{errors.dataInicio}</div>}
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
