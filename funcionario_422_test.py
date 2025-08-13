import requests
import json
from datetime import date

def test_funcionario_422_error():
    """Test employee creation with the specific IDs mentioned in the review request"""
    
    base_url = "https://workforce-pro-1.preview.emergentagent.com"
    api_url = f"{base_url}/api"
    
    # Test data using the IDs from the review request
    funcionario_data = {
        "nome": "Funcionário Teste",
        "endereco": "Rua Teste, 123",
        "telefone": "(11) 99999-9999",
        "cidade": "São Paulo",
        "estado": "SP",
        "cep": "01234-567",
        "funcao_id": "af6d641b-2725-4626-b7fd-77591dc120e5",  # From review request
        "local_nascimento": "São Paulo, SP",
        "nome_pai": "José Teste",
        "nome_mae": "Maria Teste",
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
        "empresa_id": "5d8a8fc4-2944-4a50-830d-0138fb4f84a2",  # From review request
        "data_admissao": "2024-01-15",
        "tem_dependentes": False,
        "quantidade_dependentes": 0,
        "cliente_id": "57b13851-5c46-4809-bd14-73d85e172f30",  # From review request
        "posto_alocacao": "Portaria Principal"
    }
    
    print("🔍 Testing Employee Creation with Review Request IDs...")
    print(f"   URL: {api_url}/funcionarios")
    print(f"   Data: {json.dumps(funcionario_data, indent=2)}")
    
    try:
        response = requests.post(
            f"{api_url}/funcionarios",
            json=funcionario_data,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        
        print(f"\n📊 Response Status: {response.status_code}")
        
        if response.status_code == 200:
            print("✅ SUCCESS: Employee created successfully!")
            response_data = response.json()
            print(f"   Created Employee ID: {response_data.get('id', 'N/A')}")
        elif response.status_code == 422:
            print("❌ 422 VALIDATION ERROR - This is the issue!")
            try:
                error_detail = response.json()
                print(f"   Error Details: {json.dumps(error_detail, indent=2)}")
            except:
                print(f"   Raw Error: {response.text}")
        else:
            print(f"❌ UNEXPECTED ERROR: {response.status_code}")
            try:
                error_detail = response.json()
                print(f"   Error Details: {json.dumps(error_detail, indent=2)}")
            except:
                print(f"   Raw Error: {response.text}")
                
    except Exception as e:
        print(f"❌ REQUEST FAILED: {str(e)}")

def verify_existing_data():
    """Verify that the IDs from the review request actually exist"""
    
    base_url = "https://workforce-pro-1.preview.emergentagent.com"
    api_url = f"{base_url}/api"
    
    # Check if the IDs exist
    ids_to_check = {
        "empresa": "5d8a8fc4-2944-4a50-830d-0138fb4f84a2",
        "cliente": "57b13851-5c46-4809-bd14-73d85e172f30", 
        "funcao": "af6d641b-2725-4626-b7fd-77591dc120e5"
    }
    
    print("\n🔍 Verifying existing data from review request...")
    
    for entity_type, entity_id in ids_to_check.items():
        try:
            if entity_type == "empresa":
                endpoint = "empresas"
            elif entity_type == "cliente":
                endpoint = "clientes"
            elif entity_type == "funcao":
                endpoint = "funcoes"
                
            response = requests.get(f"{api_url}/{endpoint}", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                found = any(item.get('id') == entity_id for item in data)
                if found:
                    print(f"✅ {entity_type.upper()} ID {entity_id} EXISTS")
                else:
                    print(f"❌ {entity_type.upper()} ID {entity_id} NOT FOUND")
                    print(f"   Available IDs: {[item.get('id') for item in data[:3]]}")
            else:
                print(f"❌ Failed to fetch {endpoint}: {response.status_code}")
                
        except Exception as e:
            print(f"❌ Error checking {entity_type}: {str(e)}")

if __name__ == "__main__":
    verify_existing_data()
    test_funcionario_422_error()