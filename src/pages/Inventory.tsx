
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Mock inventory data
  const initialItems = [
    { id: "INV001", name: "Surgical Gloves (Box)", category: "Medical Supplies", quantity: 12, minQuantity: 20, lastRestocked: "2023-04-10", expiryDate: "2024-04-10", location: "Storage A", status: "Low Stock" },
    { id: "INV002", name: "N95 Masks (Box)", category: "Medical Supplies", quantity: 30, minQuantity: 15, lastRestocked: "2023-04-15", expiryDate: "2025-01-20", location: "Storage A", status: "In Stock" },
    { id: "INV003", name: "Syringes 5ml (Box)", category: "Medical Supplies", quantity: 45, minQuantity: 25, lastRestocked: "2023-04-12", expiryDate: "2024-06-15", location: "Storage B", status: "In Stock" },
    { id: "INV004", name: "Paracetamol 500mg", category: "Medications", quantity: 8, minQuantity: 20, lastRestocked: "2023-04-05", expiryDate: "2024-03-10", location: "Pharmacy", status: "Low Stock" },
    { id: "INV005", name: "Amoxicillin 250mg", category: "Medications", quantity: 32, minQuantity: 15, lastRestocked: "2023-04-18", expiryDate: "2024-08-22", location: "Pharmacy", status: "In Stock" },
    { id: "INV006", name: "Ibuprofen 200mg", category: "Medications", quantity: 17, minQuantity: 15, lastRestocked: "2023-04-14", expiryDate: "2024-05-30", location: "Pharmacy", status: "In Stock" },
    { id: "INV007", name: "IV Solution 1L", category: "Medical Supplies", quantity: 25, minQuantity: 20, lastRestocked: "2023-04-16", expiryDate: "2024-10-15", location: "Storage C", status: "In Stock" },
    { id: "INV008", name: "Bandages (Roll)", category: "Medical Supplies", quantity: 9, minQuantity: 15, lastRestocked: "2023-04-08", expiryDate: "2025-04-08", location: "Storage A", status: "Low Stock" },
    { id: "INV009", name: "Insulin", category: "Medications", quantity: 14, minQuantity: 10, lastRestocked: "2023-04-17", expiryDate: "2023-10-25", location: "Pharmacy", status: "In Stock" },
    { id: "INV010", name: "Surgical Blades (Box)", category: "Medical Supplies", quantity: 7, minQuantity: 10, lastRestocked: "2023-04-09", expiryDate: "2026-04-09", location: "Storage B", status: "Low Stock" },
    { id: "INV011", name: "Gauze Pads (Box)", category: "Medical Supplies", quantity: 22, minQuantity: 15, lastRestocked: "2023-04-13", expiryDate: "2025-05-20", location: "Storage A", status: "In Stock" },
    { id: "INV012", name: "Antiseptic Solution", category: "Medical Supplies", quantity: 18, minQuantity: 10, lastRestocked: "2023-04-11", expiryDate: "2024-07-11", location: "Storage C", status: "In Stock" },
    { id: "INV013", name: "Digital Thermometer", category: "Equipment", quantity: 5, minQuantity: 10, lastRestocked: "2023-03-28", expiryDate: "N/A", location: "Storage D", status: "Low Stock" },
    { id: "INV014", name: "Blood Pressure Monitor", category: "Equipment", quantity: 12, minQuantity: 8, lastRestocked: "2023-04-02", expiryDate: "N/A", location: "Storage D", status: "In Stock" },
    { id: "INV015", name: "Stethoscope", category: "Equipment", quantity: 9, minQuantity: 5, lastRestocked: "2023-03-25", expiryDate: "N/A", location: "Storage D", status: "In Stock" },
  ];
  
  // Mock order history
  const orderHistory = [
    { id: "ORD001", items: "Surgical Gloves (Box), N95 Masks (Box)", quantity: "20, 15", date: "2023-04-15", status: "Delivered", supplier: "MedEquip Co." },
    { id: "ORD002", items: "Paracetamol 500mg, Ibuprofen 200mg", quantity: "50, 30", date: "2023-04-14", status: "Delivered", supplier: "PharmaCare" },
    { id: "ORD003", items: "IV Solution 1L", quantity: "25", date: "2023-04-16", status: "Delivered", supplier: "MedEquip Co." },
    { id: "ORD004", items: "Insulin", quantity: "20", date: "2023-04-17", status: "Delivered", supplier: "PharmaCare" },
    { id: "ORD005", items: "Digital Thermometer", quantity: "10", date: "2023-04-20", status: "Pending", supplier: "MedTech Solutions" },
  ];
  
  const [items, setItems] = useState(initialItems);
  
  const filteredItems = items.filter(item => 
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
     item.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (categoryFilter === "all" || item.category.toLowerCase() === categoryFilter.toLowerCase())
  );
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock": return "bg-green-100 text-green-800";
      case "Low Stock": return "bg-amber-100 text-amber-800";
      case "Out of Stock": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-800";
      case "In Transit": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Calculate inventory statistics
  const stats = {
    total: items.length,
    inStock: items.filter(item => item.status === "In Stock").length,
    lowStock: items.filter(item => item.status === "Low Stock").length,
    outOfStock: items.filter(item => item.status === "Out of Stock").length,
  };
  
  // Category distribution
  const categories = [...new Set(items.map(item => item.category))];
  const categoryStats = categories.map(category => ({
    name: category,
    count: items.filter(item => item.category === category).length,
    lowStock: items.filter(item => item.category === category && item.status === "Low Stock").length,
  }));

  return (
    <MainLayout title="Inventory Management">
      <div className="space-y-6">
        {/* Inventory Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-gray-500">Total Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-gray-500">In Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.inStock}</div>
              <p className="text-sm text-gray-500">{Math.round((stats.inStock / stats.total) * 100)}% of inventory</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-gray-500">Low Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">{stats.lowStock}</div>
              <p className="text-sm text-gray-500">{Math.round((stats.lowStock / stats.total) * 100)}% of inventory</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-gray-500">Out of Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{stats.outOfStock}</div>
              <p className="text-sm text-gray-500">{Math.round((stats.outOfStock / stats.total) * 100)}% of inventory</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Category Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryStats.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{category.name}</span>
                    <span>{category.count} items</span>
                  </div>
                  <Progress value={((category.count - category.lowStock) / category.count) * 100} className="h-2" />
                  <p className="text-xs text-amber-600">
                    {category.lowStock > 0 ? `${category.lowStock} items low in stock` : "All items in stock"}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="inventory">
          <TabsList className="grid w-full md:w-96 grid-cols-2">
            <TabsTrigger value="inventory">Inventory Items</TabsTrigger>
            <TabsTrigger value="orders">Order History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="inventory">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Inventory Items
                </CardTitle>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search items..."
                      className="pl-8 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button className="bg-hospital-600 hover:bg-hospital-700 whitespace-nowrap">
                    <Plus className="mr-2 h-4 w-4" /> Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Item Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Min. Quantity</TableHead>
                        <TableHead>Last Restocked</TableHead>
                        <TableHead>Expiry Date</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.id}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.minQuantity}</TableCell>
                          <TableCell>{item.lastRestocked}</TableCell>
                          <TableCell>{item.expiryDate}</TableCell>
                          <TableCell>{item.location}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Update</Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-hospital-600 border-hospital-600 hover:bg-hospital-50"
                              >
                                Restock
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {filteredItems.length === 0 && (
                  <div className="flex justify-center items-center h-32 border rounded-md bg-gray-50">
                    <p className="text-gray-500">No items found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderHistory.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.items}</TableCell>
                          <TableCell>{order.quantity}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.supplier}</TableCell>
                          <TableCell>
                            <Badge className={getOrderStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">Details</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
