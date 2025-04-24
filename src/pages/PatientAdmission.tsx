
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PatientAdmission() {
  const [searchQuery, setSearchQuery] = useState("");
  
  
  const initialPatients = [
    { id: "PA001", name: "Patient 1", age: 45, gender: "Male", admissionDate: "2023-04-18", ward: "General", room: "101", bed: "B001", diagnosis: "Cardiac Arrhythmia", doctor: "Dr. 1", status: "Admitted" },
    { id: "PA002", name: "Patient 2", age: 32, gender: "Female", admissionDate: "2023-04-19", ward: "General", room: "102", bed: "B004", diagnosis: "Appendicitis", doctor: "Dr. 2", status: "Admitted" },
    { id: "PA003", name: "Patient 3", age: 58, gender: "Male", admissionDate: "2023-04-15", ward: "ICU", room: "201", bed: "B005", diagnosis: "Stroke", doctor: "Dr. 3", status: "Critical" },
    { id: "PA004", name: "Patient 4", age: 7, gender: "Female", admissionDate: "2023-04-20", ward: "ICU", room: "201", bed: "B006", diagnosis: "Severe Pneumonia", doctor: "Dr. 4", status: "Stable" },
    { id: "PA005", name: "Patient 5", age: 63, gender: "Male", admissionDate: "2023-04-10", ward: "General", room: "103", bed: "B015", diagnosis: "Hip Fracture", doctor: "Dr. 5", status: "Recovering" },
    { id: "PA006", name: "Patient 6", age: 9, gender: "Female", admissionDate: "2023-04-17", ward: "Pediatric", room: "301", bed: "B008", diagnosis: "Acute Asthma", doctor: "Dr. 6", status: "Stable" },
    { id: "PA007", name: "Patient 7", age: 28, gender: "Female", admissionDate: "2023-04-19", ward: "Maternity", room: "401", bed: "B011", diagnosis: "Pregnancy Complications", doctor: "Dr. 7", status: "Stable" },
    { id: "PA008", name: "Patient 8", age: 36, gender: "Female", admissionDate: "2023-04-20", ward: "Maternity", room: "402", bed: "B013", diagnosis: "Postpartum Care", doctor: "Dr. 8", status: "Recovering" },
    { id: "PA009", name: "Patient 9", age: 42, gender: "Male", admissionDate: "2023-04-16", ward: "General", room: "104", bed: "B016", diagnosis: "Kidney Infection", doctor: "Dr. 9", status: "Recovering" },
    { id: "PA010", name: "Patient 10", age: 51, gender: "Male", admissionDate: "2023-04-14", ward: "General", room: "105", bed: "B017", diagnosis: "Diabetic Ketoacidosis", doctor: "Dr. 10", status: "Stable" },
  ];

  // Mock discharged patients
  const dischargedPatients = [
    { id: "PA011", name: "Emily Clark", age: 39, gender: "Female", admissionDate: "2023-04-10", dischargeDate: "2023-04-17", ward: "General", diagnosis: "Bronchitis", doctor: "Dr. Phillips" },
    { id: "PA012", name: "Daniel Lewis", age: 47, gender: "Male", admissionDate: "2023-04-12", dischargeDate: "2023-04-18", ward: "General", diagnosis: "Gallstones", doctor: "Dr. Martinez" },
    { id: "PA013", name: "Charlotte Lee", age: 28, gender: "Female", admissionDate: "2023-04-05", dischargeDate: "2023-04-15", ward: "Maternity", diagnosis: "Delivery", doctor: "Dr. Taylor" },
    { id: "PA014", name: "Alexander Hall", age: 72, gender: "Male", admissionDate: "2023-04-08", dischargeDate: "2023-04-19", ward: "General", diagnosis: "Pneumonia", doctor: "Dr. Johnson" },
    { id: "PA015", name: "Mia Scott", age: 6, gender: "Female", admissionDate: "2023-04-13", dischargeDate: "2023-04-16", ward: "Pediatric", diagnosis: "Tonsillitis", doctor: "Dr. Anderson" },
  ];
  
  const [patients, setPatients] = useState(initialPatients);
  
  const filteredCurrentPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.doctor.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredDischargedPatients = dischargedPatients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.doctor.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Admitted": return "bg-blue-100 text-blue-800";
      case "Stable": return "bg-green-100 text-green-800";
      case "Recovering": return "bg-teal-100 text-teal-800";
      case "Critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <MainLayout title="Patient Admission">
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
            <Plus className="mr-2 h-4 w-4" /> New Admission
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-base text-center">Total Patients</CardTitle>
            </CardHeader>
            <CardContent className="py-4 text-center">
              <div className="text-3xl font-bold">{patients.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-base text-center">Critical</CardTitle>
            </CardHeader>
            <CardContent className="py-4 text-center">
              <div className="text-3xl font-bold text-red-600">
                {patients.filter(p => p.status === "Critical").length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-base text-center">Stable</CardTitle>
            </CardHeader>
            <CardContent className="py-4 text-center">
              <div className="text-3xl font-bold text-green-600">
                {patients.filter(p => p.status === "Stable").length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-base text-center">Recovering</CardTitle>
            </CardHeader>
            <CardContent className="py-4 text-center">
              <div className="text-3xl font-bold text-teal-600">
                {patients.filter(p => p.status === "Recovering").length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="current">
          <TabsList className="grid w-full md:w-96 grid-cols-2">
            <TabsTrigger value="current">Current Patients</TabsTrigger>
            <TabsTrigger value="discharged">Discharged</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Patient Records
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Age/Gender</TableHead>
                        <TableHead>Admission Date</TableHead>
                        <TableHead>Ward/Room</TableHead>
                        <TableHead>Diagnosis</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCurrentPatients.map((patient) => (
                        <TableRow key={patient.id}>
                          <TableCell className="font-medium">{patient.id}</TableCell>
                          <TableCell>{patient.name}</TableCell>
                          <TableCell>{patient.age}/{patient.gender.charAt(0)}</TableCell>
                          <TableCell>{patient.admissionDate}</TableCell>
                          <TableCell>{patient.ward}/{patient.room}</TableCell>
                          <TableCell>{patient.diagnosis}</TableCell>
                          <TableCell>{patient.doctor}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(patient.status)}>
                              {patient.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">View</Button>
                              <Button variant="outline" size="sm">Update</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {filteredCurrentPatients.length === 0 && (
                  <div className="flex justify-center items-center h-32 border rounded-md bg-gray-50">
                    <p className="text-gray-500">No patients found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="discharged">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Discharged Patients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Age/Gender</TableHead>
                        <TableHead>Admission Date</TableHead>
                        <TableHead>Discharge Date</TableHead>
                        <TableHead>Ward</TableHead>
                        <TableHead>Diagnosis</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDischargedPatients.map((patient) => (
                        <TableRow key={patient.id}>
                          <TableCell className="font-medium">{patient.id}</TableCell>
                          <TableCell>{patient.name}</TableCell>
                          <TableCell>{patient.age}/{patient.gender.charAt(0)}</TableCell>
                          <TableCell>{patient.admissionDate}</TableCell>
                          <TableCell>{patient.dischargeDate}</TableCell>
                          <TableCell>{patient.ward}</TableCell>
                          <TableCell>{patient.diagnosis}</TableCell>
                          <TableCell>{patient.doctor}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {filteredDischargedPatients.length === 0 && (
                  <div className="flex justify-center items-center h-32 border rounded-md bg-gray-50">
                    <p className="text-gray-500">No patients found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
