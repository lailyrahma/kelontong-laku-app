
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, CheckCircle, AlertCircle, Info } from 'lucide-react';

const WhatsAppGuide = () => {
  const sampleMessages = [
    {
      command: 'jual minyak goreng 2',
      description: 'Mencatat penjualan 2 botol minyak goreng',
      response: '✅ Penjualan dicatat:\n• Minyak Goreng Bimoli 1L: 2x\n• Total: Rp 36.000\n• Stok tersisa: 23',
      category: 'penjualan',
    },
    {
      command: 'jual rokok 1',
      description: 'Mencatat penjualan 1 bungkus rokok',
      response: '✅ Penjualan dicatat:\n• Rokok Gudang Garam: 1x\n• Total: Rp 25.000\n• Stok tersisa: 29',
      category: 'penjualan',
    },
    {
      command: 'stok gula',
      description: 'Cek stok gula pasir',
      response: '📦 Stok Gula Pasir 1kg:\n• Tersisa: 3\n• Minimum: 10\n⚠️ Stok menipis, segera restock!',
      category: 'stok',
    },
    {
      command: 'laporan hari ini',
      description: 'Melihat laporan penjualan hari ini',
      response: '📊 Laporan Hari Ini:\n• Total Penjualan: Rp 380.000\n• Produk Terjual: 15 item\n• Produk Terlaris: Minyak Goreng (5x)',
      category: 'laporan',
    },
    {
      command: 'tambah stok mie 20',
      description: 'Menambah stok mie instan sebanyak 20',
      response: '✅ Stok ditambahkan:\n• Mie Instan Indomie: +20\n• Stok sekarang: 65\n• Status: Aman',
      category: 'stok',
    },
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'penjualan': return 'bg-green-100 text-green-700';
      case 'stok': return 'bg-blue-100 text-blue-700';
      case 'laporan': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'penjualan': return '💰';
      case 'stok': return '📦';
      case 'laporan': return '📊';
      default: return '💬';
    }
  };

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-green-600" />
            Panduan WhatsApp Integration
          </CardTitle>
          <CardDescription>
            Kelola toko Anda langsung dari WhatsApp dengan perintah sederhana
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl mb-2">📱</div>
              <h3 className="font-semibold">Mudah Digunakan</h3>
              <p className="text-sm text-gray-600">Cukup kirim pesan WhatsApp dengan format yang sudah ditentukan</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold">Real-time Update</h3>
              <p className="text-sm text-gray-600">Stok dan penjualan langsung terupdate otomatis</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold">Laporan Instan</h3>
              <p className="text-sm text-gray-600">Dapatkan laporan penjualan kapan saja</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Command Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            Contoh Perintah WhatsApp
          </CardTitle>
          <CardDescription>
            Kirim pesan dengan format berikut ke nomor WhatsApp toko
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {sampleMessages.map((message, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">{getCategoryIcon(message.category)}</span>
                <Badge className={getCategoryColor(message.category)}>
                  {message.category}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Kirim pesan:</div>
                  <div className="p-3 bg-green-50 rounded-lg font-mono text-sm border border-green-200">
                    {message.command}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-1">Deskripsi:</div>
                  <p className="text-sm">{message.description}</p>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-1">Balasan sistem:</div>
                  <div className="p-3 bg-gray-50 rounded-lg text-sm border border-gray-200 whitespace-pre-line">
                    {message.response}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Setup Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5 text-purple-600" />
            Cara Setup WhatsApp Bot
          </CardTitle>
          <CardDescription>
            Langkah-langkah untuk mengaktifkan fitur WhatsApp integration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold text-sm">1</div>
              <div className="flex-1">
                <h4 className="font-semibold">Daftar WhatsApp Business API</h4>
                <p className="text-sm text-gray-600">Gunakan layanan seperti WhatsApp Business API atau penyedia third-party</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold text-sm">2</div>
              <div className="flex-1">
                <h4 className="font-semibold">Hubungkan dengan Dashboard</h4>
                <p className="text-sm text-gray-600">Integrasikan API WhatsApp dengan sistem dashboard warung</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold text-sm">3</div>
              <div className="flex-1">
                <h4 className="font-semibold">Setting Webhook</h4>
                <p className="text-sm text-gray-600">Atur webhook untuk menerima dan memproses pesan masuk</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold text-sm">4</div>
              <div className="flex-1">
                <h4 className="font-semibold">Test dan Mulai Gunakan</h4>
                <p className="text-sm text-gray-600">Coba kirim perintah test dan mulai kelola toko via WhatsApp</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <AlertCircle className="w-5 h-5" />
            Tips Penggunaan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-yellow-800">
            <div className="font-medium mb-2">💡 Tips untuk penggunaan optimal:</div>
            <ul className="space-y-1 list-disc list-inside">
              <li>Gunakan nama produk yang konsisten (sesuai dengan database)</li>
              <li>Selalu cek stok sebelum mencatat penjualan besar</li>
              <li>Minta laporan harian di akhir hari untuk monitoring</li>
              <li>Gunakan fitur tambah stok saat barang datang</li>
              <li>Simpan nomor WhatsApp bot di kontak untuk akses cepat</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppGuide;
