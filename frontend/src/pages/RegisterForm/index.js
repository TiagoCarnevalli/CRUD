import React from 'react';
import './styles.css';

export default function RegisterForm() {
    return (
        <div className='register-container'>
            <div className='content'>
                <h2>Registro de Estabelecimento</h2>
                <form>
                    <input placeholder='Razão Social' required />
                    <input placeholder='Nome Fantasia' />
                    <input placeholder='CNPJ' required />
                    <input placeholder='E-mail' type='email' />
                    <input placeholder='Endereço' />
                    <div className='input-city'>
                        <input placeholder='Cidade' style={{ width: '80%' }} />
                        <input placeholder='UF' style={{ width: '20%' }} />
                    </div>
                    <input placeholder='Telefone' required={false/** Categoria === Supermercado */} />
                    <input placeholder='Data de Cadastro' type='date' />
                    <select placeholder='Categoria'>
                        <option value={null} selected disabled hidden>Categoria</option>
                        <option>Supermercado</option>
                        <option>Restaurante</option>
                        <option>Borracharia</option>
                        <option>Posto</option>
                        <option>Oficina</option>
                    </select>
                    <select placeholder='Status'>
                        <option valeu={null} selected disabled hidden>Status</option>
                        <option>Ativo</option>
                        <option>Inativo</option>
                    </select>
                    <input placeholder='Agência' />
                    <input placeholder='Conta' />
                </form>
                <button type='submit'>Registrar</button>
            </div>
        </div>
    );
}