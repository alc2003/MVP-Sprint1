
from datetime import date
from pydantic import BaseModel
from typing import Optional, List
from model.paciente import Paciente, Atendimento

from schemas import AtendimentoSchema


class PacienteSchema(BaseModel):
    """ Define como um novo paciente a ser inserido deve ser representado
    """    
    id: str = "1"
    cns: str = "11111111111"
    nome: str = "JOSE"
    sexo: str = "M"
    endereco: str = "Rua tal, numero 44"
    telefone: str = "(67)999-9999"
    
class PacienteBuscaSchema(BaseModel):
    """ Define como deve ser a estrutura que representa a busca. Que será
        feita apenas com base no cns do paciente.
    """    
    id: int = 1
   
class ListagemPacienteSchema(BaseModel):
    """ Define como uma listagem de pacientes será retornada.
    """
    pacientes:List[PacienteSchema]

def apresenta_pacientes(pacientes: List[Paciente]):
    """ Retorna uma representação do paciente seguindo o schema definido em
        PacienteViewSchema.
    """
    result = []
    for paciente in pacientes:
        result.append({
            "id": paciente.id,
            "nome": paciente.nome,
            "cns": paciente.cns,            
        })

    return {"pacientes": result}

class PacienteViewSchema(BaseModel):
    """ Define como um paciente será retornado: paciente + comentários.
    """
    id: int = 1
    nome: str = "JOSE"
    cns: str = "111111111111"
         

class PacienteDelSchema(BaseModel):
    """ Define como deve ser a estrutura do dado retornado após uma requisição
    de remoção.
    """
    mesage: str
    nome: str

def apresenta_paciente(paciente: Paciente):
    """ Retorna uma representação do paciente seguindo o schema definido em
        PacienteViewSchema.
    """
    return {
        "id": paciente.id,
        "nome": paciente.nome,
        "cns": paciente.cns,
        
    }

def apresenta_atendimento(paciente: Paciente, atendimento: Atendimento):
    """ Retorna uma representação do atendimento seguindo o schema definido em
        AtendimentoViewSchema.
    """
    
    return {
        "id": paciente.id,
        "nome": paciente.nome,
        "cns": paciente.cns,
        "hda_cod_queixa_principal": atendimento.hda_cod_queixa_principal,
        "hda_queixa_principal": atendimento.hda_queixa_principal,
        "hpr_hipertensao": atendimento.hpr_hipertensao,
        "hpr_diabetes": atendimento.hpr_diabetes,
        "hpr_cancer": atendimento.hpr_cancer
                
    }
