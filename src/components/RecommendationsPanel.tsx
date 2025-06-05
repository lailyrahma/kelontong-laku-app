
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp, Package, MessageCircle, ShoppingCart } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const RecommendationsPanel = () => {
  const restockRecommendations = [
    {
      product: 'Gula Pasir 1kg',
      currentStock: 3,
      recommendedOrder: 20,
      reason: 'Stok menipis, penjualan rata-rata 5/hari',
      priority: 'high',
      estimatedDaysLeft: 1,
    },
    {
      product: 'Beras Premium 5kg',
      currentStock: 2,
      recommendedOrder: 15,
      reason: 'Stok kritis, produk populer',
      priority: 'critical',
      estimatedDaysLeft: 0,
    },
    {
      product: 'Sabun Mandi Lifebuoy',
      currentStock: 1,
      recommendedOrder: 25,
      reason: 'Stok hampir habis',
      priority: 'high',
      estimatedDaysLeft: 0,
    },
    {
      product: 'Kopi Kapal Api Sachet',
      currentStock: 8,
      recommendedOrder: 30,
      reason: 'Penjualan tinggi di pagi hari',
      priority: 'medium',
      estimatedDaysLeft: 2,
    },
  ];

  const bundleRecommendations = [
    {
      id: 1,
      title: 'Paket Masak Hemat',
      products: ['Minyak Goreng 1L', 'Mie Instan', 'Kecap Manis'],
      discount: '5%',
      reason: 'Sering dibeli bersamaan',
      expectedIncrease: '15%',
    },
    {
      id: 2,
      title: 'Paket Sarapan',
      products: ['Roti Tawar', 'Susu Kental Manis', 'Kopi Sachet'],
      discount: '3%',
      reason: 'Populer di pagi hari',
      expectedIncrease: '12%',
    },
    {
      id: 3,
      title: 'Paket Kebersihan',
      products: ['Sabun Mandi', 'Deterjen', 'Pasta Gigi'],
      discount: '8%',
      reason: 'Kebutuhan bulanan',
      expectedIncrease: '20%',
    },
  ];

  const handleSendWhatsApp = (type, item) => {
    let message = '';
    
    if (type === 'restock') {
      message = `Rekomendasi Restock:\n\n📦 ${item.product}\n🔢 Stok sekarang: ${item.currentStock}\n✅ Disarankan pesan: ${item.recommendedOrder}\n📈 Alasan: ${item.reason}\n⏰ Estimasi habis: ${item.estimatedDaysLeft} hari\n\nSegera restock untuk menghindari kehabisan stok!`;
    } else if (type === 'bundle') {
      message = `Rekomendasi Paket Bundling:\n\n🎁 ${item.title}\n📦 Produk: ${item.products.join(', ')}\n💰 Diskon: ${item.discount}\n📈 Potensi peningkatan penjualan: ${item.expectedIncrease}\n\nCoba tawarkan paket ini ke pelanggan!`;
    }

    // In real app, this would open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "WhatsApp Dibuka",
      description: "Pesan rekomendasi telah disiapkan di WhatsApp",
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'secondary';
      case 'medium': return 'default';
      default: return 'default';
    }
  };

  const getPriorityIcon = (priority) => {
    return priority === 'critical' ? '🚨' : priority === 'high' ? '⚠️' : '📋';
  };

  return (
    <div className="space-y-6">
      {/* Restock Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-orange-600" />
            Rekomendasi Restock
          </CardTitle>
          <CardDescription>
            Saran produk yang perlu segera ditambah stoknya
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {restockRecommendations.map((item, index) => (
            <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-orange-50 to-yellow-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{getPriorityIcon(item.priority)}</span>
                    <h3 className="font-semibold">{item.product}</h3>
                    <Badge variant={getPriorityColor(item.priority)}>
                      {item.priority}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>🔢 Stok sekarang: <span className="font-medium">{item.currentStock}</span></div>
                    <div>✅ Disarankan pesan: <span className="font-medium text-green-600">{item.recommendedOrder}</span></div>
                    <div>📝 Alasan: {item.reason}</div>
                    <div>⏰ Estimasi habis: <span className="font-medium text-red-600">{item.estimatedDaysLeft} hari</span></div>
                  </div>
                </div>
                
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleSendWhatsApp('restock', item)}
                  className="ml-4"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Kirim WA
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Bundle Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-blue-600" />
            Rekomendasi Paket Bundling
          </CardTitle>
          <CardDescription>
            Saran kombinasi produk untuk meningkatkan penjualan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {bundleRecommendations.map((bundle) => (
            <div key={bundle.id} className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-green-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🎁</span>
                    <h3 className="font-semibold">{bundle.title}</h3>
                    <Badge variant="default" className="bg-blue-100 text-blue-700">
                      Diskon {bundle.discount}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>📦 Produk: <span className="font-medium">{bundle.products.join(', ')}</span></div>
                    <div>📝 Alasan: {bundle.reason}</div>
                    <div>📈 Potensi peningkatan: <span className="font-medium text-green-600">{bundle.expectedIncrease}</span></div>
                  </div>
                </div>
                
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleSendWhatsApp('bundle', bundle)}
                  className="ml-4"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Kirim WA
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Insight Penjualan
          </CardTitle>
          <CardDescription>
            Analisis dan tips berdasarkan data penjualan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">🔥 Produk Terlaris Minggu Ini</h4>
            <p className="text-sm text-green-700">
              Minyak Goreng Bimoli 1L menjadi yang terlaris dengan 45 penjualan. 
              Pastikan stok selalu tersedia!
            </p>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">⏰ Waktu Penjualan Terbaik</h4>
            <p className="text-sm text-blue-700">
              Penjualan tertinggi terjadi antara jam 17:00-19:00. 
              Siapkan stok produk populer di jam tersebut.
            </p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-800 mb-2">💡 Tips Meningkatkan Penjualan</h4>
            <p className="text-sm text-purple-700">
              Letakkan produk impulsif (permen, snack) di dekat kasir untuk meningkatkan penjualan spontan.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecommendationsPanel;
