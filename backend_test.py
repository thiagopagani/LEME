import requests
import sys
from datetime import datetime, date
import json

class WorkforceAPITester:
    def __init__(self, base_url="https://workforce-pro-1.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.created_ids = {
            'empresa': None,
            'cliente': None,
            'funcao': None,
            'funcionario': None,
            'presenca': None,
            'atestado': None,
            'licenca': None
        }

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if isinstance(response_data, dict) and 'id' in response_data:
                        print(f"   Created ID: {response_data['id']}")
                    return True, response_data
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_detail = response.json()
                    print(f"   Error: {error_detail}")
                except:
                    print(f"   Error: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        success, response = self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200
        )
        return success

    def test_dashboard_stats(self):
        """Test dashboard statistics"""
        success, response = self.run_test(
            "Dashboard Statistics",
            "GET",
            "dashboard",
            200
        )
        if success:
            expected_fields = ['total_funcionarios', 'total_clientes', 'total_empresas', 
                             'funcionarios_presentes_hoje', 'funcionarios_ausentes_hoje', 'atestados_ativos']
            for field in expected_fields:
                if field not in response:
                    print(f"⚠️  Warning: Missing field '{field}' in dashboard response")
        return success

    def test_create_empresa(self):
        """Test creating a company"""
        empresa_data = {
            "razao_social": "Empresa Teste LTDA",
            "cnpj": "12.345.678/0001-90",
            "inscricao_municipal": "123456",
            "logradouro": "Rua Teste, 123",
            "cep": "12345-678",
            "cidade": "São Paulo",
            "estado": "SP"
        }
        
        success, response = self.run_test(
            "Create Empresa",
            "POST",
            "empresas",
            200,
            data=empresa_data
        )
        
        if success and 'id' in response:
            self.created_ids['empresa'] = response['id']
        return success

    def test_get_empresas(self):
        """Test getting all companies"""
        success, response = self.run_test(
            "Get Empresas",
            "GET",
            "empresas",
            200
        )
        return success

    def test_create_cliente(self):
        """Test creating a client"""
        cliente_data = {
            "razao_social": "Cliente Teste LTDA",
            "cnpj": "98.765.432/0001-10",
            "logradouro": "Av. Cliente, 456",
            "cep": "87654-321",
            "cidade": "Rio de Janeiro",
            "estado": "RJ",
            "area_atuacao": "condominio",
            "valor_contrato": 15000.50,
            "descricao_servicos": "Serviços de portaria e limpeza",
            "sindico_responsavel": "João Silva"
        }
        
        success, response = self.run_test(
            "Create Cliente",
            "POST",
            "clientes",
            200,
            data=cliente_data
        )
        
        if success and 'id' in response:
            self.created_ids['cliente'] = response['id']
        return success

    def test_get_clientes(self):
        """Test getting all clients"""
        success, response = self.run_test(
            "Get Clientes",
            "GET",
            "clientes",
            200
        )
        return success

    def test_create_funcao(self):
        """Test creating a function/role"""
        funcao_data = {
            "nome": "Porteiro",
            "descricao": "Responsável pela portaria e controle de acesso",
            "cbo": "5174-10"
        }
        
        success, response = self.run_test(
            "Create Funcao",
            "POST",
            "funcoes",
            200,
            data=funcao_data
        )
        
        if success and 'id' in response:
            self.created_ids['funcao'] = response['id']
        return success

    def test_get_funcoes(self):
        """Test getting all functions"""
        success, response = self.run_test(
            "Get Funcoes",
            "GET",
            "funcoes",
            200
        )
        return success

    def test_create_funcionario(self):
        """Test creating an employee"""
        if not self.created_ids['empresa'] or not self.created_ids['cliente'] or not self.created_ids['funcao']:
            print("❌ Cannot create funcionario - missing required IDs")
            return False
            
        funcionario_data = {
            "nome": "João da Silva",
            "endereco": "Rua das Flores, 789",
            "telefone": "(11) 99999-9999",
            "cidade": "São Paulo",
            "estado": "SP",
            "cep": "01234-567",
            "funcao_id": self.created_ids['funcao'],
            "local_nascimento": "São Paulo, SP",
            "nome_pai": "José da Silva",
            "nome_mae": "Maria da Silva",
            "matricula_esocial": "12345678901",
            "cbo": "5174-10",
            "rg": "12.345.678-9",
            "data_emissao_rg": "2020-01-15",
            "orgao_emissor_rg": "SSP-SP",
            "cpf": "123.456.789-00",
            "ctps": "1234567890",
            "data_emissao_ctps": "2020-02-01",
            "orgao_emissor_ctps": "MTE",
            "titulo_eleitor": "123456789012",
            "zona_eleitoral": "001",
            "secao_eleitoral": "0001",
            "escolaridade": "Médio Completo",
            "estado_civil": "Solteiro",
            "nacionalidade": "Brasileira",
            "horario_trabalho": "08:00 às 17:00",
            "numero_pis": "12345678901",
            "salario": 2500.00,
            "empresa_id": self.created_ids['empresa'],
            "data_admissao": "2024-01-15",
            "tem_dependentes": False,
            "quantidade_dependentes": 0,
            "cliente_id": self.created_ids['cliente'],
            "posto_alocacao": "Portaria Principal"
        }
        
        success, response = self.run_test(
            "Create Funcionario",
            "POST",
            "funcionarios",
            200,
            data=funcionario_data
        )
        
        if success and 'id' in response:
            self.created_ids['funcionario'] = response['id']
        return success

    def test_get_funcionarios(self):
        """Test getting all employees"""
        success, response = self.run_test(
            "Get Funcionarios",
            "GET",
            "funcionarios",
            200
        )
        return success

    def test_get_funcionario_by_id(self):
        """Test getting a specific employee"""
        if not self.created_ids['funcionario']:
            print("❌ Cannot test get funcionario by ID - no funcionario created")
            return False
            
        success, response = self.run_test(
            "Get Funcionario by ID",
            "GET",
            f"funcionarios/{self.created_ids['funcionario']}",
            200
        )
        return success

    def test_create_presenca(self):
        """Test creating attendance record"""
        if not self.created_ids['funcionario']:
            print("❌ Cannot create presenca - no funcionario created")
            return False
            
        presenca_data = {
            "funcionario_id": self.created_ids['funcionario'],
            "data": date.today().isoformat(),
            "presente": True,
            "observacoes": "Presente no horário"
        }
        
        success, response = self.run_test(
            "Create Presenca",
            "POST",
            "presenca",
            200,
            data=presenca_data
        )
        
        if success and 'id' in response:
            self.created_ids['presenca'] = response['id']
        return success

    def test_get_presenca(self):
        """Test getting attendance records"""
        success, response = self.run_test(
            "Get Presenca",
            "GET",
            "presenca",
            200
        )
        return success

    def test_create_atestado(self):
        """Test creating medical certificate"""
        if not self.created_ids['funcionario']:
            print("❌ Cannot create atestado - no funcionario created")
            return False
            
        atestado_data = {
            "funcionario_id": self.created_ids['funcionario'],
            "data_emissao": date.today().isoformat(),
            "cid": "Z76.1",
            "dias_afastamento": 3,
            "data_retorno_prevista": "2024-07-20",
            "observacoes": "Repouso médico"
        }
        
        success, response = self.run_test(
            "Create Atestado",
            "POST",
            "atestados",
            200,
            data=atestado_data
        )
        
        if success and 'id' in response:
            self.created_ids['atestado'] = response['id']
        return success

    def test_get_atestados(self):
        """Test getting medical certificates"""
        success, response = self.run_test(
            "Get Atestados",
            "GET",
            "atestados",
            200
        )
        return success

    def test_create_licenca(self):
        """Test creating license"""
        if not self.created_ids['funcionario']:
            print("❌ Cannot create licenca - no funcionario created")
            return False
            
        licenca_data = {
            "funcionario_id": self.created_ids['funcionario'],
            "tipo": "Paternidade",
            "data_inicio": "2024-07-15",
            "data_fim": "2024-07-19",
            "motivo": "Nascimento do filho",
            "observacoes": "Licença paternidade"
        }
        
        success, response = self.run_test(
            "Create Licenca",
            "POST",
            "licencas",
            200,
            data=licenca_data
        )
        
        if success and 'id' in response:
            self.created_ids['licenca'] = response['id']
        return success

    def test_get_licencas(self):
        """Test getting licenses"""
        success, response = self.run_test(
            "Get Licencas",
            "GET",
            "licencas",
            200
        )
        return success

def main():
    print("🚀 Starting Workforce Management System API Tests")
    print("=" * 60)
    
    # Setup
    tester = WorkforceAPITester()
    
    # Test sequence following the suggested workflow
    tests = [
        # Basic endpoints
        tester.test_root_endpoint,
        tester.test_dashboard_stats,
        
        # Create workflow: empresa → cliente → função → funcionário
        tester.test_create_empresa,
        tester.test_get_empresas,
        tester.test_create_cliente,
        tester.test_get_clientes,
        tester.test_create_funcao,
        tester.test_get_funcoes,
        tester.test_create_funcionario,
        tester.test_get_funcionarios,
        tester.test_get_funcionario_by_id,
        
        # Attendance and documents
        tester.test_create_presenca,
        tester.test_get_presenca,
        tester.test_create_atestado,
        tester.test_get_atestados,
        tester.test_create_licenca,
        tester.test_get_licencas,
        
        # Verify dashboard updates
        tester.test_dashboard_stats,
    ]
    
    # Run all tests
    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test failed with exception: {str(e)}")
            tester.tests_run += 1
    
    # Print results
    print("\n" + "=" * 60)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print(f"⚠️  {tester.tests_run - tester.tests_passed} tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())