import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActivities, type Activity } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";

export function ActivityList() {
  const { data: activities, isLoading } = useActivities();

  if (isLoading) {
    return (
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
                <Skeleton className="h-4 w-[100px]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities?.map((activity: Activity) => (
            <div
              key={activity.id}
              className="flex items-center space-x-4 rounded-lg border p-3"
            >
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{activity.userName}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
              </div>
              <div className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(activity.time), { addSuffix: true })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}