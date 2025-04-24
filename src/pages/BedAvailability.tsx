
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BedAvailability() {
  const [wardFilter, setWardFilter] = useState("all");
  
  // Mock bed data
  const initialBeds = [
    { id: "B001", ward: "General", room: "101", status: "Occupied", patient: "Paitent 1", admissionDate: "2023-04-18", expectedDischarge: "2023-04-25" },
    { id: "B002", ward: "General", room: "101", status: "Available", patient: "", admissionDate: "", expectedDischarge: "" },
    { id: "B003", ward: "General", room: "102", status: "Maintenance", patient: "", admissionDate: "", expectedDischarge: "" },
    { id: "B004", ward: "General", room: "102", status: "Occupied", patient: "paitent 2", admissionDate: "2023-04-19", expectedDischarge: "2023-04-23" },
    { id: "B005", ward: "ICU", room: "201", status: "Occupied", patient: "Paitent 3", admissionDate: "2023-04-15", expectedDischarge: "2023-04-30" },
    { id: "B006", ward: "ICU", room: "201", status: "Occupied", patient: "Paitent 4", admissionDate: "2023-04-20", expectedDischarge: "2023-04-27" },
    { id: "B007", ward: "ICU", room: "202", status: "Available", patient: "", admissionDate: "", expectedDischarge: "" },
    { id: "B008", ward: "Pediatric", room: "301", status: "Occupied", patient: "Paitent 5", admissionDate: "2023-04-17", expectedDischarge: "2023-04-24" },
    { id: "B009", ward: "Pediatric", room: "301", status: "Available", patient: "", admissionDate: "", expectedDischarge: "" },
    { id: "B010", ward: "Pediatric", room: "302", status: "Available", patient: "", admissionDate: "", expectedDischarge: "" },
    { id: "B011", ward: "Maternity", room: "401", status: "Occupied", patient: "Paitent 6", admissionDate: "2023-04-19", expectedDischarge: "2023-04-26" },
    { id: "B012", ward: "Maternity", room: "401", status: "Available", patient: "", admissionDate: "", expectedDischarge: "" },
    { id: "B013", ward: "Maternity", room: "402", status: "Occupied", patient: "Paitent 7", admissionDate: "2023-04-20", expectedDischarge: "2023-04-22" },
    { id: "B014", ward: "Maternity", room: "402", status: "Maintenance", patient: "", admissionDate: "", expectedDischarge: "" },
  ];
  
  const [beds, setBeds] = useState(initialBeds);
  
  const filteredBeds = wardFilter === "all" 
    ? beds 
    : beds.filter(bed => bed.ward.toLowerCase() === wardFilter.toLowerCase());
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-green-100 text-green-800";
      case "Occupied": return "bg-red-100 text-red-800";
      case "Maintenance": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Calculate statistics
  const stats = {
    total: beds.length,
    available: beds.filter(bed => bed.status === "Available").length,
    occupied: beds.filter(bed => bed.status === "Occupied").length,
    maintenance: beds.filter(bed => bed.status === "Maintenance").length,
  };
  
  // Ward occupancy calculation
  const wardStats = [
    { name: "General", total: 4, occupied: 2 },
    { name: "ICU", total: 3, occupied: 2 },
    { name: "Pediatric", total: 3, occupied: 1 },
    { name: "Maternity", total: 4, occupied: 2 },
  ];

  return (
    <MainLayout title="Bed Availability">
      <div className="space-y-6">
        {/* Bed Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-gray-500">Total Beds</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-gray-500">Available</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.available}</div>
              <p className="text-sm text-gray-500">{Math.round((stats.available / stats.total) * 100)}% available</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-gray-500">Occupied</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{stats.occupied}</div>
              <p className="text-sm text-gray-500">{Math.round((stats.occupied / stats.total) * 100)}% occupied</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-gray-500">Under Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">{stats.maintenance}</div>
              <p className="text-sm text-gray-500">{Math.round((stats.maintenance / stats.total) * 100)}% unavailable</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Ward Occupancy */}
        <Card>
          <CardHeader>
            <CardTitle>Ward Occupancy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wardStats.map((ward) => (
                <div key={ward.name} className="flex flex-col space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{ward.name}</span>
                    <span>{ward.occupied}/{ward.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-hospital-600 h-2.5 rounded-full" 
                      style={{ width: `${(ward.occupied / ward.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Bed Listing */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Bed Status</CardTitle>
            <Select value={wardFilter} onValueChange={setWardFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by ward" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Wards</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="icu">ICU</SelectItem>
                <SelectItem value="pediatric">Pediatric</SelectItem>
                <SelectItem value="maternity">Maternity</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bed ID</TableHead>
                    <TableHead>Ward</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Admission Date</TableHead>
                    <TableHead>Expected Discharge</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBeds.map((bed) => (
                    <TableRow key={bed.id}>
                      <TableCell className="font-medium">{bed.id}</TableCell>
                      <TableCell>{bed.ward}</TableCell>
                      <TableCell>{bed.room}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(bed.status)}>
                          {bed.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{bed.patient || "—"}</TableCell>
                      <TableCell>{bed.admissionDate || "—"}</TableCell>
                      <TableCell>{bed.expectedDischarge || "—"}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            {bed.status === "Available" ? "Assign" : 
                             bed.status === "Occupied" ? "Discharge" : "Update"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
