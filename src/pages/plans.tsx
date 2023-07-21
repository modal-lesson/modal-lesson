import dayjs, { type Dayjs } from "dayjs";
import { MainLayout } from "~/layout/MainLayout";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday);

interface WeekRange {
  start: Dayjs;
  end: Dayjs;
}

export default function Page() {
  const router = useRouter();
  const [currentWeek, setCurrentWeek] = useState<WeekRange>({
    start: dayjs().startOf("week"),
    end: dayjs().endOf("week"),
  });

  useEffect(() => {
    const { query } = router.query;

    // for TS to be happy.
    if (typeof query === "string" && query.includes("-to-")) {
      const [startOfWeek, endOfWeek] = query.split("-to-");
      setCurrentWeek({
        start: dayjs(startOfWeek),
        end: dayjs(endOfWeek),
      });
    }
  }, [router.query]);

  const handlePreviousWeek = async () => {
    const previousWeekStart = currentWeek.start
      .subtract(1, "week")
      .startOf("week");
    const previousWeekEnd = currentWeek.end.subtract(1, "week").endOf("week");

    // Format the start and end dates of the next week in ISO 8601 format
    const formattedStart = previousWeekStart.format("YYYY-MM-DD");
    const formattedEnd = previousWeekEnd.format("YYYY-MM-DD");

    await router.push(`/plans?query=${formattedStart}-to-${formattedEnd}`);
  };

  const handleNextWeek = async () => {
    const nextWeekStart = currentWeek.start.add(1, "week").startOf("week");
    const nextWeekEnd = currentWeek.end.add(1, "week").endOf("week");

    const formattedStart = nextWeekStart.format("YYYY-MM-DD");
    const formattedEnd = nextWeekEnd.format("YYYY-MM-DD");

    await router.push(`/plans?query=${formattedStart}-to-${formattedEnd}`);
  };

  const handleToday = async () => {
    const todayStartOfWeek = dayjs().startOf("week");
    const todayEndOfWeek = dayjs().endOf("week");

    const formattedStart = todayStartOfWeek.format("YYYY-MM-DD");
    const formattedEnd = todayEndOfWeek.format("YYYY-MM-DD");

    await router.push(`/plans?query=${formattedStart}-to-${formattedEnd}`);
  };

  return (
    <div>
      <div className="flex justify-center">
        <span className="flex">
          {" "}
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <button onClick={handlePreviousWeek}>
            <IconArrowLeft />
          </button>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <button onClick={handleToday} className="px-2">
            Today
          </button>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <button onClick={handleNextWeek}>
            <IconArrowRight />
          </button>
        </span>
      </div>
      <div className="flex justify-between gap-6 mt-5 px-4">
        {Array.from(Array(7).keys()).map((i) => {
          const currentDate = currentWeek.start.startOf("week").add(i, "day");
          const isToday = currentDate.isToday(); // Check if currentDate is today
          return (
            <div
              key={i}
              className={`flex ${isToday ? "border border-red-500" : ""}`}
            >
              <span className="text-sm font-bold">
                {currentDate.format("ddd MMM D")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
