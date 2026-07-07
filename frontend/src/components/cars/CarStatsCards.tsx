import { Car, CheckCircle, Wrench, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CarStats {
  total: number;
  active: number;
  maintenance: number;
  inTransit: number;
}

interface CarStatsCardsProps {
  stats: CarStats;
}

export function CarStatsCards({ stats }: CarStatsCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Car className="size-6 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Cars</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
            <CheckCircle className="size-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="text-2xl font-bold">{stats.active}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-rose-50">
            <Wrench className="size-6 text-rose-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Maintenance</p>
            <p className="text-2xl font-bold">{stats.maintenance}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-amber-50">
            <Truck className="size-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">In Transit</p>
            <p className="text-2xl font-bold">{stats.inTransit}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
