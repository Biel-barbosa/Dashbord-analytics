
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import SalesChart from "@/components/dashboard/SalesChart";
import TopProducts from "@/components/dashboard/TopProducts";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const productsData = [
  { 
    id: 1, 
    name: "Smartphone XS Pro", 
    category: "Eletrônicos", 
    price: "R$ 2.499,90", 
    stock: 24, 
    status: "inStock",
    sales: 128
  },
  { 
    id: 2, 
    name: "Fones de Ouvido Bluetooth", 
    category: "Eletrônicos", 
    price: "R$ 249,90", 
    stock: 56, 
    status: "inStock",
    sales: 235
  },
  { 
    id: 3, 
    name: "Relógio Inteligente", 
    category: "Acessórios", 
    price: "R$ 599,90", 
    stock: 18, 
    status: "inStock",
    sales: 92
  },
  { 
    id: 4, 
    name: "Notebook Ultra", 
    category: "Eletrônicos", 
    price: "R$ 4.899,90", 
    stock: 7, 
    status: "lowStock",
    sales: 45
  },
  { 
    id: 5, 
    name: "Cadeira Ergonômica", 
    category: "Móveis", 
    price: "R$ 899,90", 
    stock: 12, 
    status: "inStock",
    sales: 67
  },
  { 
    id: 6, 
    name: "Monitor LED 27\"", 
    category: "Eletrônicos", 
    price: "R$ 1.299,90", 
    stock: 0, 
    status: "outOfStock",
    sales: 84
  },
  { 
    id: 7, 
    name: "Mochila Resistente à Água", 
    category: "Acessórios", 
    price: "R$ 179,90", 
    stock: 32, 
    status: "inStock",
    sales: 118
  },
  { 
    id: 8, 
    name: "Caixa de Som Bluetooth", 
    category: "Áudio", 
    price: "R$ 349,90", 
    stock: 5, 
    status: "lowStock",
    sales: 98
  },
];

const statusColors: Record<string, string> = {
  inStock: "bg-green-500",
  lowStock: "bg-yellow-500",
  outOfStock: "bg-red-500"
};

const statusLabels: Record<string, string> = {
  inStock: "Em estoque",
  lowStock: "Estoque baixo",
  outOfStock: "Esgotado"
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("all");
  const isMobile = useIsMobile();

  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || product.status === filter;
    const matchesCategory = category === "all" || product.category === category;
    
    return matchesSearch && matchesFilter && matchesCategory;
  });

  const categories = Array.from(new Set(productsData.map(product => product.category)));

  return (
    <div className="space-y-6 pb-6 max-w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Produtos</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
        <Card className="w-full overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>Total de Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{productsData.length}</div>
            <p className="text-sm text-muted-foreground">Em 3 categorias</p>
          </CardContent>
        </Card>
        
        <Card className="w-full overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>Vendas Totais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {productsData.reduce((acc, product) => acc + product.sales, 0)}
            </div>
            <p className="text-sm text-muted-foreground">+12% em relação ao mês passado</p>
          </CardContent>
        </Card>
        
        <Card className="w-full overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>Valor do Estoque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">R$ 248.742,90</div>
            <p className="text-sm text-muted-foreground">Atualizado hoje</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="md:col-span-2">
          <Card className="w-full overflow-hidden">
            <CardHeader>
              <CardTitle>Desempenho de Vendas</CardTitle>
            </CardHeader>
            <CardContent className="p-0 md:p-6">
              <div className="w-full max-w-full overflow-hidden">
                <SalesChart />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full">
          <TopProducts />
        </div>
      </div>

      <Card className="w-full overflow-hidden">
        <CardHeader>
          <CardTitle>Lista de Produtos</CardTitle>
        </CardHeader>
        <CardContent className="p-2 md:p-6">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row gap-4 mb-6 md:justify-between">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Estoque" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="inStock">Em estoque</SelectItem>
                  <SelectItem value="lowStock">Estoque baixo</SelectItem>
                  <SelectItem value="outOfStock">Esgotado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {isMobile ? (
            <div className="space-y-4">
              {filteredProducts.map(product => (
                <div key={product.id} className="border rounded-md p-3 space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="font-medium text-left">{product.name}</div>
                    <div className="text-right">{product.price}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{product.category}</Badge>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${statusColors[product.status]}`}></div>
                      <span className="text-sm">{product.stock} un.</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="text-xs text-muted-foreground">{product.sales} vendas</div>
                    <Button variant="ghost" size="sm">Editar</Button>
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
                      <TableHead>Produto</TableHead>
                      <TableHead className="hidden md:table-cell">Categoria</TableHead>
                      <TableHead>Preço</TableHead>
                      <TableHead>Estoque</TableHead>
                      <TableHead className="hidden md:table-cell">Vendas</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map(product => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          {product.name}
                          {isMobile && (
                            <div className="text-xs mt-1">
                              <Badge variant="outline" className="mr-1">{product.category}</Badge>
                              <span className="text-muted-foreground">{product.sales} vendas</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline">{product.category}</Badge>
                        </TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${statusColors[product.status]}`}></div>
                            <span>{product.stock} un.</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{product.sales}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Editar</Button>
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
              Mostrando <strong>1</strong> a <strong>{filteredProducts.length}</strong> de <strong>{productsData.length}</strong> produtos
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

export default Products;
