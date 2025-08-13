from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime, date
from enum import Enum

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Enums
class EstadoCivil(str, Enum):
    SOLTEIRO = "Solteiro"
    CASADO = "Casado"
    DIVORCIADO = "Divorciado"
    VIUVO = "Viúvo"

class Escolaridade(str, Enum):
    FUNDAMENTAL_INCOMPLETO = "Fundamental Incompleto"
    FUNDAMENTAL_COMPLETO = "Fundamental Completo"
    MEDIO_INCOMPLETO = "Médio Incompleto"
    MEDIO_COMPLETO = "Médio Completo"
    SUPERIOR_INCOMPLETO = "Superior Incompleto"
    SUPERIOR_COMPLETO = "Superior Completo"

class TipoFalta(str, Enum):
    JUSTIFICADA = "Justificada"
    NAO_JUSTIFICADA = "Não Justificada"

class TipoLicenca(str, Enum):
    MATERNIDADE = "Maternidade"
    PATERNIDADE = "Paternidade"
    NOJO = "Nojo"
    CASAMENTO = "Casamento"
    MEDICA = "Médica"

# Models
class Empresa(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    razao_social: str
    cnpj: str
    inscricao_municipal: Optional[str] = None
    logradouro: str
    cep: str
    cidade: str
    estado: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Cliente(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    razao_social: str
    cnpj: str
    logradouro: str
    cep: str
    cidade: str
    estado: str
    area_atuacao: str
    valor_contrato: float
    descricao_servicos: str
    sindico_responsavel: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Funcao(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nome: str
    descricao: str
    cbo: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Funcionario(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nome: str
    endereco: str
    telefone: str
    cidade: str
    estado: str
    cep: str
    funcao_id: str
    local_nascimento: str
    nome_pai: str
    nome_mae: str
    matricula_esocial: str
    cbo: str
    rg: str
    data_emissao_rg: date
    orgao_emissor_rg: str
    cpf: str
    ctps: str
    data_emissao_ctps: date
    orgao_emissor_ctps: str
    titulo_eleitor: str
    zona_eleitoral: str
    secao_eleitoral: str
    escolaridade: Escolaridade
    estado_civil: EstadoCivil
    nacionalidade: str
    horario_trabalho: str
    numero_pis: str
    salario: float
    empresa_id: str
    data_admissao: date
    tem_dependentes: bool
    quantidade_dependentes: int = 0
    cliente_id: str
    posto_alocacao: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class RegistroPresenca(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    funcionario_id: str
    data: date
    presente: bool
    tipo_falta: Optional[TipoFalta] = None
    observacoes: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Atestado(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    funcionario_id: str
    data_emissao: date
    cid: str
    dias_afastamento: int
    data_retorno_prevista: date
    observacoes: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Licenca(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    funcionario_id: str
    tipo: TipoLicenca
    data_inicio: date
    data_fim: date
    motivo: str
    observacoes: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Create models
class EmpresaCreate(BaseModel):
    razao_social: str
    cnpj: str
    inscricao_municipal: Optional[str] = None
    logradouro: str
    cep: str
    cidade: str
    estado: str

class ClienteCreate(BaseModel):
    razao_social: str
    cnpj: str
    logradouro: str
    cep: str
    cidade: str
    estado: str
    area_atuacao: str
    valor_contrato: float
    descricao_servicos: str
    sindico_responsavel: Optional[str] = None

class FuncaoCreate(BaseModel):
    nome: str
    descricao: str
    cbo: str

class FuncionarioCreate(BaseModel):
    nome: str
    endereco: str
    telefone: str
    cidade: str
    estado: str
    cep: str
    funcao_id: str
    local_nascimento: str
    nome_pai: str
    nome_mae: str
    matricula_esocial: str
    cbo: str
    rg: str
    data_emissao_rg: date
    orgao_emissor_rg: str
    cpf: str
    ctps: str
    data_emissao_ctps: date
    orgao_emissor_ctps: str
    titulo_eleitor: str
    zona_eleitoral: str
    secao_eleitoral: str
    escolaridade: Escolaridade
    estado_civil: EstadoCivil
    nacionalidade: str
    horario_trabalho: str
    numero_pis: str
    salario: float
    empresa_id: str
    data_admissao: date
    tem_dependentes: bool
    quantidade_dependentes: int = 0
    cliente_id: str
    posto_alocacao: str

class RegistroPresencaCreate(BaseModel):
    funcionario_id: str
    data: date
    presente: bool
    tipo_falta: Optional[TipoFalta] = None
    observacoes: Optional[str] = None

class AtestadoCreate(BaseModel):
    funcionario_id: str
    data_emissao: date
    cid: str
    dias_afastamento: int
    data_retorno_prevista: date
    observacoes: Optional[str] = None

class LicencaCreate(BaseModel):
    funcionario_id: str
    tipo: TipoLicenca
    data_inicio: date
    data_fim: date
    motivo: str
    observacoes: Optional[str] = None

# Dashboard stats
class DashboardStats(BaseModel):
    total_funcionarios: int
    total_clientes: int
    total_empresas: int
    funcionarios_presentes_hoje: int
    funcionarios_ausentes_hoje: int
    atestados_ativos: int

# Routes
@api_router.get("/")
async def root():
    return {"message": "Sistema de Terceirização de Serviços"}

@api_router.get("/dashboard", response_model=DashboardStats)
async def get_dashboard_stats():
    try:
        total_funcionarios = await db.funcionarios.count_documents({})
        total_clientes = await db.clientes.count_documents({})
        total_empresas = await db.empresas.count_documents({})
        
        hoje = date.today()
        funcionarios_presentes_hoje = await db.registros_presenca.count_documents({
            "data": hoje.isoformat(),
            "presente": True
        })
        funcionarios_ausentes_hoje = await db.registros_presenca.count_documents({
            "data": hoje.isoformat(),
            "presente": False
        })
        
        atestados_ativos = await db.atestados.count_documents({
            "data_retorno_prevista": {"$gte": hoje.isoformat()}
        })
        
        return DashboardStats(
            total_funcionarios=total_funcionarios,
            total_clientes=total_clientes,
            total_empresas=total_empresas,
            funcionarios_presentes_hoje=funcionarios_presentes_hoje,
            funcionarios_ausentes_hoje=funcionarios_ausentes_hoje,
            atestados_ativos=atestados_ativos
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Empresas
@api_router.post("/empresas", response_model=Empresa)
async def create_empresa(empresa: EmpresaCreate):
    try:
        empresa_obj = Empresa(**empresa.dict())
        await db.empresas.insert_one(empresa_obj.dict())
        return empresa_obj
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/empresas", response_model=List[Empresa])
async def get_empresas():
    try:
        empresas = await db.empresas.find().to_list(1000)
        return [Empresa(**empresa) for empresa in empresas]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Clientes
@api_router.post("/clientes", response_model=Cliente)
async def create_cliente(cliente: ClienteCreate):
    try:
        cliente_obj = Cliente(**cliente.dict())
        await db.clientes.insert_one(cliente_obj.dict())
        return cliente_obj
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/clientes", response_model=List[Cliente])
async def get_clientes():
    try:
        clientes = await db.clientes.find().to_list(1000)
        return [Cliente(**cliente) for cliente in clientes]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Funções
@api_router.post("/funcoes", response_model=Funcao)
async def create_funcao(funcao: FuncaoCreate):
    try:
        funcao_obj = Funcao(**funcao.dict())
        await db.funcoes.insert_one(funcao_obj.dict())
        return funcao_obj
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/funcoes", response_model=List[Funcao])
async def get_funcoes():
    try:
        funcoes = await db.funcoes.find().to_list(1000)
        return [Funcao(**funcao) for funcao in funcoes]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Funcionários
@api_router.post("/funcionarios", response_model=Funcionario)
async def create_funcionario(funcionario: FuncionarioCreate):
    try:
        funcionario_obj = Funcionario(**funcionario.dict())
        # Convert date objects to strings for MongoDB storage
        funcionario_dict = funcionario_obj.dict()
        for key, value in funcionario_dict.items():
            if isinstance(value, date):
                funcionario_dict[key] = value.isoformat()
        await db.funcionarios.insert_one(funcionario_dict)
        return funcionario_obj
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/funcionarios", response_model=List[Funcionario])
async def get_funcionarios():
    try:
        funcionarios = await db.funcionarios.find().to_list(1000)
        return [Funcionario(**funcionario) for funcionario in funcionarios]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/funcionarios/{funcionario_id}", response_model=Funcionario)
async def get_funcionario(funcionario_id: str):
    try:
        funcionario = await db.funcionarios.find_one({"id": funcionario_id})
        if not funcionario:
            raise HTTPException(status_code=404, detail="Funcionário não encontrado")
        return Funcionario(**funcionario)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Registros de Presença
@api_router.post("/presenca", response_model=RegistroPresenca)
async def create_registro_presenca(registro: RegistroPresencaCreate):
    try:
        registro_obj = RegistroPresenca(**registro.dict())
        # Convert date objects to strings for MongoDB storage
        registro_dict = registro_obj.dict()
        for key, value in registro_dict.items():
            if isinstance(value, date):
                registro_dict[key] = value.isoformat()
        await db.registros_presenca.insert_one(registro_dict)
        return registro_obj
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/presenca", response_model=List[RegistroPresenca])
async def get_registros_presenca():
    try:
        registros = await db.registros_presenca.find().to_list(1000)
        return [RegistroPresenca(**registro) for registro in registros]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Atestados
@api_router.post("/atestados", response_model=Atestado)
async def create_atestado(atestado: AtestadoCreate):
    try:
        atestado_obj = Atestado(**atestado.dict())
        # Convert date objects to strings for MongoDB storage
        atestado_dict = atestado_obj.dict()
        for key, value in atestado_dict.items():
            if isinstance(value, date):
                atestado_dict[key] = value.isoformat()
        await db.atestados.insert_one(atestado_dict)
        return atestado_obj
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/atestados", response_model=List[Atestado])
async def get_atestados():
    try:
        atestados = await db.atestados.find().to_list(1000)
        return [Atestado(**atestado) for atestado in atestados]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Licenças
@api_router.post("/licencas", response_model=Licenca)
async def create_licenca(licenca: LicencaCreate):
    try:
        licenca_obj = Licenca(**licenca.dict())
        await db.licencas.insert_one(licenca_obj.dict())
        return licenca_obj
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/licencas", response_model=List[Licenca])
async def get_licencas():
    try:
        licencas = await db.licencas.find().to_list(1000)
        return [Licenca(**licenca) for licenca in licencas]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()