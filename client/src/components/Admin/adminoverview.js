import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut, Bar, Line, Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import {
  RevenueMonthly,
  MeetingSpaceMonthly,
} from "../../store/actions/datacollection";
import { Activity, Cash, PeopleFill, PersonDown } from "react-bootstrap-icons";
import { MenuItem, Select } from "@mui/material";
import { BsCashStack, BsClipboard } from "react-icons/bs";
import { MdBed, MdMeetingRoom, MdPending } from "react-icons/md";
import { getAllUsers } from "../../store/actions/adminActions";
const AdminOverview = () => {
  //  ChartJS.register(CategoryScale, LinearScale, BarElement,PointElement,LineElement);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(RevenueMonthly(2023));
  }, [dispatch]);
  useEffect(() => {
    dispatch(MeetingSpaceMonthly(2023));
  }, [dispatch]);
  const RevenueD = useSelector((data) => data.monthlyIncome);
  const ConferenceRev = useSelector((data) => data.conferenceIncome);

  const [ConferenceData, setConferenceData] = useState({});
  const [growIndicatorM, setGrowthrateM] = useState({});

  const [conferencepaymentoption, setconferencepay] = useState({});

  useEffect((data) => {
    setconferencepay({
      labels: ["Mtn Mobile Money(momo)", "Card Payment(Credit/Debit)"],
      datasets: [
        {
          label: "Conference Room Booking Payment Option Frequency",
          data: [
            ConferenceRev && ConferenceRev.data
              ? ConferenceRev.data[12].Mtnmomopayment
              : 0,
            ConferenceRev && ConferenceRev.data
              ? ConferenceRev.data[12].cardpayment
              : 0,
          ],
        },
      ],
    });
    setConferenceData({
      labels:
        ConferenceRev && ConferenceRev.data
          ? ConferenceRev.data.map((item) => item.month)
          : [],
      datasets: [
        {
          label: "Conference Room Monthly Revenue",
          data:
            ConferenceRev && ConferenceRev.data
              ? ConferenceRev.data.map((item) => item.totalRevenue)
              : [],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
          ],
          hoverBackgroundColor: [
            "#003e4f",
            "#4c5b5c",
            "#946c2f",
            "#6b0f12",
            "#b25800",
            "#041f2b",
            "#003e4f",
            "#4c5b5c",
            "#946c2f",
            "#6b0f12",
            "#b25800",
            "#041f2b",
          ],
          hoverBorderColor: "#000",
          borderWidth: 1,
          barPercentage: 0.5,

          minBarLength: 2,
        },
      ],
    });

    setGrowthrateM({
      labels:
        ConferenceRev && ConferenceRev.data
          ? ConferenceRev.data.map((item) => item.month)
          : [],
      datasets: [
        {
          label: "Progress rate indicator",
          data:
            ConferenceRev && ConferenceRev.data
              ? ConferenceRev.data.map((item) => item.growth_indicator)
              : [],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
          ],
          hoverBackgroundColor: [
            "#003e4f",
            "#4c5b5c",
            "#946c2f",
            "#6b0f12",
            "#b25800",
            "#041f2b",
            "#003e4f",
            "#4c5b5c",
            "#946c2f",
            "#6b0f12",
            "#b25800",
            "#041f2b",
          ],
          hoverBorderColor: "#000",
          borderWidth: 1,
          barPercentage: 0.5,

          minBarLength: 2,
        },
      ],
    });
  }, ConferenceRev);

  const [statData, setSetData] = useState({});
  const [growIndicator, setGrowthrate] = useState({});

  const [roompayemntoption, setpaymentoption] = useState({});

  useEffect(() => {
    setpaymentoption({
      labels: ["Mtn Mobile Money(momo)", "Card Payment(Credit/Debit)"],
      datasets: [
        {
          label: "Room Reservation Payment Option Frequency",
          data: [
            RevenueD && RevenueD.data ? RevenueD.data[12].Mtnmomopayment : 0,
            RevenueD && RevenueD.data ? RevenueD.data[12].cardpayment : 0,
          ],
        },
      ],
    });
    setSetData({
      labels:
        RevenueD && RevenueD.data
          ? RevenueD.data.map((item) => item.month)
          : [],
      datasets: [
        {
          label: "Monthly Revenue",
          data:
            RevenueD && RevenueD.data
              ? RevenueD.data.map((item) => item.totalRevenue)
              : [],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
          ],
          hoverBackgroundColor: [
            "#003e4f",
            "#4c5b5c",
            "#946c2f",
            "#6b0f12",
            "#b25800",
            "#041f2b",
            "#003e4f",
            "#4c5b5c",
            "#946c2f",
            "#6b0f12",
            "#b25800",
            "#041f2b",
          ],
          hoverBorderColor: "#000",
          borderWidth: 1,
          barPercentage: 0.5,

          minBarLength: 2,
        },
      ],
    });

    setGrowthrate({
      labels:
        RevenueD && RevenueD.data
          ? RevenueD.data.map((item) => item.month)
          : [],
      datasets: [
        {
          label: "Progress rate indicator",
          data:
            RevenueD && RevenueD.data
              ? RevenueD.data.map((item) => item.growth_indicator)
              : [],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
          ],
          hoverBackgroundColor: [
            "#003e4f",
            "#4c5b5c",
            "#946c2f",
            "#6b0f12",
            "#b25800",
            "#041f2b",
            "#003e4f",
            "#4c5b5c",
            "#946c2f",
            "#6b0f12",
            "#b25800",
            "#041f2b",
          ],
          hoverBorderColor: "#000",
          borderWidth: 1,
          barPercentage: 0.5,

          minBarLength: 2,
        },
      ],
    });
  }, RevenueD);

  const options = {
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Y text",
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "X text",
          },
        },
      ],
    },
  };
  const [selectedYear, setyear] = useState(2023);
  const customers = useSelector((data) => data.clients);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="panel_detail">
      <p className="header-p">Overview</p>
      <div className="column-styles">
        {RevenueD && RevenueD.data ? (
          <div className="align-grid-cx" style={{ marginBottom: "50px" }}>
            <div
              className="option-box"
              style={{ backgroundColor: "rgb(190, 233, 247)" }}
            >
              <PersonDown
                size={30}
                color="white"
                style={{ backgroundColor: " rgb(223, 234, 239)" }}
              />
              <p>
                {customers && customers.data ? customers.data.length : 0}{" "}
                Clients
              </p>
            </div>
            <div
              className="option-box"
              style={{ backgroundColor: "rgb(190, 233, 247)" }}
            >
              <Cash size={30} color="white" />
              <p> GH₵ {RevenueD.data[12].totalRevenue} Total Revenue</p>
            </div>
            <div
              className="option-box"
              style={{ backgroundColor: "rgb(190, 233, 247)" }}
            >
              <MdBed size={30} color="white" />
              <p> {RevenueD.data[12].checkedIn} Checked In Currently</p>
            </div>
            <div
              className="option-box"
              style={{ backgroundColor: "rgb(190, 233, 247)" }}
            >
              <MdPending size={30} color="white" />
              <p> {RevenueD.data[12].pendingOrder} pending Orders</p>
            </div>
          </div>
        ) : null}

        <div className="row-btw">
          <div className="row-styles">
            <span>
              {" "}
              <Activity size={40} />
            </span>
            <p
              style={{
                fontSize: "30px",
                marginLeft: "20px",
              }}
            >
              {" "}
              Monthly Revenue forcast{" "}
            </p>
          </div>
          <div className="row-styles">
            <Select
              style={{
                minWidth: "160px",
                height: "40px",
                fontSize: "14px",
                fontFamily: "Roboto condensed",
                fontWeight: "bold",
                color: "rgb(6, 8, 29)",
              }}
              name="type"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedYear}
              onChange={(data) => setyear(data.target.value)}
            >
              {" "}
              <MenuItem
                className="roomtype"
                value={2023}
                style={{
                  fontSize: "14px",
                  fontFamily: "Roboto condensed",
                  fontWeight: "bold",
                }}
              >
                2023
              </MenuItem>
              <MenuItem
                value={2024}
                style={{
                  fontSize: "14px",
                  fontFamily: "Roboto condensed",
                  fontWeight: "bold",
                }}
              >
                2024
              </MenuItem>
              <MenuItem
                value={2025}
                style={{
                  fontSize: "14px",
                  fontFamily: "Roboto condensed",
                  fontWeight: "bold",
                }}
              >
                2025
              </MenuItem>
              <MenuItem
                value={2026}
                style={{
                  fontSize: "14px",
                  fontFamily: "Roboto condensed",
                  fontWeight: "bold",
                }}
              >
                {" "}
                2026
              </MenuItem>
              <MenuItem
                value={2027}
                style={{
                  fontSize: "14px",
                  fontFamily: "Roboto condensed",
                  fontWeight: "bold",
                }}
              >
                {" "}
                2027
              </MenuItem>
              <MenuItem
                value={2028}
                style={{
                  fontSize: "14px",
                  fontFamily: "Roboto condensed",
                  fontWeight: "bold",
                }}
              >
                {" "}
                2028
              </MenuItem>
              <MenuItem
                value={2029}
                style={{
                  fontSize: "14px",
                  fontFamily: "Roboto condensed",
                  fontWeight: "bold",
                }}
              >
                {" "}
                2029
              </MenuItem>
              <MenuItem
                value={2030}
                style={{
                  fontSize: "14px",
                  fontFamily: "Roboto condensed",
                  fontWeight: "bold",
                }}
              >
                {" "}
                2030
              </MenuItem>
              <MenuItem
                value={2031}
                style={{
                  fontSize: "14px",
                  fontFamily: "Roboto condensed",
                  fontWeight: "bold",
                }}
              >
                {" "}
                2031
              </MenuItem>
            </Select>
            <span
              className="searchbtn"
              onClick={() => {
                dispatch(RevenueMonthly(selectedYear));
              }}
            >
              Update
            </span>
          </div>
        </div>
        <div style={{ width: "90%", marginLeft: "40px" }}>
          {RevenueD && RevenueD.data ? (
            <Bar type="bar" data={statData} />
          ) : null}
        </div>
      </div>

      <div style={{ width: "90%", marginLeft: "40px" }}>
        {RevenueD && RevenueD.data ? <Line data={growIndicator} /> : null}
      </div>

      <div className="align-grid-g " style={{ marginTop: "80px" }}>
        <div style={{ marginTop: "20px", marginRight: "40px" }}>
          {" "}
          {RevenueD && RevenueD.data ? <Pie data={roompayemntoption} /> : null}
        </div>
        <div>
          {ConferenceRev && ConferenceRev.data ? (
            <Pie data={conferencepaymentoption} options={options} />
          ) : null}
        </div>
      </div>
      <div className="row-styles" style={{ marginTop: "50px" }}>
        <span>
          {" "}
          <BsCashStack size={30} />
        </span>
        <p
          style={{
            fontSize: "25px",
            marginLeft: "20px",
            marginTop: "10px",
          }}
        >
          {" "}
          Conference Room Booking Revenue Overview{" "}
        </p>
      </div>

      {ConferenceRev && ConferenceRev.data ? (
        <div className="align-grid-cx" style={{ marginBottom: "50px" }}>
          <div
            className="option-box"
            style={{ backgroundColor: "rgb(190, 233, 247)" }}
          >
            <Cash size={30} color="white" />
            <p> GH₵ {ConferenceRev.data[12].totalRevenue} Total Revenue</p>
          </div>
          <div
            className="option-box"
            style={{ backgroundColor: "rgb(190, 233, 247)" }}
          >
            <MdBed size={30} color="white" />
            <p> {ConferenceRev.data[12].checkedIn} Checked In Currently</p>
          </div>
          <div
            className="option-box"
            style={{ backgroundColor: "rgb(190, 233, 247)" }}
          >
            <MdPending size={30} color="white" />
            <p> {ConferenceRev.data[12].pendingOrder} pending Orders</p>
          </div>
        </div>
      ) : null}

      <div className="row-styles" style={{ marginTop: "50px" }}>
        <span>
          {" "}
          <PeopleFill size={30} />
        </span>
        <p
          style={{
            fontSize: "25px",
            marginLeft: "20px",
            marginTop: "10px",
          }}
        >
          {" "}
          Conference Space Booking Progress indicator{" "}
        </p>
      </div>
      <div style={{ width: "90%", marginLeft: "40px" }}>
        {ConferenceRev && ConferenceRev.data ? (
          <Bar type="bar" data={ConferenceData} />
        ) : null}
      </div>
      <div style={{ width: "90%", marginLeft: "40px" }}>
        {ConferenceRev && ConferenceRev.data ? (
          <Line type="bar" data={growIndicatorM} />
        ) : null}
      </div>
    </div>
  );
};

export default AdminOverview;
