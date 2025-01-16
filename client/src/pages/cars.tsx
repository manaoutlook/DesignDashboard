import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { useCars } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CarsPage() {
  const { data: cars, isLoading } = useCars();

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1">
        <div className="grid lg:grid-cols-6">
          <DashboardSidebar />
          <div className="col-span-5 lg:col-span-5 lg:border-l">
            <div className="h-full px-4 py-6 lg:px-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Cars Inventory</h2>
                  <p className="text-muted-foreground">
                    Manage your vehicle inventory across all locations
                  </p>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Car
                </Button>
              </div>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>All Cars</CardTitle>
                  <CardDescription>
                    A list of all vehicles in your inventory
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      {Array(5).fill(0).map((_, i) => (
                        <div key={i} className="flex space-x-4">
                          <Skeleton className="h-4 w-[100px]" />
                          <Skeleton className="h-4 w-[200px]" />
                          <Skeleton className="h-4 w-[100px]" />
                          <Skeleton className="h-4 w-[100px]" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-sky-100">
                          <TableHead className="text-sky-900 font-semibold">VIN</TableHead>
                          <TableHead className="text-sky-900 font-semibold">Make</TableHead>
                          <TableHead className="text-sky-900 font-semibold">Model</TableHead>
                          <TableHead className="text-sky-900 font-semibold">Year</TableHead>
                          <TableHead className="text-sky-900 font-semibold">Price</TableHead>
                          <TableHead className="text-sky-900 font-semibold">Quantity</TableHead>
                          <TableHead className="text-sky-900 font-semibold">Location</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cars?.map((car) => (
                          <TableRow 
                            key={car.id}
                            className="even:bg-gray-50"
                          >
                            <TableCell className="font-medium">{car.vinNumber}</TableCell>
                            <TableCell>{car.make}</TableCell>
                            <TableCell>{car.model}</TableCell>
                            <TableCell>{car.year}</TableCell>
                            <TableCell>{car.price}</TableCell>
                            <TableCell>{car.quantity}</TableCell>
                            <TableCell>{car.location?.name}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
