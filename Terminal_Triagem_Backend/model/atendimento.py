from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from typing import Union

from  model import Base


class Atendimento(Base):
    __tablename__ = 'atendimento'

    id = Column(Integer, primary_key=True)
    id_paciente = Column(Integer, ForeignKey('paciente.id'), nullable=False, unique=True)
    hda_cod_queixa_principal = Column(Integer)
    hda_queixa_principal = Column(String(200))
    hpr_hipertensao = Column(String(1))
    hpr_diabetes = Column(String(1))
    hpr_cancer = Column(String(1))
    classificacao = Column(Integer)
    data_insercao = Column(DateTime, default=datetime.now())

    # Definição do relacionamento entre o atendimento, um paciente e uma anamnese.
    # Aqui está sendo definido a coluna 'id_paciente' que vai guardar
    # o id do paciente, e a coluna id_anamnese que guardará a id da
    # anamnese do paciente.

    paciente = relationship("Paciente", back_populates="atendimentos")

    def init(self, 
                 id_paciente:int,
                 hda_cod_queixa_principal:int,
                 hda_queixa_principal:str,
                 hpr_hipertensao:str, 
                 hpr_diabetes:str, 
                 hpr_cancer:str, 
                 classificacao: int,
                 data_insercao:Union[DateTime, None] = None):
        """
        Cria um Atendimento

        Arguments:
            data_insercao: data de quando a anamnese foi realizada com o paciente
        """

        self.id_paciente = id_paciente
        self.hda_cod_queixa_principal = hda_cod_queixa_principal
        self.hda_queixa_principal = hda_queixa_principal
        self.hpr_hipertensao = hpr_hipertensao
        self.hpr_diabetes = hpr_diabetes
        self.hpr_cancer = hpr_cancer
        self.classificaco = classificacao
        if data_insercao:
            self.data_insercao = data_insercao

