import React, { useState, useEffect } from "react";

import CTA from "../components/CTA";
import InfoCard from "../components/Cards/InfoCard";
import ChartCard from "../components/Chart/ChartCard";
import { Doughnut, Line } from "react-chartjs-2";
import ChartLegend from "../components/Chart/ChartLegend";
import PageTitle from "../components/Typography/PageTitle";
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from "../icons";
import RoundIcon from "../components/RoundIcon";
import response from "../utils/demo/tableData";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
} from "@windmill/react-ui";

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from "../utils/demo/chartsData";
import { Button } from "@windmill/react-ui";
import { useDispatch, useSelector } from "react-redux";
import { getUsersData } from "../slices/userDataSlice";

function Dashboard() {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (userData.data.length === 0) {
      dispatch(getUsersData());
    }
  }, []);
  // pagination setup
  const resultsPerPage = 10;
  const totalResults = response.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page]);

  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      <div className="py-2 flex justify-end items-end">
        <Button onClick={() => dispatch(getUsersData())}>Refresh</Button>
      </div>
      <div className="py-2 flex text-white gap-2">
        <Badge className="flex justify-center items-center ">Number generated - {userData.numberValue}</Badge>
        <Badge className="flex justify-center items-center">{userData.flag}</Badge>
      </div>
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Id</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Role</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {userData.data.length > 0 &&
              userData.status === "success" &&
              userData.data.map((user, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold">{user.Id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{user.empName}</span>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>{user.role}</Badge>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PageTitle>Charts</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Revenue">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Traffic">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>
      </div>
    </>
  );
}

export default Dashboard;
