import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pessoa } from '../modelo/Pessoa';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CRUDComponent {

  // Objeto de formulario
  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    idade: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(120)]),
    cidade: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  // Visibilidade dos botoes
  btnCadastrar: boolean = true;


  // Variavel para armazenar indice da pessoa selecionada
  indice: number = -1; // -1 garante que nao tem nenhuma pessoa selecionada  

  // Vetor
  vetor: Pessoa[] = [];

  // No construtor, tentamos carregar dados do LocalStorage
  constructor() {
    const dados = localStorage.getItem('pessoas');
    if (dados) {
      this.vetor = JSON.parse(dados);  // Convertemos de volta para objeto
    }
  }

  // Função para salvar os dados no LocalStorage
  salvarNoLocalStorage() {
    localStorage.setItem('pessoas', JSON.stringify(this.vetor));  // Converte o vetor em JSON e salva
  }

  // funcao de cadastro
  cadastrar() {
    // cadastro no vetor
    this.vetor.push(this.formulario.value as Pessoa);

    // limpeza nos inputs
    this.formulario.reset();

     // Salvar os dados no LocalStorage
     this.salvarNoLocalStorage();

    // visualização no console
    // console.table(this.vetor);

  }

  // Funcao de selecao
  selecionar(indice: number) {

    this.indice = indice;

    // Atribuir os dados da pessoa no fornmulario
    this.formulario.setValue({
      nome: this.vetor[indice].nome,
      idade: this.vetor[indice].idade,
      cidade: this.vetor[indice].cidade
    });

    // Visibilidade dos botoes
    this.btnCadastrar = false;
  }

  // Funcao de alterar
  alterar(){

    // Alterar vetor
    this.vetor[this.indice] = this.formulario.value as Pessoa;

    // Limpar os inputs
    this.formulario.reset();

    // Visibilidade dos botoes
    this.btnCadastrar = true;

    // Salvar os dados no LocalStorage
    this.salvarNoLocalStorage();

  }

  // Funcao para remover
  remover(){

    // remover pessoa do vetor
    this.vetor.splice(this.indice, 1); // remover 1 pessoa a partir do indice

    // limpeza dos inputs
    this.formulario.reset();

    // visibilidade dos botoes
    this.btnCadastrar = true;

    // Salvar os dados no LocalStorage
    this.salvarNoLocalStorage();

  }

  // funcao de cancelar
  cancelar(){

     // limpeza dos inputs
     this.formulario.reset();

     // visibilidade dos botoes
     this.btnCadastrar = true;

  }

}
