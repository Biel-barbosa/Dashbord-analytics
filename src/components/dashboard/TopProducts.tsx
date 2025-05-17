
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const topProducts = [
  {
    id: 1,
    name: "Smartphone XS Pro",
    sales: 5489,
    percentage: 28,
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    sales: 4356,
    percentage: 22,
  },
  {
    id: 3,
    name: "Smart Watch Elite",
    sales: 3721,
    percentage: 19,
  },
  {
    id: 4,
    name: "Laptop Ultra",
    sales: 3102,
    percentage: 16,
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    sales: 2845,
    percentage: 15,
  },
];

const TopProducts = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {topProducts.map((product) => (
            <div key={product.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{product.name}</span>
                <span className="text-sm text-muted-foreground">
                  ${product.sales.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={product.percentage} className="h-2" />
                <span className="text-sm font-medium">{product.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopProducts;
