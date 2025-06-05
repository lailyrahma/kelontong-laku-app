
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Plus, Search, Edit, TrendingUp, Package, AlertTriangle, MessageCircle, ShoppingCart } from 'lucide-react';
import ProductTable from '@/components/ProductTable';
import SalesEntry from '@/components/SalesEntry';
import RecommendationsPanel from '@/components/RecommendationsPanel';
import WhatsAppGuide from '@/components/WhatsAppGuide';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sample data
  const salesData = [
    { day: 'Sen', sales: 150000 },
    { day: 'Sel', sales: 230000 },
    { day: 'Rab', sales: 180000 },
    { day: 'Kam', sales: 290000 },
    { day: 'Jum', sales: 340000 },
    { day: 'Sab', sales: 420000 },
    { day: 'Min', sales: 380000 },
  ];

  const monthlySales = [
    { month: 'Jan', sales: 4500000 },
    { month: 'Feb', sales: 5200000 },
    { month: 'Mar', sales: 4800000 },
    { month: 'Apr', sales: 6100000 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">Dashboard Warung</h1>
          <p className="text-green-100">Kelola toko Anda dengan mudah</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Stok</span>
            </TabsTrigger>
            <TabsTrigger value="sales" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Penjualan</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="hidden sm:inline">Saran</span>
            </TabsTrigger>
            <TabsTrigger value="whatsapp" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Penjualan Hari Ini</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">Rp 380.000</div>
                  <p className="text-sm text-green-600">+12% dari kemarin</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Penjualan Minggu Ini</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">Rp 1.990.000</div>
                  <p className="text-sm text-blue-600">+8% dari minggu lalu</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Produk Terlaris</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-purple-600">Minyak Goreng</div>
                  <p className="text-sm text-purple-600">15 terjual hari ini</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Stok Menipis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">5</div>
                  <p className="text-sm text-orange-600">produk perlu restock</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Penjualan 7 Hari Terakhir</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`Rp ${value.toLocaleString()}`, 'Penjualan']} />
                      <Bar dataKey="sales" fill="#16a34a" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Trend Bulanan</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={monthlySales}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`Rp ${value.toLocaleString()}`, 'Penjualan']} />
                      <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Low Stock Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Peringatan Stok Menipis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Gula Pasir 1kg', stock: 3, minStock: 10 },
                    { name: 'Beras Premium 5kg', stock: 2, minStock: 8 },
                    { name: 'Mie Instan', stock: 5, minStock: 20 },
                    { name: 'Sabun Mandi', stock: 1, minStock: 15 },
                    { name: 'Kopi Sachet', stock: 8, minStock: 25 },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border-l-4 border-l-orange-500">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600">Sisa: {item.stock} | Min: {item.minStock}</div>
                      </div>
                      <Badge variant="destructive">{item.stock} tersisa</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory">
            <ProductTable />
          </TabsContent>

          <TabsContent value="sales">
            <SalesEntry />
          </TabsContent>

          <TabsContent value="recommendations">
            <RecommendationsPanel />
          </TabsContent>

          <TabsContent value="whatsapp">
            <WhatsAppGuide />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
