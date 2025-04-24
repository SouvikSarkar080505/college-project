
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Bed, Clock, FileText } from "lucide-react";

export default function Dashboard() {
  
  const metrics = [
    { 
      title: "OPD Queue", 
      value: "28", 
      change: "+4", 
      icon: Users, 
      color: "text-hospital-600",
      bgColor: "bg-hospital-50" 
    },
    { 
      title: "Available Beds", 
      value: "42", 
      change: "-3", 
      icon: Bed, 
      color: "text-green-600",
      bgColor: "bg-green-50" 
    },
    { 
      title: "Wait Time", 
      value: "24 min", 
      change: "-8 min", 
      icon: Clock, 
      color: "text-amber-600",
      bgColor: "bg-amber-50" 
    },
    { 
      title: "Low Stock Items", 
      value: "7", 
      change: "+2", 
      icon: FileText, 
      color: "text-red-600",
      bgColor: "bg-red-50" 
    },
  ];

  return (
    <MainLayout title="Dashboard">
      <div className="grid gap-6">
        {          }
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <div className={`p-2 rounded-full ${metric.bgColor}`}>
                  <metric.icon className={`w-4 h-4 ${metric.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className={`text-xs ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change} from yesterday
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {           }
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start space-x-4 pb-4 border-b last:border-0">
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                      {i % 3 === 0 ? <Users className="h-4 w-4" /> : 
                       i % 2 === 0 ? <Bed className="h-4 w-4" /> : 
                       <FileText className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {i % 3 === 0 ? "New patient admitted" : 
                         i % 2 === 0 ? "Bed allocation updated" : 
                         "Inventory restocked"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {`${30 - i * 5} minutes ago`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {          }
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded-sm">
                  <h4 className="font-medium text-sm">Low Stock Alert</h4>
                  <p className="text-xs text-gray-600">Surgical gloves running low</p>
                </div>
                <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-sm">
                  <h4 className="font-medium text-sm">Critical Patient</h4>
                  <p className="text-xs text-gray-600">ICU bed #3 needs attention</p>
                </div>
                <div className="p-3 bg-hospital-50 border-l-4 border-hospital-500 rounded-sm">
                  <h4 className="font-medium text-sm">OPD Update</h4>
                  <p className="text-xs text-gray-600">Queue exceeded estimated time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
