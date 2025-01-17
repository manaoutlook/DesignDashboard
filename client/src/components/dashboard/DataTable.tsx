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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

interface DataTableProps {
  data: Array<{
    id: number;
    name: string;
    email: string;
    status: "active" | "inactive";
    lastActive: string;
  }>;
  isLoading?: boolean;
}

export function DataTable({ data, isLoading }: DataTableProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="bg-[#1a365d] text-white">
          <CardTitle>{t('common.users')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex space-x-4">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="bg-[#1a365d] text-white">
        <CardTitle>{t('common.users')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-sky-100">
              <TableHead className="text-sky-900 font-semibold">{t('common.name')}</TableHead>
              <TableHead className="text-sky-900 font-semibold">{t('common.email')}</TableHead>
              <TableHead className="text-sky-900 font-semibold">{t('common.status')}</TableHead>
              <TableHead className="text-sky-900 font-semibold">{t('common.lastActive')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow 
                key={row.id}
                className="even:bg-gray-50"
              >
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      row.status === "active"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-50 text-gray-600"
                    }`}
                  >
                    {t(`common.status_${row.status}`)}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {row.lastActive}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}