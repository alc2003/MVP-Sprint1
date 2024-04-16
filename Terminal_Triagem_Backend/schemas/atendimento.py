from pydantic import BaseModel
from typing import Optional, List
from model.atendimento import Atendimento
from model.paciente import Paciente

class AtendimentoSchema(BaseModel):
    """ Define como um novo atendimento a ser inserido deve ser representado
    """
    id_paciente: int = 1
    hda_cod_queixa_principal:int = 1
    hda_queixa_principal:str = 'dor'
    hpr_hipertensao:str = 'S'
    hpr_diabetes:str = 'N'
    hpr_cancer:str = 'N'
    classificacao:int = '1'

class AtendimentoBuscaSchema(BaseModel):
    """ Define como deve ser a estrutura que representa a busca. Que será
        feita apenas com base no cns do paciente.
    """    
    id: int = 1

class AtendimentoViewSchema(BaseModel):
    """ Define como o atendimento será retornado: paciente + atendimentos.
    """
    id_paciente: int = 1
    hda_cod_queixa_principal:int = 1
    hda_queixa_principal:str = 'dor'
    hpr_hipertensao:str = 'S'
    hpr_diabetes:str = 'N'
    hpr_cancer:str = 'N'
    classificacao:int = '1'
        
    
class ListagemAtendimentosSchema(BaseModel):
    """ Define como uma listagem de pacientes será retornada.
    """
    atendimentos:List[AtendimentoSchema]

class AtendimentoDelSchema(BaseModel):
    """ Define como deve ser a estrutura do dado retornado após uma requisição
    de remoção.
    """
    mesage: str
    id: str


