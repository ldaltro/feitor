"use client";

import { useAuth } from "@/components/auth-provider";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Building, Plus } from "lucide-react";
import { CreateFarmDialog } from "@/components/admin/create-farm-dialog";
import { CreateUserDialog } from "@/components/admin/create-user-dialog";

interface Farm {
  id: string;
  name: string;
  address: string | null;
  phone: string | null;
  active: boolean;
  createdAt: string;
  users: Array<{
    id: string;
    username: string;
    email: string;
    fullName: string;
    role: string;
    active: boolean;
    createdAt: string;
  }>;
  _count: {
    animals: number;
    lotes: number;
    events: number;
    transactions: number;
  };
}

export default function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loadingFarms, setLoadingFarms] = useState(true);
  const [createFarmOpen, setCreateFarmOpen] = useState(false);
  const [createUserOpen, setCreateUserOpen] = useState(false);

  useEffect(() => {
    if (!loading && isAdmin()) {
      fetchFarms();
    }
  }, [loading, isAdmin]);

  const fetchFarms = async () => {
    try {
      const response = await fetch('/api/admin/farms');
      if (response.ok) {
        const data = await response.json();
        setFarms(data.farms);
      }
    } catch (error) {
      console.error('Erro ao carregar fazendas:', error);
    } finally {
      setLoadingFarms(false);
    }
  };

  if (loading) {
    return <div className="p-6">Carregando...</div>;
  }

  if (!isAdmin()) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Acesso Negado</h1>
          <p className="text-gray-600">Você não tem permissão para acessar esta página.</p>
        </div>
      </div>
    );
  }

  const totalUsers = farms.reduce((acc, farm) => acc + farm.users.length, 0);
  const totalOwners = farms.reduce((acc, farm) => acc + farm.users.filter(u => u.role === 'OWNER').length, 0);
  const totalEmployees = farms.reduce((acc, farm) => acc + farm.users.filter(u => u.role === 'EMPLOYEE').length, 0);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <p className="text-gray-600">Gerencie fazendas e usuários do sistema</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setCreateFarmOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nova Fazenda
          </Button>
          <Button onClick={() => setCreateUserOpen(true)} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Novo Usuário
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Fazendas</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{farms.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proprietários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOwners}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Funcionários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
          </CardContent>
        </Card>
      </div>

      {/* Farms List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Fazendas</h2>
        {loadingFarms ? (
          <div>Carregando fazendas...</div>
        ) : farms.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-gray-500">
                <Building className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Nenhuma fazenda encontrada</p>
                <Button className="mt-2" onClick={() => setCreateFarmOpen(true)}>
                  Criar primeira fazenda
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {farms.map((farm) => (
              <Card key={farm.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{farm.name}</CardTitle>
                      <CardDescription>
                        {farm.address && <span>{farm.address}</span>}
                        {farm.phone && <span className="ml-2">📞 {farm.phone}</span>}
                      </CardDescription>
                    </div>
                    <Badge variant={farm.active ? "default" : "secondary"}>
                      {farm.active ? "Ativa" : "Inativa"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-sm">
                      <span className="font-medium">Animais:</span> {farm._count.animals}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Lotes:</span> {farm._count.lotes}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Eventos:</span> {farm._count.events}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Transações:</span> {farm._count.transactions}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Usuários ({farm.users.length})</h4>
                    {farm.users.length === 0 ? (
                      <p className="text-sm text-gray-500">Nenhum usuário associado</p>
                    ) : (
                      <div className="space-y-1">
                        {farm.users.map((farmUser) => (
                          <div key={farmUser.id} className="flex items-center justify-between text-sm">
                            <div>
                              <span className="font-medium">{farmUser.fullName}</span>
                              <span className="text-gray-500 ml-2">({farmUser.username})</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" size="sm">
                                {farmUser.role === 'OWNER' ? 'Proprietário' : 'Funcionário'}
                              </Badge>
                              <Badge variant={farmUser.active ? "default" : "secondary"} size="sm">
                                {farmUser.active ? "Ativo" : "Inativo"}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <CreateFarmDialog 
        open={createFarmOpen} 
        onOpenChange={setCreateFarmOpen}
        onSuccess={fetchFarms}
      />
      <CreateUserDialog 
        open={createUserOpen} 
        onOpenChange={setCreateUserOpen}
        onSuccess={fetchFarms}
        farms={farms}
      />
    </div>
  );
}