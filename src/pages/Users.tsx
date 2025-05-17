
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import UserChart from "@/components/dashboard/UserChart";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const usersData = [
  { id: 1, name: "Amanda Silva", email: "amanda@exemplo.com", status: "active", role: "Admin", lastActive: "Agora mesmo" },
  { id: 2, name: "Caio Oliveira", email: "caio@exemplo.com", status: "active", role: "Gerente", lastActive: "2 min atrás" },
  { id: 3, name: "Bruna Santos", email: "bruna@exemplo.com", status: "inactive", role: "Usuário", lastActive: "3 horas atrás" },
  { id: 4, name: "Diego Lima", email: "diego@exemplo.com", status: "active", role: "Usuário", lastActive: "1 hora atrás" },
  { id: 5, name: "Eduarda Costa", email: "eduarda@exemplo.com", status: "active", role: "Usuário", lastActive: "5 min atrás" },
  { id: 6, name: "Fábio Mendes", email: "fabio@exemplo.com", status: "pending", role: "Usuário", lastActive: "1 dia atrás" },
  { id: 7, name: "Gabriela Rocha", email: "gabriela@exemplo.com", status: "active", role: "Gerente", lastActive: "30 min atrás" },
  { id: 8, name: "Henrique Alves", email: "henrique@exemplo.com", status: "inactive", role: "Usuário", lastActive: "2 dias atrás" },
];

const statusColors: Record<string, string> = {
  active: "bg-green-500",
  inactive: "bg-gray-400",
  pending: "bg-yellow-500"
};

const statusLabels: Record<string, string> = {
  active: "Ativo",
  inactive: "Inativo",
  pending: "Pendente"
};

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const isMobile = useIsMobile();

  const filteredUsers = usersData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || user.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 pb-6 max-w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Usuários</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card className="w-full overflow-hidden">
          <CardHeader>
            <CardTitle>Estatísticas de Usuários</CardTitle>
          </CardHeader>
          <CardContent className="p-0 md:p-6">
            <div className="w-full max-w-full overflow-hidden">
              <UserChart />
            </div>
          </CardContent>
        </Card>
        
        <Card className="w-full overflow-hidden">
          <CardHeader>
            <CardTitle>Atividade de Usuários</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Novos Usuários</span>
                  <span className="text-sm font-medium">+28</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-brand-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Usuários Ativos</span>
                  <span className="text-sm font-medium">214</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-brand-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Taxa de Retenção</span>
                  <span className="text-sm font-medium">68%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-brand-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Tempo de Sessão</span>
                  <span className="text-sm font-medium">4:32</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-brand-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full overflow-hidden">
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
        </CardHeader>
        <CardContent className="p-2 md:p-6">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row gap-4 mb-6 justify-between">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar usuários..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="inactive">Inativos</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {isMobile ? (
            <div className="space-y-4">
              {filteredUsers.map(user => (
                <div key={user.id} className="border rounded-md p-3 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${statusColors[user.status]}`}></div>
                      <span className="text-sm">{statusLabels[user.status]}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center justify-between pt-1">
                    <Badge variant="outline">{user.role}</Badge>
                    <div className="text-xs text-muted-foreground">{user.lastActive}</div>
                    <Button variant="ghost" size="sm" className="ml-auto">Detalhes</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <div className="border rounded-md overflow-hidden min-w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">Cargo</TableHead>
                      <TableHead className="hidden md:table-cell">Última atividade</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map(user => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          <div>
                            {user.name}
                            <div className="text-xs text-muted-foreground md:hidden">{user.email}</div>
                            {isMobile && (
                              <div className="text-xs mt-1">
                                <Badge variant="outline" className="mr-1">{user.role}</Badge>
                                <span className="text-muted-foreground">{user.lastActive}</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${statusColors[user.status]}`}></div>
                            <span>{statusLabels[user.status]}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{user.lastActive}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Detalhes</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
          
          <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-2">
            <div className="text-sm text-muted-foreground">
              Mostrando <strong>1</strong> a <strong>{filteredUsers.length}</strong> de <strong>{usersData.length}</strong> usuários
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
