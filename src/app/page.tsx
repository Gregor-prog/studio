import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/stat-card';
import { WaterUsageChart } from '@/components/dashboard/water-usage-chart';
import { SystemStatusCard } from '@/components/dashboard/system-status-card';
import {
  currentSensorData,
  recentActivities,
  systemHealth,
} from '@/lib/data';
import { Droplets, Waves, Gauge, Leaf, Activity } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Water Level"
          value={`${currentSensorData.waterLevel}%`}
          icon={Droplets}
          description="Reservoir level"
        />
        <StatCard
          title="Flow Rate"
          value={`${currentSensorData.flowRate} L/min`}
          icon={Waves}
          description="Cooling system intake"
        />
        <StatCard
          title="Consumption"
          value={`${currentSensorData.consumption} m³`}
          icon={Gauge}
          description="24-hour usage"
        />
        <StatCard
          title="WUE"
          value={`${currentSensorData.wue} L/kWh`}
          icon={Leaf}
          description="Water Usage Effectiveness"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Historical Water Consumption</CardTitle>
            <CardDescription>Last 7 Days</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <WaterUsageChart />
          </CardContent>
        </Card>
        <div className="col-span-1 space-y-4 lg:col-span-3">
          <SystemStatusCard systemHealth={systemHealth} />
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.timestamp}
                    </p>
                    {index < recentActivities.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
