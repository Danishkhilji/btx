import React, { memo, useEffect } from "react";
import Graph from "@/components/Shared/Graph";
import ProgressCard from "@/components/Shared/Cards/Progress";
import Container from "@/components/Shared/Layout/Container";
import Table from "@/components/Shared/Table/table";

import { useRouter } from "next/router";
const Dashboard = () => {

  const router = useRouter();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    if (!user || !token) {
      router.push('/auth');
    }
  }, [])


  return (
    <Container>
      <div className="h-screen flex-grow w-fit overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
        <ProgressCard />
        <ProgressCard />
        <ProgressCard />
        <div className="w-full p-2 lg:w-full">
          <div className="rounded-lg bg-card sm:h-80 h-60">
            <Graph />
          </div>
          <Table />
        </div>

      </div>
    </Container>
  );
};

export default memo(Dashboard);
