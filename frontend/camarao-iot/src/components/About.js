import React, { Component } from 'react';
import AuthService from '../AuthService'
import './About.css';
import Logo from './Logo';
import { Link } from 'react-router-dom';


class About extends Component {
    constructor(){
        super();
        this.Auth = new AuthService()
        this.user = this.Auth.getUser()
    }
    render() {
        return(
            <div className="App-main">
                <Logo />
                <div className='Devs'>
                Camarão IoT foi um projeto desenvolvido originalmente para a disciplina COS603 - Desenvolvimento de Software Orientado a Objetos, ministrada na UFRJ pelo professor Guilherme Horta Travassos em conjunto dos seus alunos de mestrado no primeiro período de 2018.<br/><br/>
                A construção desse projeto envolveu a pesquisa sobre o ciclo de vida do camarão, e como um sistema de apoio ao cultivo de camarão poderia beneficiar a carnicicultura através do uso de tecnologias de Internet das Coisas.

                  <h2>Equipe</h2>
                  A equipe responsável pelo desenvolvimento do projeto foi composta por:<br/>
                  <ul>
                    <li>
                      <a href='https://github.com/AnnaGabrielle'>
                        Anna Gabrielle Lamellas Pinto Homem
                      </a>
                    </li>
                    <li><a href='https://github.com/ericreis'>Eric Reis Figueiredo</a></li>
                    <li><a href='https://github.com/eriktronkos'>Erik Fernandes Tronkos</a></li>
                    <li><a href='https://github.com/Maasouza'>Marcos Aurélio Constant de Souza Filho</a></li>
                    <li>
                      <a href='https://github.com/DamascenoRafael'>
                        Rafael Gonçalves Damasceno
                      </a>
                    </li>
                    <li>
                      <a href='https://github.com/rodrigoj42'>
                        Rodrigo Carvalho Ribeiro de Jesus
                      </a>
                    </li>
                  </ul>
                  <h2>Tecnologias</h2>
                  O desenvolvimento do projeto foi feito utilizando Python/Flask e React. Para os testes iniciais do projeto foi construído também um protótipo com sensores de Arduino e Raspberry que coletavam temperatura, salinidade, nivel d'água e turbidez, que se comunicava com o sistema através de um broker desenvolvido com a ferramenta Emitter.io.
                </div>
                <Link to={'/login'}  activeclassname="Link-about"> Voltar</Link>
            </div>
        );
    }
}

export default About;
