"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChartData {
  month: string;
  count: number;
}

export default function UsersChart() {
  const { data: session } = useSession();
  const type = session?.user?.type;

  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!type) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const endpoint =
          type === "admin"
            ? "/api/dashboard/admin/users-monthly"
            : "/api/dashboard/company/candidates-monthly";

        const res = await fetch(endpoint);
        const result: ChartData[] = await res.json();

        const formattedLabels = result.map((item) =>
          new Date(item.month).toLocaleDateString("pt-PT", {
            month: "short",
          })
        );

        setLabels(formattedLabels);
        setData(result.map((item) => item.count));
      } catch (err) {
        console.error("Erro ao carregar gráfico:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  const options: ApexOptions = {
    colors: ["#d0021b"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: labels,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: { title: { text: undefined } },
    grid: {
      yaxis: {
        lines: { show: true },
      },
    },
    fill: { opacity: 1 },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (val: number) => `${val}`,
      },
    },
  };

  const series = [
    {
      name:
        type === "admin" ? "Utilizadores registados" : "Candidatos recebidos",
      data,
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          {type === "admin"
            ? "Utilizadores por mês"
            : "Candidatos por mês"}
        </h3>
      </div>

      {loading ? (
        <div className="p-8 text-center text-sm text-gray-500 dark:text-gray-400">
          A carregar dados do gráfico...
        </div>
      ) : (
        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
            <ReactApexChart
              options={options}
              series={series}
              type="bar"
              height={180}
            />
          </div>
        </div>
      )}
    </div>
  );
}
