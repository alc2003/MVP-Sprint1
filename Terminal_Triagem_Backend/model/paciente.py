
from sqlalchemy import Column, String, Integer, DateTime, Date, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from typing import Union

from  model import Base, Atendimento

class Paciente(Base):
    __tablename__ = 'paciente'

    id = Column(Integer, primary_key=True)
    cns = Column(String(15), unique=True)
    nome = Column(String(140))
    sexo = Column(String(1))
    endereco = Column(String(140))
    telefone = Column(String(30))
    data_insercao = Column(DateTime, default=datetime.now())

    # Definição do relacionamento entre o paciente e o atendimento.
    # Essa relação é implicita, não está salva na tabela 'paciente',
    # mas aqui estou deixando para SQLAlchemy a responsabilidade
    # de reconstruir esse relacionamento.

    atendimentos = relationship("Atendimento", back_populates="paciente")

    def init(self, nome:str, cns:str, 
                 sexo:str, endereco:str, telefone:str,
                 data_insercao:Union[DateTime, None] = None):
        """
        Cria um Paciente

        Arguments:
            nome: nome do paciente.
            cns: Cartão Nacional de Saúde do paciente
            sexo: Sexo do Paciente
            endereco: Endereço Completo do Paciente
            telefone: Telefone de contato do Paciente
            data_insercao: data de quando o paciente foi inserido à base
        """

        self.cns = cns
        self.nome = nome
        self.sexo = sexo
        self.endereco = endereco
        self.telefone = telefone

        #se não for informada, será o data exata da inserção no banco
        if data_insercao:
            self.data_insercao = data_insercao

    def adiciona_atendimento(self, atendimento:Atendimento):
         """ Adiciona um novo atendimento ao Paciente
         """
         self.atendimentos.append(atendimento)