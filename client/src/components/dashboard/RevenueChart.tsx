import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useRevenue } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";
import { th } from "date-fns/locale";

export function RevenueChart() {
  const { data: revenueData, isLoading } = useRevenue();
  const { t, i18n } = useTranslation();

  if (isLoading) {
    return (
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>{t('dashboard.charts.revenueOverTime')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <Skeleton className="h-[250px] w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>{t('dashboard.charts.revenueOverTime')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <XAxis 
                dataKey="month" 
                tickFormatter={(value) => {
                  // Format month names based on current language
                  const date = new Date(2024, ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(value), 1);
                  return i18n.language === 'th' 
                    ? date.toLocaleString('th-TH', { month: 'short' })
                    : value;
                }}
              />
              <YAxis 
                tickFormatter={(value) => {
                  // Format currency values based on current language
                  return new Intl.NumberFormat(i18n.language === 'th' ? 'th-TH' : 'en-US', {
                    style: 'currency',
                    currency: 'THB',
                    maximumFractionDigits: 0
                  }).format(value);
                }}
              />
              <Tooltip 
                formatter={(value: number) => {
                  return [
                    new Intl.NumberFormat(i18n.language === 'th' ? 'th-TH' : 'en-US', {
                      style: 'currency',
                      currency: 'THB',
                      maximumFractionDigits: 0
                    }).format(value),
                    t('dashboard.charts.revenueOverTime')
                  ];
                }}
                labelFormatter={(label) => {
                  const date = new Date(2024, ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(label), 1);
                  return i18n.language === 'th' 
                    ? date.toLocaleString('th-TH', { month: 'long', year: 'numeric' })
                    : date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}