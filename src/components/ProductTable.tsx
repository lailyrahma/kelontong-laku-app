
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Edit, Package } from 'lucide-react';
import AddProductDialog from './AddProductDialog';
import EditProductDialog from './EditProductDialog';

const ProductTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [products, setProducts] = useState([
    { id: 1, name: 'Minyak Goreng Bimoli 1L', price: 18000, stock: 25, category: 'Makanan', minStock: 10 },
    { id: 2, name: 'Beras Premium 5kg', price: 65000, stock: 2, category: 'Makanan', minStock: 8 },
    { id: 3, name: 'Gula Pasir 1kg', price: 15000, stock: 3, category: 'Makanan', minStock: 10 },
    { id: 4, name: 'Mie Instan Indomie', price: 3500, stock: 45, category: 'Makanan', minStock: 20 },
    { id: 5, name: 'Sabun Mandi Lifebuoy', price: 8500, stock: 1, category: 'Kebersihan', minStock: 15 },
    { id: 6, name: 'Rokok Gudang Garam', price: 25000, stock: 30, category: 'Rokok', minStock: 12 },
    { id: 7, name: 'Kopi Kapal Api Sachet', price: 1500, stock: 8, category: 'Minuman', minStock: 25 },
    { id: 8, name: 'Susu Kental Manis', price: 12000, stock: 15, category: 'Minuman', minStock: 10 },
  ]);

  const getStockStatus = (stock, minStock) => {
    if (stock <= 0) return { status: 'habis', color: 'destructive' };
    if (stock <= minStock) return { status: 'menipis', color: 'secondary' };
    return { status: 'aman', color: 'default' };
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const stockStatus = getStockStatus(product.stock, product.minStock);
    
    if (statusFilter === 'all') return matchesSearch;
    if (statusFilter === 'low') return matchesSearch && stockStatus.status !== 'aman';
    if (statusFilter === 'out') return matchesSearch && stockStatus.status === 'habis';
    
    return matchesSearch;
  });

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Manajemen Stok
              </CardTitle>
              <CardDescription>Kelola produk dan pantau stok barang</CardDescription>
            </div>
            <Button onClick={() => setShowAddDialog(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Tambah Produk
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Produk</SelectItem>
                <SelectItem value="low">Stok Menipis</SelectItem>
                <SelectItem value="out">Stok Habis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Table */}
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Produk</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead>Stok</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock, product.minStock);
                  return (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>Rp {product.price.toLocaleString()}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Badge variant={stockStatus.color}>
                          {stockStatus.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingProduct(product)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Tidak ada produk yang ditemukan
            </div>
          )}
        </CardContent>
      </Card>

      <AddProductDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAdd={handleAddProduct}
      />

      {editingProduct && (
        <EditProductDialog
          open={!!editingProduct}
          onOpenChange={() => setEditingProduct(null)}
          product={editingProduct}
          onEdit={handleEditProduct}
        />
      )}
    </div>
  );
};

export default ProductTable;
