
import React from "react";
import StatCard from "@/components/dashboard/StatCard";
import SalesChart from "@/components/dashboard/SalesChart";
import TopProducts from "@/components/dashboard/TopProducts";
import UserChart from "@/components/dashboard/UserChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users, ShoppingBag, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Receita Total"
          value="R$48.294"
          description="Receita total no período"
          icon={<DollarSign className="h-5 w-5" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Vendas"
          value="2.942"
          description="Vendas totais no período"
          icon={<ShoppingBag className="h-5 w-5" />}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatCard
          title="Usuários Ativos"
          value="7.842"
          description="Total de usuários ativos"
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 3.1, isPositive: true }}
        />
        <StatCard
          title="Taxa de Conversão"
          value="2,4%"
          description="De visitantes para clientes"
          icon={<BarChart3 className="h-5 w-5" />}
          trend={{ value: 0.8, isPositive: false }}
        />
      </div>

      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales">Análise de Vendas</TabsTrigger>
          <TabsTrigger value="users">Análise de Usuários</TabsTrigger>
          <TabsTrigger value="products">Análise de Produtos</TabsTrigger>
        </TabsList>
        <TabsContent value="sales" className="space-y-4">
          <SalesChart />
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UserChart />
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Métricas de Usuários</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Novos Usuários</span>
                      <span className="text-sm font-medium">+842</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-brand-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Usuários Ativos</span>
                      <span className="text-sm font-medium">7.842</span>
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
                      <span className="text-sm font-medium">Duração da Sessão</span>
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
        </TabsContent>
        <TabsContent value="products" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <SalesChart />
            </div>
            <TopProducts />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
