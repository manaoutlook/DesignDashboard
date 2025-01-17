import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { useLocations } from "@/lib/api";
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
import { useTranslation } from "react-i18next";

export default function LocationsPage() {
  const { data: locations, isLoading } = useLocations();
  const { t } = useTranslation();

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
                  <h2 className="text-2xl font-bold tracking-tight">{t('locations.title')}</h2>
                  <p className="text-muted-foreground">
                    {t('locations.description')}
                  </p>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  {t('locations.addLocation')}
                </Button>
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>{t('locations.title')}</CardTitle>
                  <CardDescription>
                    {t('locations.listDescription')}
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
                          <TableHead className="text-sky-900 font-semibold">{t('common.name')}</TableHead>
                          <TableHead className="text-sky-900 font-semibold">{t('locations.types.type')}</TableHead>
                          <TableHead className="text-sky-900 font-semibold">{t('locations.address')}</TableHead>
                          <TableHead className="text-sky-900 font-semibold">{t('locations.area')}</TableHead>
                          <TableHead className="text-sky-900 font-semibold">{t('locations.city')}</TableHead>
                          <TableHead className="text-sky-900 font-semibold">{t('locations.region')}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {locations?.map((location) => (
                          <TableRow 
                            key={location.id}
                            className="even:bg-gray-50"
                          >
                            <TableCell className="font-medium">{location.name}</TableCell>
                            <TableCell>{t(`locations.types.${location.locationType.toLowerCase()}`)}</TableCell>
                            <TableCell>{location.address}</TableCell>
                            <TableCell>{location.area}</TableCell>
                            <TableCell>{location.city}</TableCell>
                            <TableCell>{location.region}</TableCell>
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