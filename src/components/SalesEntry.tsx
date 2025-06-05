
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Calendar, Package } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const SalesEntry = () => {
  const [saleData, setSaleData] = useState({
    productName: '',
    quantity: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [recentSales, setRecentSales] = useState([
    { id: 1, product: 'Minyak Goreng Bimoli 1L', quantity: 2, total: 36000, time: '10:30' },
    { id: 2, product: 'Mie Instan Indomie', quantity: 5, total: 17500, time: '11:15' },
    { id: 3, product: 'Rokok Gudang Garam', quantity: 1, total: 25000, time: '12:00' },
    { id: 4, product: 'Gula Pasir 1kg', quantity: 1, total: 15000, time: '13:45' },
  ]);

  // Sample products for dropdown
  const products = [
    { name: 'Minyak Goreng Bimoli 1L', price: 18000, stock: 25 },
    { name: 'Beras Premium 5kg', price: 65000, stock: 2 },
    { name: 'Gula Pasir 1kg', price: 15000, stock: 3 },
    { name: 'Mie Instan Indomie', price: 3500, stock: 45 },
    { name: 'Sabun Mandi Lifebuoy', price: 8500, stock: 1 },
    { name: 'Rokok Gudang Garam', price: 25000, stock: 30 },
    { name: 'Kopi Kapal Api Sachet', price: 1500, stock: 8 },
    { name: 'Susu Kental Manis', price: 12000, stock: 15 },
  ];

  const selectedProduct = products.find(p => p.name === saleData.productName);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!saleData.productName || !saleData.quantity) {
      toast({
        title: "Error",
        description: "Mohon pilih produk dan masukkan jumlah",
        variant: "destructive",
      });
      return;
    }

    const quantity = parseInt(saleData.quantity);
    const product = products.find(p => p.name === saleData.productName);
    
    if (!product) {
      toast({
        title: "Error",
        description: "Produk tidak ditemukan",
        variant: "destructive",
      });
      return;
    }

    if (quantity > product.stock) {
      toast({
        title: "Error",
        description: `Stok tidak mencukupi. Stok tersedia: ${product.stock}`,
        variant: "destructive",
      });
      return;
    }

    const newSale = {
      id: Date.now(),
      product: saleData.productName,
      quantity: quantity,
      total: quantity * product.price,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setRecentSales([newSale, ...recentSales]);
    setSaleData({
      productName: '',
      quantity: '',
      date: new Date().toISOString().split('T')[0],
    });

    toast({
      title: "Sukses",
      description: `Penjualan ${saleData.productName} (${quantity}x) berhasil dicatat`,
    });
  };

  const getTotalToday = () => {
    return recentSales.reduce((total, sale) => total + sale.total, 0);
  };

  return (
    <div className="space-y-6">
      {/* Sales Entry Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Input Penjualan
          </CardTitle>
          <CardDescription>Catat penjualan produk secara manual</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="product">Pilih Produk</Label>
              <Select 
                value={saleData.productName} 
                onValueChange={(value) => setSaleData({ ...saleData, productName: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih produk yang dijual" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.name} value={product.name}>
                      <div className="flex justify-between items-center w-full">
                        <span>{product.name}</span>
                        <span className="text-sm text-gray-500 ml-4">
                          Rp {product.price.toLocaleString()} (Stok: {product.stock})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedProduct && (
              <div className="p-3 bg-blue-50 rounded-lg border">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{selectedProduct.name}</div>
                    <div className="text-sm text-gray-600">
                      Harga: Rp {selectedProduct.price.toLocaleString()}
                    </div>
                  </div>
                  <Badge variant={selectedProduct.stock <= 5 ? "destructive" : "default"}>
                    Stok: {selectedProduct.stock}
                  </Badge>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Jumlah Dijual</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={saleData.quantity}
                  onChange={(e) => setSaleData({ ...saleData, quantity: e.target.value })}
                  placeholder="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Tanggal</Label>
                <Input
                  id="date"
                  type="date"
                  value={saleData.date}
                  onChange={(e) => setSaleData({ ...saleData, date: e.target.value })}
                />
              </div>
            </div>

            {selectedProduct && saleData.quantity && (
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="text-sm text-gray-600">Total Penjualan:</div>
                <div className="text-2xl font-bold text-green-600">
                  Rp {(selectedProduct.price * parseInt(saleData.quantity || 0)).toLocaleString()}
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" size="lg">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Catat Penjualan
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Recent Sales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Penjualan Hari Ini
          </CardTitle>
          <CardDescription>
            Total: Rp {getTotalToday().toLocaleString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentSales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{sale.product}</div>
                    <div className="text-sm text-gray-600">{sale.quantity}x - {sale.time}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">Rp {sale.total.toLocaleString()}</div>
                </div>
              </div>
            ))}

            {recentSales.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Belum ada penjualan hari ini
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* WhatsApp Sales Instructions */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800">Cara Input Penjualan via WhatsApp</CardTitle>
          <CardDescription className="text-green-700">
            Kirim pesan dengan format berikut untuk mencatat penjualan otomatis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="text-sm font-medium text-green-800">Format: "jual [nama produk] [jumlah]"</div>
            <div className="space-y-1 text-sm text-green-700">
              <div>• jual minyak goreng 2</div>
              <div>• jual rokok 1</div>
              <div>• jual gula 3</div>
              <div>• jual mie instan 5</div>
            </div>
          </div>
          <div className="text-xs text-green-600 mt-3">
            💡 Sistem akan otomatis mengenali produk dan memperbarui stok
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesEntry;
