import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activities = [
  {
    user: "John Smith",
    action: "created a new project",
    time: "2 hours ago",
  },
  {
    user: "Sarah Johnson",
    action: "uploaded new files",
    time: "4 hours ago",
  },
  {
    user: "Mike Wilson",
    action: "completed task",
    time: "5 hours ago",
  },
];

export function ActivityList() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, i) => (
            <div
              key={i}
              className="flex items-center space-x-4 rounded-lg border p-3"
            >
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{activity.user}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
              </div>
              <div className="text-sm text-muted-foreground">
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
