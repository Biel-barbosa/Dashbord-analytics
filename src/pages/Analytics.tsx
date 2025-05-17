
import React, { useState } from "react";
import SalesChart from "@/components/dashboard/SalesChart";
import StatCard from "@/components/dashboard/StatCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Activity, TrendingUp, DollarSign } from "lucide-react";

const Analytics = () => {
  const [timeFilter, setTimeFilter] = useState("7d");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Análises</h2>
        <div className="flex items-center gap-2">
          <Select
            value={timeFilter}
            onValueChange={setTimeFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecionar período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Últimas 24 horas</SelectItem>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Último trimestre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Crescimento"
          value="24,3%"
          description="Taxa de crescimento mensal"
          icon={<TrendingUp className="h-5 w-5" />}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatCard
          title="Conversões"
          value="3,8%"
          description="Taxa de conversão média"
          icon={<Activity className="h-5 w-5" />}
          trend={{ value: 2.1, isPositive: true }}
        />
        <StatCard
          title="Média de Vendas"
          value="R$ 452"
          description="Valor médio por venda"
          icon={<DollarSign className="h-5 w-5" />}
          trend={{ value: 5.3, isPositive: true }}
        />
        <StatCard
          title="Desempenho"
          value="92,8%"
          description="Índice de eficiência"
          icon={<BarChart3 className="h-5 w-5" />}
          trend={{ value: 1.2, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tendência de Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesChart />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Desempenho por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Eletrônicos</span>
                  <span className="font-medium">R$ 48.329</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div className="bg-brand-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span>Moda</span>
                  <span className="font-medium">R$ 32.847</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div className="bg-brand-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span>Casa & Jardim</span>
                  <span className="font-medium">R$ 29.483</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div className="bg-brand-500 h-2 rounded-full" style={{ width: '54%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span>Esportes</span>
                  <span className="font-medium">R$ 18.592</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div className="bg-brand-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span>Beleza & Saúde</span>
                  <span className="font-medium">R$ 15.248</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div className="bg-brand-500 h-2 rounded-full" style={{ width: '36%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Métricas de Conversão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <SalesChart />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Tráfego</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-brand-500 mr-2"></div>
                  <span>Orgânico</span>
                </div>
                <span>42%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                  <span>Pago</span>
                </div>
                <span>28%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-violet-500 mr-2"></div>
                  <span>Redes Sociais</span>
                </div>
                <span>18%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
                  <span>Email</span>
                </div>
                <span>8%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                  <span>Outros</span>
                </div>
                <span>4%</span>
              </div>
              
              <div className="h-4 w-full bg-gray-100 rounded-full mt-4 overflow-hidden flex">
                <div className="h-full bg-brand-500" style={{ width: '42%' }}></div>
                <div className="h-full bg-indigo-500" style={{ width: '28%' }}></div>
                <div className="h-full bg-violet-500" style={{ width: '18%' }}></div>
                <div className="h-full bg-pink-500" style={{ width: '8%' }}></div>
                <div className="h-full bg-gray-400" style={{ width: '4%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
