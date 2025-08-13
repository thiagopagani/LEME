import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog";
import { Badge } from "./components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";
import { Calendar, CalendarDays, Building, Users, UserCheck, FileText, ClipboardList, AlertCircle } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dashboardStats, setDashboardStats] = useState({});
  const [empresas, setEmpresas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [funcoes, setFuncoes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [registrosPresenca, setRegistrosPresenca] = useState([]);
  const [atestados, setAtestados] = useState([]);
  const [licencas, setLicencas] = useState([]);
  
  // Forms
  const [empresaForm, setEmpresaForm] = useState({
    razao_social: "",
    cnpj: "",
    inscricao_municipal: "",
    logradouro: "",
    cep: "",
    cidade: "",
    estado: ""
  });

  const [clienteForm, setClienteForm] = useState({
    razao_social: "",
    cnpj: "",
    logradouro: "",
    cep: "",
    cidade: "",
    estado: "",
    area_atuacao: "",
    valor_contrato: "",
    descricao_servicos: "",
    sindico_responsavel: ""
  });

  const [funcaoForm, setFuncaoForm] = useState({
    nome: "",
    descricao: "",
    cbo: ""
  });

  const [funcionarioForm, setFuncionarioForm] = useState({
    nome: "",
    endereco: "",
    telefone: "",
    cidade: "",
    estado: "",
    cep: "",
    funcao_id: "",
    local_nascimento: "",
    nome_pai: "",
    nome_mae: "",
    matricula_esocial: "",
    cbo: "",
    rg: "",
    data_emissao_rg: "",
    orgao_emissor_rg: "",
    cpf: "",
    ctps: "",
    data_emissao_ctps: "",
    orgao_emissor_ctps: "",
    titulo_eleitor: "",
    zona_eleitoral: "",
    secao_eleitoral: "",
    escolaridade: "",
    estado_civil: "",
    nacionalidade: "",
    horario_trabalho: "",
    numero_pis: "",
    salario: "",
    empresa_id: "",
    data_admissao: "",
    tem_dependentes: false,
    quantidade_dependentes: 0,
    cliente_id: "",
    posto_alocacao: ""
  });

  const [presencaForm, setPresencaForm] = useState({
    funcionario_id: "",
    data: "",
    presente: true,
    tipo_falta: "",
    observacoes: ""
  });

  const [atestadoForm, setAtestadoForm] = useState({
    funcionario_id: "",
    data_emissao: "",
    cid: "",
    dias_afastamento: "",
    data_retorno_prevista: "",
    observacoes: ""
  });

  const [licencaForm, setLicencaForm] = useState({
    funcionario_id: "",
    tipo: "",
    data_inicio: "",
    data_fim: "",
    motivo: "",
    observacoes: ""
  });

  // Fetch functions
  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(`${API}/dashboard`);
      setDashboardStats(response.data);
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
    }
  };

  const fetchEmpresas = async () => {
    try {
      const response = await axios.get(`${API}/empresas`);
      setEmpresas(response.data);
    } catch (error) {
      console.error("Erro ao buscar empresas:", error);
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await axios.get(`${API}/clientes`);
      setClientes(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  const fetchFuncoes = async () => {
    try {
      const response = await axios.get(`${API}/funcoes`);
      setFuncoes(response.data);
    } catch (error) {
      console.error("Erro ao buscar funções:", error);
    }
  };

  const fetchFuncionarios = async () => {
    try {
      const response = await axios.get(`${API}/funcionarios`);
      setFuncionarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
    }
  };

  const fetchRegistrosPresenca = async () => {
    try {
      const response = await axios.get(`${API}/presenca`);
      setRegistrosPresenca(response.data);
    } catch (error) {
      console.error("Erro ao buscar registros de presença:", error);
    }
  };

  const fetchAtestados = async () => {
    try {
      const response = await axios.get(`${API}/atestados`);
      setAtestados(response.data);
    } catch (error) {
      console.error("Erro ao buscar atestados:", error);
    }
  };

  const fetchLicencas = async () => {
    try {
      const response = await axios.get(`${API}/licencas`);
      setLicencas(response.data);
    } catch (error) {
      console.error("Erro ao buscar licenças:", error);
    }
  };

  // Submit functions
  const handleEmpresaSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/empresas`, empresaForm);
      setEmpresaForm({
        razao_social: "",
        cnpj: "",
        inscricao_municipal: "",
        logradouro: "",
        cep: "",
        cidade: "",
        estado: ""
      });
      fetchEmpresas();
      fetchDashboardStats();
    } catch (error) {
      console.error("Erro ao criar empresa:", error);
    }
  };

  const handleClienteSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/clientes`, {
        ...clienteForm,
        valor_contrato: parseFloat(clienteForm.valor_contrato)
      });
      setClienteForm({
        razao_social: "",
        cnpj: "",
        logradouro: "",
        cep: "",
        cidade: "",
        estado: "",
        area_atuacao: "",
        valor_contrato: "",
        descricao_servicos: "",
        sindico_responsavel: ""
      });
      fetchClientes();
      fetchDashboardStats();
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
    }
  };

  const handleFuncaoSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/funcoes`, funcaoForm);
      setFuncaoForm({
        nome: "",
        descricao: "",
        cbo: ""
      });
      fetchFuncoes();
    } catch (error) {
      console.error("Erro ao criar função:", error);
    }
  };

  const handleFuncionarioSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/funcionarios`, {
        ...funcionarioForm,
        salario: parseFloat(funcionarioForm.salario),
        quantidade_dependentes: parseInt(funcionarioForm.quantidade_dependentes) || 0,
        tem_dependentes: funcionarioForm.tem_dependentes
      });
      setFuncionarioForm({
        nome: "",
        endereco: "",
        telefone: "",
        cidade: "",
        estado: "",
        cep: "",
        funcao_id: "",
        local_nascimento: "",
        nome_pai: "",
        nome_mae: "",
        matricula_esocial: "",
        cbo: "",
        rg: "",
        data_emissao_rg: "",
        orgao_emissor_rg: "",
        cpf: "",
        ctps: "",
        data_emissao_ctps: "",
        orgao_emissor_ctps: "",
        titulo_eleitor: "",
        zona_eleitoral: "",
        secao_eleitoral: "",
        escolaridade: "",
        estado_civil: "",
        nacionalidade: "",
        horario_trabalho: "",
        numero_pis: "",
        salario: "",
        empresa_id: "",
        data_admissao: "",
        tem_dependentes: false,
        quantidade_dependentes: 0,
        cliente_id: "",
        posto_alocacao: ""
      });
      fetchFuncionarios();
      fetchDashboardStats();
    } catch (error) {
      console.error("Erro ao criar funcionário:", error);
    }
  };

  const handlePresencaSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/presenca`, presencaForm);
      setPresencaForm({
        funcionario_id: "",
        data: "",
        presente: true,
        tipo_falta: "",
        observacoes: ""
      });
      fetchRegistrosPresenca();
      fetchDashboardStats();
    } catch (error) {
      console.error("Erro ao registrar presença:", error);
    }
  };

  const handleAtestadoSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/atestados`, {
        ...atestadoForm,
        dias_afastamento: parseInt(atestadoForm.dias_afastamento)
      });
      setAtestadoForm({
        funcionario_id: "",
        data_emissao: "",
        cid: "",
        dias_afastamento: "",
        data_retorno_prevista: "",
        observacoes: ""
      });
      fetchAtestados();
      fetchDashboardStats();
    } catch (error) {
      console.error("Erro ao criar atestado:", error);
    }
  };

  const handleLicencaSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/licencas`, licencaForm);
      setLicencaForm({
        funcionario_id: "",
        tipo: "",
        data_inicio: "",
        data_fim: "",
        motivo: "",
        observacoes: ""
      });
      fetchLicencas();
    } catch (error) {
      console.error("Erro ao criar licença:", error);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
    fetchEmpresas();
    fetchClientes();
    fetchFuncoes();
    fetchFuncionarios();
    fetchRegistrosPresenca();
    fetchAtestados();
    fetchLicencas();
  }, []);

  const getFuncionarioNome = (funcionarioId) => {
    const funcionario = funcionarios.find(f => f.id === funcionarioId);
    return funcionario ? funcionario.nome : "Não encontrado";
  };

  const getEmpresaNome = (empresaId) => {
    const empresa = empresas.find(e => e.id === empresaId);
    return empresa ? empresa.razao_social : "Não encontrado";
  };

  const getClienteNome = (clienteId) => {
    const cliente = clientes.find(c => c.id === clienteId);
    return cliente ? cliente.razao_social : "Não encontrado";
  };

  const getFuncaoNome = (funcaoId) => {
    const funcao = funcoes.find(f => f.id === funcaoId);
    return funcao ? funcao.nome : "Não encontrado";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Sistema de Terceirização de Serviços</h1>
          <p className="text-slate-600">Gestão completa de funcionários, clientes e controle de presença</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="empresas">Empresas</TabsTrigger>
            <TabsTrigger value="clientes">Clientes</TabsTrigger>
            <TabsTrigger value="funcoes">Funções</TabsTrigger>
            <TabsTrigger value="funcionarios">Funcionários</TabsTrigger>
            <TabsTrigger value="presenca">Presença</TabsTrigger>
            <TabsTrigger value="documentos">Documentos</TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Funcionários</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{dashboardStats.total_funcionarios || 0}</div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
                  <Building className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{dashboardStats.total_clientes || 0}</div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Empresas</CardTitle>
                  <Building className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{dashboardStats.total_empresas || 0}</div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Presentes Hoje</CardTitle>
                  <UserCheck className="h-4 w-4 text-emerald-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-emerald-600">{dashboardStats.funcionarios_presentes_hoje || 0}</div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ausentes Hoje</CardTitle>
                  <AlertCircle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{dashboardStats.funcionarios_ausentes_hoje || 0}</div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Atestados Ativos</CardTitle>
                  <FileText className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{dashboardStats.atestados_ativos || 0}</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Empresas */}
          <TabsContent value="empresas">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Cadastrar Nova Empresa</CardTitle>
                  <CardDescription>Adicione uma nova empresa empregadora</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleEmpresaSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="razao_social">Razão Social</Label>
                      <Input
                        id="razao_social"
                        value={empresaForm.razao_social}
                        onChange={(e) => setEmpresaForm({...empresaForm, razao_social: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input
                        id="cnpj"
                        value={empresaForm.cnpj}
                        onChange={(e) => setEmpresaForm({...empresaForm, cnpj: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="inscricao_municipal">Inscrição Municipal</Label>
                      <Input
                        id="inscricao_municipal"
                        value={empresaForm.inscricao_municipal}
                        onChange={(e) => setEmpresaForm({...empresaForm, inscricao_municipal: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="logradouro">Endereço</Label>
                      <Input
                        id="logradouro"
                        value={empresaForm.logradouro}
                        onChange={(e) => setEmpresaForm({...empresaForm, logradouro: e.target.value})}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cep">CEP</Label>
                        <Input
                          id="cep"
                          value={empresaForm.cep}
                          onChange={(e) => setEmpresaForm({...empresaForm, cep: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cidade">Cidade</Label>
                        <Input
                          id="cidade"
                          value={empresaForm.cidade}
                          onChange={(e) => setEmpresaForm({...empresaForm, cidade: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="estado">Estado</Label>
                      <Input
                        id="estado"
                        value={empresaForm.estado}
                        onChange={(e) => setEmpresaForm({...empresaForm, estado: e.target.value})}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">Cadastrar Empresa</Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Empresas Cadastradas</CardTitle>
                  <CardDescription>{empresas.length} empresas no sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {empresas.map((empresa) => (
                      <div key={empresa.id} className="p-4 border rounded-lg">
                        <h3 className="font-semibold">{empresa.razao_social}</h3>
                        <p className="text-sm text-gray-600">CNPJ: {empresa.cnpj}</p>
                        <p className="text-sm text-gray-600">{empresa.cidade}, {empresa.estado}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Clientes */}
          <TabsContent value="clientes">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Cadastrar Novo Cliente</CardTitle>
                  <CardDescription>Adicione um novo cliente contratante</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleClienteSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="razao_social_cliente">Razão Social</Label>
                      <Input
                        id="razao_social_cliente"
                        value={clienteForm.razao_social}
                        onChange={(e) => setClienteForm({...clienteForm, razao_social: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cnpj_cliente">CNPJ</Label>
                      <Input
                        id="cnpj_cliente"
                        value={clienteForm.cnpj}
                        onChange={(e) => setClienteForm({...clienteForm, cnpj: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="area_atuacao">Área de Atuação</Label>
                      <Select value={clienteForm.area_atuacao} onValueChange={(value) => setClienteForm({...clienteForm, area_atuacao: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a área" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="condominio">Condomínio</SelectItem>
                          <SelectItem value="escritorio">Escritório</SelectItem>
                          <SelectItem value="academia">Academia</SelectItem>
                          <SelectItem value="hospital">Hospital</SelectItem>
                          <SelectItem value="shopping">Shopping</SelectItem>
                          <SelectItem value="escola">Escola</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="valor_contrato">Valor do Contrato</Label>
                      <Input
                        id="valor_contrato"
                        type="number"
                        step="0.01"
                        value={clienteForm.valor_contrato}
                        onChange={(e) => setClienteForm({...clienteForm, valor_contrato: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="descricao_servicos">Descrição dos Serviços</Label>
                      <Input
                        id="descricao_servicos"
                        value={clienteForm.descricao_servicos}
                        onChange={(e) => setClienteForm({...clienteForm, descricao_servicos: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="sindico_responsavel">Síndico/Responsável</Label>
                      <Input
                        id="sindico_responsavel"
                        value={clienteForm.sindico_responsavel}
                        onChange={(e) => setClienteForm({...clienteForm, sindico_responsavel: e.target.value})}
                      />
                    </div>
                    <Button type="submit" className="w-full">Cadastrar Cliente</Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Clientes Cadastrados</CardTitle>
                  <CardDescription>{clientes.length} clientes no sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {clientes.map((cliente) => (
                      <div key={cliente.id} className="p-4 border rounded-lg">
                        <h3 className="font-semibold">{cliente.razao_social}</h3>
                        <p className="text-sm text-gray-600">CNPJ: {cliente.cnpj}</p>
                        <p className="text-sm text-gray-600">Área: {cliente.area_atuacao}</p>
                        <p className="text-sm text-gray-600">Contrato: R$ {cliente.valor_contrato?.toLocaleString('pt-BR')}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Funções */}
          <TabsContent value="funcoes">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Cadastrar Nova Função</CardTitle>
                  <CardDescription>Adicione uma nova função/serviço</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFuncaoSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="nome_funcao">Nome da Função</Label>
                      <Select value={funcaoForm.nome} onValueChange={(value) => setFuncaoForm({...funcaoForm, nome: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a função" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Porteiro">Porteiro</SelectItem>
                          <SelectItem value="Controle de Acesso">Controle de Acesso</SelectItem>
                          <SelectItem value="Ronda">Ronda</SelectItem>
                          <SelectItem value="Recepcionista">Recepcionista</SelectItem>
                          <SelectItem value="Auxiliar Multifuncional">Auxiliar Multifuncional</SelectItem>
                          <SelectItem value="Servente de Limpeza">Servente de Limpeza</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="descricao_funcao">Descrição</Label>
                      <Input
                        id="descricao_funcao"
                        value={funcaoForm.descricao}
                        onChange={(e) => setFuncaoForm({...funcaoForm, descricao: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cbo_funcao">CBO</Label>
                      <Input
                        id="cbo_funcao"
                        value={funcaoForm.cbo}
                        onChange={(e) => setFuncaoForm({...funcaoForm, cbo: e.target.value})}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">Cadastrar Função</Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Funções Cadastradas</CardTitle>
                  <CardDescription>{funcoes.length} funções no sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {funcoes.map((funcao) => (
                      <div key={funcao.id} className="p-4 border rounded-lg">
                        <h3 className="font-semibold">{funcao.nome}</h3>
                        <p className="text-sm text-gray-600">CBO: {funcao.cbo}</p>
                        <p className="text-sm text-gray-600">{funcao.descricao}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Funcionários */}
          <TabsContent value="funcionarios">
            <div className="space-y-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mb-4">Cadastrar Novo Funcionário</Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Cadastrar Novo Funcionário</DialogTitle>
                    <DialogDescription>Preencha todos os dados do funcionário</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleFuncionarioSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nome_funcionario">Nome Completo</Label>
                        <Input
                          id="nome_funcionario"
                          value={funcionarioForm.nome}
                          onChange={(e) => setFuncionarioForm({...funcionarioForm, nome: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cpf_funcionario">CPF</Label>
                        <Input
                          id="cpf_funcionario"
                          value={funcionarioForm.cpf}
                          onChange={(e) => setFuncionarioForm({...funcionarioForm, cpf: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="rg_funcionario">RG</Label>
                        <Input
                          id="rg_funcionario"
                          value={funcionarioForm.rg}
                          onChange={(e) => setFuncionarioForm({...funcionarioForm, rg: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="telefone_funcionario">Telefone</Label>
                        <Input
                          id="telefone_funcionario"
                          value={funcionarioForm.telefone}
                          onChange={(e) => setFuncionarioForm({...funcionarioForm, telefone: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="endereco_funcionario">Endereço</Label>
                      <Input
                        id="endereco_funcionario"
                        value={funcionarioForm.endereco}
                        onChange={(e) => setFuncionarioForm({...funcionarioForm, endereco: e.target.value})}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="cidade_funcionario">Cidade</Label>
                        <Input
                          id="cidade_funcionario"
                          value={funcionarioForm.cidade}
                          onChange={(e) => setFuncionarioForm({...funcionarioForm, cidade: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="estado_funcionario">Estado</Label>
                        <Input
                          id="estado_funcionario"
                          value={funcionarioForm.estado}
                          onChange={(e) => setFuncionarioForm({...funcionarioForm, estado: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cep_funcionario">CEP</Label>
                        <Input
                          id="cep_funcionario"
                          value={funcionarioForm.cep}
                          onChange={(e) => setFuncionarioForm({...funcionarioForm, cep: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="empresa_funcionario">Empresa</Label>
                        <Select value={funcionarioForm.empresa_id} onValueChange={(value) => setFuncionarioForm({...funcionarioForm, empresa_id: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a empresa" />
                          </SelectTrigger>
                          <SelectContent>
                            {empresas.map((empresa) => (
                              <SelectItem key={empresa.id} value={empresa.id}>{empresa.razao_social}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="cliente_funcionario">Cliente</Label>
                        <Select value={funcionarioForm.cliente_id} onValueChange={(value) => setFuncionarioForm({...funcionarioForm, cliente_id: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o cliente" />
                          </SelectTrigger>
                          <SelectContent>
                            {clientes.map((cliente) => (
                              <SelectItem key={cliente.id} value={cliente.id}>{cliente.razao_social}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="funcao_funcionario">Função</Label>
                        <Select value={funcionarioForm.funcao_id} onValueChange={(value) => setFuncionarioForm({...funcionarioForm, funcao_id: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a função" />
                          </SelectTrigger>
                          <SelectContent>
                            {funcoes.map((funcao) => (
                              <SelectItem key={funcao.id} value={funcao.id}>{funcao.nome}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="posto_alocacao">Posto de Alocação</Label>
                        <Input
                          id="posto_alocacao"
                          value={funcionarioForm.posto_alocacao}
                          onChange={(e) => setFuncionarioForm({...funcionarioForm, posto_alocacao: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="salario_funcionario">Salário</Label>
                        <Input
                          id="salario_funcionario"
                          type="number"
                          step="0.01"
                          value={funcionarioForm.salario}
                          onChange={(e) => setFuncionarioForm({...funcionarioForm, salario: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="data_admissao">Data de Admissão</Label>
                        <Input
                          id="data_admissao"
                          type="date"
                          value={funcionarioForm.data_admissao}
                          onChange={(e) => setFuncionarioForm({...funcionarioForm, data_admissao: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="estado_civil">Estado Civil</Label>
                        <Select value={funcionarioForm.estado_civil} onValueChange={(value) => setFuncionarioForm({...funcionarioForm, estado_civil: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o estado civil" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Solteiro">Solteiro</SelectItem>
                            <SelectItem value="Casado">Casado</SelectItem>
                            <SelectItem value="Divorciado">Divorciado</SelectItem>
                            <SelectItem value="Viúvo">Viúvo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="escolaridade">Escolaridade</Label>
                        <Select value={funcionarioForm.escolaridade} onValueChange={(value) => setFuncionarioForm({...funcionarioForm, escolaridade: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a escolaridade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Fundamental Incompleto">Fundamental Incompleto</SelectItem>
                            <SelectItem value="Fundamental Completo">Fundamental Completo</SelectItem>
                            <SelectItem value="Médio Incompleto">Médio Incompleto</SelectItem>
                            <SelectItem value="Médio Completo">Médio Completo</SelectItem>
                            <SelectItem value="Superior Incompleto">Superior Incompleto</SelectItem>
                            <SelectItem value="Superior Completo">Superior Completo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Seção Dados Familiares */}
                    <div className="border-t pt-4">
                      <h3 className="text-lg font-semibold mb-4 text-gray-700">Dados Familiares</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="local_nascimento">Local de Nascimento</Label>
                          <Input
                            id="local_nascimento"
                            value={funcionarioForm.local_nascimento}
                            onChange={(e) => setFuncionarioForm({...funcionarioForm, local_nascimento: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="nacionalidade">Nacionalidade</Label>
                          <Input
                            id="nacionalidade"
                            value={funcionarioForm.nacionalidade}
                            onChange={(e) => setFuncionarioForm({...funcionarioForm, nacionalidade: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label htmlFor="nome_pai">Nome do Pai</Label>
                          <Input
                            id="nome_pai"
                            value={funcionarioForm.nome_pai}
                            onChange={(e) => setFuncionarioForm({...funcionarioForm, nome_pai: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="nome_mae">Nome da Mãe</Label>
                          <Input
                            id="nome_mae"
                            value={funcionarioForm.nome_mae}
                            onChange={(e) => setFuncionarioForm({...funcionarioForm, nome_mae: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Seção Documentos */}
                    <div className="border-t pt-4">
                      <h3 className="text-lg font-semibold mb-4 text-gray-700">Documentos</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="data_emissao_rg">Data de Emissão do RG</Label>
                          <Input
                            id="data_emissao_rg"
                            type="date"
                            value={funcionarioForm.data_emissao_rg}
                            onChange={(e) => setFuncionarioForm({...funcionarioForm, data_emissao_rg: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="orgao_emissor_rg">Órgão Emissor do RG</Label>
                          <Input
                            id="orgao_emissor_rg"
                            value={funcionarioForm.orgao_emissor_rg}
                            onChange={(e) => setFuncionarioForm({...funcionarioForm, orgao_emissor_rg: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label htmlFor="ctps">CTPS</Label>
                          <Input
                            id="ctps"
                            value={funcionarioForm.ctps}
                            onChange={(e) => setFuncionarioForm({...funcionarioForm, ctps: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="data_emissao_ctps">Data de Emissão da CTPS</Label>
                          <Input
                            id="data_emissao_ctps"
                            type="date"
                            value={funcionarioForm.data_emissao_ctps}
                            onChange={(e) => setFuncionarioForm({...funcionarioForm, data_emissao_ctps: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label htmlFor="orgao_emissor_ctps">Órgão Emissor da CTPS</Label>
                          <Input
                            id="orgao_emissor_ctps"
                            value={funcionarioForm.orgao_emissor_ctps}
                            onChange={(e) => setFuncionarioForm({...funcionarioForm, orgao_emissor_ctps: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="titulo_eleitor">Título de Eleitor</Label>
                          <Input
                            id="titulo_eleitor"
                            value={funcionarioForm.titulo_eleitor}
                            onChange={(e) => setFuncionarioForm({...funcionarioForm, titulo_eleitor: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label htmlFor="zona_eleitoral">Zona Eleitoral</Label>
                          <Input
                            id="zona_eleitoral"
                            value={funcionarioForm.zona_eleitoral}
                            onChange={(e) => setFuncionarioForm({...funcionarioForm, zona_eleitoral: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="secao_eleitoral">Seção Eleitoral</Label>
                          <Input
                            id="secao_eleitoral"
                            value={funcionarioForm.secao_eleitoral}
                            onChange={(e) => setFuncionarioForm({...funcionarioForm, secao_eleitoral: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Seção Dados Trabalhistas */}
                    <div className="border-t pt-4">
                      <h3 className="text-lg font-semibold mb-4 text-gray-700">Dados Trabalhistas</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="matricula_esocial">Matrícula eSocial</Label>
                          <Input
                            id="matricula_esocial"
                            value={funcionarioForm.matricula_esocial}
                            onChange={(e) => setFuncionarioForm({...funcionarioForm, matricula_esocial: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cbo">CBO</Label>
                          <Input
                            id="cbo"
                            value={funcionarioForm.cbo}
                            onChange={(e) => setFuncionarioForm({...funcionarioForm, cbo: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label htmlFor="numero_pis">Número PIS</Label>
                          <Input
                            id="numero_pis"
                            value={funcionarioForm.numero_pis}
                            onChange={(e) => setFuncionarioForm({...funcionarioForm, numero_pis: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="horario_trabalho">Horário de Trabalho</Label>
                          <Input
                            id="horario_trabalho"
                            value={funcionarioForm.horario_trabalho}
                            onChange={(e) => setFuncionarioForm({...funcionarioForm, horario_trabalho: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Seção Dependentes */}
                    <div className="border-t pt-4">
                      <h3 className="text-lg font-semibold mb-4 text-gray-700">Dependentes</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="tem_dependentes">Tem Dependentes?</Label>
                          <Select value={funcionarioForm.tem_dependentes.toString()} onValueChange={(value) => setFuncionarioForm({...funcionarioForm, tem_dependentes: value === 'true'})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="false">Não</SelectItem>
                              <SelectItem value="true">Sim</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {funcionarioForm.tem_dependentes && (
                          <div>
                            <Label htmlFor="quantidade_dependentes">Quantidade de Dependentes</Label>
                            <Input
                              id="quantidade_dependentes"
                              type="number"
                              min="0"
                              value={funcionarioForm.quantidade_dependentes}
                              onChange={(e) => setFuncionarioForm({...funcionarioForm, quantidade_dependentes: parseInt(e.target.value) || 0})}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <Button type="submit" className="w-full">Cadastrar Funcionário</Button>
                  </form>
                </DialogContent>
              </Dialog>

              <Card>
                <CardHeader>
                  <CardTitle>Funcionários Cadastrados</CardTitle>
                  <CardDescription>{funcionarios.length} funcionários no sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Função</TableHead>
                        <TableHead>Empresa</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Salário</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {funcionarios.map((funcionario) => (
                        <TableRow key={funcionario.id}>
                          <TableCell className="font-medium">{funcionario.nome}</TableCell>
                          <TableCell>{getFuncaoNome(funcionario.funcao_id)}</TableCell>
                          <TableCell>{getEmpresaNome(funcionario.empresa_id)}</TableCell>
                          <TableCell>{getClienteNome(funcionario.cliente_id)}</TableCell>
                          <TableCell>R$ {funcionario.salario?.toLocaleString('pt-BR')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Presença */}
          <TabsContent value="presenca">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Registrar Presença</CardTitle>
                  <CardDescription>Marque presença ou falta de funcionários</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePresencaSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="funcionario_presenca">Funcionário</Label>
                      <Select value={presencaForm.funcionario_id} onValueChange={(value) => setPresencaForm({...presencaForm, funcionario_id: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o funcionário" />
                        </SelectTrigger>
                        <SelectContent>
                          {funcionarios.map((funcionario) => (
                            <SelectItem key={funcionario.id} value={funcionario.id}>{funcionario.nome}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="data_presenca">Data</Label>
                      <Input
                        id="data_presenca"
                        type="date"
                        value={presencaForm.data}
                        onChange={(e) => setPresencaForm({...presencaForm, data: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="presente">Status</Label>
                      <Select value={presencaForm.presente.toString()} onValueChange={(value) => setPresencaForm({...presencaForm, presente: value === 'true'})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Presente</SelectItem>
                          <SelectItem value="false">Ausente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {!presencaForm.presente && (
                      <div>
                        <Label htmlFor="tipo_falta">Tipo de Falta</Label>
                        <Select value={presencaForm.tipo_falta} onValueChange={(value) => setPresencaForm({...presencaForm, tipo_falta: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Justificada">Justificada</SelectItem>
                            <SelectItem value="Não Justificada">Não Justificada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    <div>
                      <Label htmlFor="observacoes_presenca">Observações</Label>
                      <Input
                        id="observacoes_presenca"
                        value={presencaForm.observacoes}
                        onChange={(e) => setPresencaForm({...presencaForm, observacoes: e.target.value})}
                      />
                    </div>
                    <Button type="submit" className="w-full">Registrar</Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Registros de Presença</CardTitle>
                  <CardDescription>{registrosPresenca.length} registros no sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {registrosPresenca.map((registro) => (
                      <div key={registro.id} className="p-4 border rounded-lg flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{getFuncionarioNome(registro.funcionario_id)}</h3>
                          <p className="text-sm text-gray-600">Data: {new Date(registro.data).toLocaleDateString('pt-BR')}</p>
                          {registro.observacoes && <p className="text-sm text-gray-600">Obs: {registro.observacoes}</p>}
                        </div>
                        <div>
                          {registro.presente ? (
                            <Badge variant="default" className="bg-green-100 text-green-800">Presente</Badge>
                          ) : (
                            <Badge variant="destructive">{registro.tipo_falta}</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Documentos */}
          <TabsContent value="documentos">
            <Tabs defaultValue="atestados" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="atestados">Atestados Médicos</TabsTrigger>
                <TabsTrigger value="licencas">Licenças</TabsTrigger>
              </TabsList>
              
              <TabsContent value="atestados">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Registrar Atestado Médico</CardTitle>
                      <CardDescription>Cadastre um novo atestado médico</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleAtestadoSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="funcionario_atestado">Funcionário</Label>
                          <Select value={atestadoForm.funcionario_id} onValueChange={(value) => setAtestadoForm({...atestadoForm, funcionario_id: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o funcionário" />
                            </SelectTrigger>
                            <SelectContent>
                              {funcionarios.map((funcionario) => (
                                <SelectItem key={funcionario.id} value={funcionario.id}>{funcionario.nome}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="data_emissao_atestado">Data de Emissão</Label>
                          <Input
                            id="data_emissao_atestado"
                            type="date"
                            value={atestadoForm.data_emissao}
                            onChange={(e) => setAtestadoForm({...atestadoForm, data_emissao: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cid">CID</Label>
                          <Input
                            id="cid"
                            value={atestadoForm.cid}
                            onChange={(e) => setAtestadoForm({...atestadoForm, cid: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="dias_afastamento">Dias de Afastamento</Label>
                          <Input
                            id="dias_afastamento"
                            type="number"
                            value={atestadoForm.dias_afastamento}
                            onChange={(e) => setAtestadoForm({...atestadoForm, dias_afastamento: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="data_retorno_prevista">Data de Retorno Prevista</Label>
                          <Input
                            id="data_retorno_prevista"
                            type="date"
                            value={atestadoForm.data_retorno_prevista}
                            onChange={(e) => setAtestadoForm({...atestadoForm, data_retorno_prevista: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="observacoes_atestado">Observações</Label>
                          <Input
                            id="observacoes_atestado"
                            value={atestadoForm.observacoes}
                            onChange={(e) => setAtestadoForm({...atestadoForm, observacoes: e.target.value})}
                          />
                        </div>
                        <Button type="submit" className="w-full">Registrar Atestado</Button>
                      </form>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Atestados Registrados</CardTitle>
                      <CardDescription>{atestados.length} atestados no sistema</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {atestados.map((atestado) => (
                          <div key={atestado.id} className="p-4 border rounded-lg">
                            <h3 className="font-semibold">{getFuncionarioNome(atestado.funcionario_id)}</h3>
                            <p className="text-sm text-gray-600">CID: {atestado.cid}</p>
                            <p className="text-sm text-gray-600">Dias: {atestado.dias_afastamento}</p>
                            <p className="text-sm text-gray-600">Retorno: {new Date(atestado.data_retorno_prevista).toLocaleDateString('pt-BR')}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="licencas">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Registrar Licença</CardTitle>
                      <CardDescription>Cadastre uma nova licença</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleLicencaSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="funcionario_licenca">Funcionário</Label>
                          <Select value={licencaForm.funcionario_id} onValueChange={(value) => setLicencaForm({...licencaForm, funcionario_id: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o funcionário" />
                            </SelectTrigger>
                            <SelectContent>
                              {funcionarios.map((funcionario) => (
                                <SelectItem key={funcionario.id} value={funcionario.id}>{funcionario.nome}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="tipo_licenca">Tipo de Licença</Label>
                          <Select value={licencaForm.tipo} onValueChange={(value) => setLicencaForm({...licencaForm, tipo: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Maternidade">Maternidade</SelectItem>
                              <SelectItem value="Paternidade">Paternidade</SelectItem>
                              <SelectItem value="Nojo">Nojo</SelectItem>
                              <SelectItem value="Casamento">Casamento</SelectItem>
                              <SelectItem value="Médica">Médica</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="data_inicio_licenca">Data de Início</Label>
                          <Input
                            id="data_inicio_licenca"
                            type="date"
                            value={licencaForm.data_inicio}
                            onChange={(e) => setLicencaForm({...licencaForm, data_inicio: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="data_fim_licenca">Data de Fim</Label>
                          <Input
                            id="data_fim_licenca"
                            type="date"
                            value={licencaForm.data_fim}
                            onChange={(e) => setLicencaForm({...licencaForm, data_fim: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="motivo_licenca">Motivo</Label>
                          <Input
                            id="motivo_licenca"
                            value={licencaForm.motivo}
                            onChange={(e) => setLicencaForm({...licencaForm, motivo: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="observacoes_licenca">Observações</Label>
                          <Input
                            id="observacoes_licenca"
                            value={licencaForm.observacoes}
                            onChange={(e) => setLicencaForm({...licencaForm, observacoes: e.target.value})}
                          />
                        </div>
                        <Button type="submit" className="w-full">Registrar Licença</Button>
                      </form>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Licenças Registradas</CardTitle>
                      <CardDescription>{licencas.length} licenças no sistema</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {licencas.map((licenca) => (
                          <div key={licenca.id} className="p-4 border rounded-lg">
                            <h3 className="font-semibold">{getFuncionarioNome(licenca.funcionario_id)}</h3>
                            <p className="text-sm text-gray-600">Tipo: {licenca.tipo}</p>
                            <p className="text-sm text-gray-600">Período: {new Date(licenca.data_inicio).toLocaleDateString('pt-BR')} - {new Date(licenca.data_fim).toLocaleDateString('pt-BR')}</p>
                            <p className="text-sm text-gray-600">Motivo: {licenca.motivo}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;