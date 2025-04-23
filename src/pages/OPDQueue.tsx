
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function OPDQueue() {
  const [searchQuery, setSearchQuery] = useState("");
  
  
  const initialPatients = [
    { id: "P001", name: "Patient1", age: 45, department: "Cardiology", status: "In Progress", waitTime: "10 min", priority: "Normal" },
    { id: "P002", name: "Patient2", age: 32, department: "Neurology", status: "Waiting", waitTime: "25 min", priority: "Normal" },
    { id: "P003", name: "Patient3", age: 58, department: "Orthopedics", status: "Waiting", waitTime: "40 min", priority: "Normal" },
    { id: "P004", name: "Patient4", age: 7, department: "Pediatrics", status: "Next", waitTime: "5 min", priority: "Urgent" },
    { id: "P005", name: "Patient5", age: 63, department: "Ophthalmology", status: "Waiting", waitTime: "35 min", priority: "Normal" },
    { id: "P006", name: "Patient6", age: 28, department: "Dermatology", status: "Completed", waitTime: "0 min", priority: "Normal" },
    { id: "P007", name: "Patient7", age: 51, department: "ENT", status: "In Progress", waitTime: "15 min", priority: "Normal" },
    { id: "P008", name: "Patient8", age: 36, department: "Gynecology", status: "Waiting", waitTime: "45 min", priority: "Normal" },
    { id: "P009", name: "Patient9", age: 42, department: "Urology", status: "Waiting", waitTime: "50 min", priority: "Normal" },
    { id: "P010", name: "Patient10", age: 9, department: "Pediatrics", status: "Waiting", waitTime: "30 min", priority: "High" },
  ];
  
  const [patients, setPatients] = useState(initialPatients);
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.department.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-hospital-100 text-hospital-800";
      case "Next": return "bg-amber-100 text-amber-800";
      case "Waiting": return "bg-gray-100 text-gray-800";
      case "Completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent": return "bg-red-100 text-red-800";
      case "High": return "bg-amber-100 text-amber-800";
      case "Normal": return "bg-blue-100 text-blue-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <MainLayout title="OPD Queue Management">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search patients..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="bg-hospital-600 hover:bg-hospital-700">
            <Plus className="mr-2 h-4 w-4" /> Add Patient
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Current Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Wait Time</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.id}</TableCell>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.department}</TableCell>
                      <TableCell>{patient.waitTime}</TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(patient.priority)}>
                          {patient.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(patient.status)}>
                          {patient.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Update</Button>
                          {patient.status !== "Completed" && (
                            <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                              Complete
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredPatients.length === 0 && (
              <div className="flex justify-center items-center h-32 border rounded-md bg-gray-50">
                <p className="text-gray-500">No patients found</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Current Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{patients.filter(p => p.status !== "Completed").length}</div>
              <p className="text-sm text-gray-500">Total patients in queue</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Average Wait Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">28 min</div>
              <p className="text-sm text-gray-500">Current average wait</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Completed Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{patients.filter(p => p.status === "Completed").length}</div>
              <p className="text-sm text-gray-500">Patients seen today</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
