import {
  fetchApiAvailability,
  fetchHistoric,
  fetchLastHumidity,
  fetchLastLuminosity,
  fetchLastTemperature,
} from "@/api";
import { HistoricTable } from "@/components/code";
import { columns } from "@/components/code/HistoricTable/Columns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  Droplets,
  LaptopMinimal,
  Lightbulb,
  RefreshCcw,
  Thermometer,
} from "lucide-react";
import { useState } from "react";

function Landing() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const apiAvailability = useQuery({
    queryKey: ["apiAvailable"],
    queryFn: fetchApiAvailability,
    refetchOnMount: false,
  });

  const lastHumidity = useQuery({
    queryKey: ["lastHumidity"],
    queryFn: fetchLastHumidity,
    refetchOnMount: false,
  });

  const lastTemperature = useQuery({
    queryKey: ["lastTemperature"],
    queryFn: fetchLastTemperature,
    refetchOnMount: false,
  });

  const lastLuminosity = useQuery({
    queryKey: ["lastLuminosity"],
    queryFn: fetchLastLuminosity,
    refetchOnMount: false,
  });

  const historic = useQuery({
    queryKey: ["historic", pagination.pageIndex],
    queryFn: () => fetchHistoric(pagination.pageIndex, pagination.pageSize),
    placeholderData: keepPreviousData,
  });

  return (
    <main className="px-4 xl:px-52 flex flex-col gap-8">
      <section className="grid grid-cols-1 xl:grid-cols-5 gap-y-8 xl:gap-x-8 xl:gap-y-0">
        <div className="w-full flex flex-col xl:grid xl:col-span-1 gap-y-8 lg:gap-x-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex justify-between items-center">
                Status da API
                <span
                  className="cursor-pointer"
                  onClick={() => apiAvailability.refetch()}
                >
                  <RefreshCcw size={20} />
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4">
              <div className="bg-secondary w-8 h-8 rounded-lg flex items-center justify-center relative">
                <span
                  className={cn(
                    "w-3 h-3 animate-ping absolute top-[-0.25rem] right-[-0.25rem] inline-flex rounded-full bg-red-400 opacity-75",
                    apiAvailability.isSuccess && "bg-green-400"
                  )}
                />
                <span
                  className={cn(
                    "w-3 h-3 absolute rounded-full top-[-0.25rem] right-[-0.25rem] bg-red-500",
                    apiAvailability.isSuccess && "bg-green-500"
                  )}
                />
                <LaptopMinimal className="h-4 w-4" />
              </div>
              <h1 className="font-bold text-xl">
                {apiAvailability.isSuccess ? "Online" : "Offline"}
              </h1>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex justify-between items-center">
                Última luminosidade
                <span
                  className="cursor-pointer"
                  onClick={() => lastHumidity.refetch()}
                >
                  <RefreshCcw size={20} />
                </span>
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex items-center gap-4 relative overflow-y-clip">
              <h1 className="text-2xl font-bold">
                {lastLuminosity.data?.last ?? "Dado inválido"}
              </h1>
              <Lightbulb
                color="#212EBA"
                className="size-[3.9rem] absolute right-10 bottom-[-0.25rem] overflow-y-clip"
              />
            </CardFooter>
          </Card>
        </div>
        <Card className="grid col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex justify-between items-center">
              Última temperatura
              <span
                className="cursor-pointer"
                onClick={() => lastTemperature.refetch()}
              >
                <RefreshCcw size={20} />
              </span>
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex items-center gap-4 relative overflow-y-clip">
            <h1 className="text-5xl font-bold">
              {lastTemperature.data?.last ?? "Dado inválido"}
            </h1>
            <Thermometer
              color="#212EBA"
              className="size-[5rem] xl:size-[8rem] absolute right-10 bottom-[-1rem] overflow-y-clip"
            />
          </CardFooter>
        </Card>
        <Card className="grid col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex justify-between items-center">
              Última humidade
              <span
                className="cursor-pointer"
                onClick={() => lastHumidity.refetch()}
              >
                <RefreshCcw size={20} />
              </span>
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex items-center gap-4 relative overflow-y-clip">
            <h1 className="text-5xl font-bold">{lastHumidity.data?.last ?? "Davo inválido"}</h1>
            <Droplets
              color="#212EBA"
              className="size-[5rem] xl:size-[8rem] absolute right-10 bottom-[-1rem] overflow-y-clip"
            />
          </CardFooter>
        </Card>
      </section>
      <section>
        <HistoricTable
          columns={columns}
          data={historic.data?.historic ?? []}
          count={historic.data?.count ?? 0}
          pagination={pagination}
          onPaginationChange={setPagination}
        />
      </section>
    </main>
  );
}

export { Landing };
