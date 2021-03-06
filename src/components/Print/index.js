import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Dashboard/Modals/Loader";
import Axios from "axios";
import { errorHandler } from "../../helpers";
import { useSelector } from "react-redux";
function Print() {
  const { token, fullName, email } = useSelector((state) => state.user);
  const [showLoader, setShowLoader] = useState(true);
  const params = useParams();
  const { id, status } = params;
  const [results, setResults] = useState([]);

  const fetchOrders = () => {
    setShowLoader(true);
    Axios.get(
      process.env.REACT_APP_BACKEND_URL + "/orders/master/?token=" + token
    )
      .then((res) => {
        setResults(res.data.result);
        setShowLoader(false);
        setTimeout(() => {
          window.print();
        }, 500);
      })
      .catch((error) => {
        setShowLoader(false);
        errorHandler(error);
      });
  };
  const fetcTransport = () => {
    setShowLoader(true);
    Axios.get(
      process.env.REACT_APP_BACKEND_URL + "/transport/master/?token=" + token
    )
      .then((res) => {
        setResults(res.data.result);
        setShowLoader(false);
        setTimeout(() => {
          window.print();
        }, 500);
      })
      .catch((error) => {
        setShowLoader(false);
        errorHandler(error);
      });
  };
  const fetcBookings = () => {
    setShowLoader(true);
    Axios.get(
      process.env.REACT_APP_BACKEND_URL + "/booking/master/?token=" + token
    )
      .then((res) => {
        setResults(res.data.result);
        setShowLoader(false);
        setTimeout(() => {
          window.print();
        }, 500);
      })
      .catch((error) => {
        setShowLoader(false);
        errorHandler(error);
      });
  };

  useEffect(() => {
    if (status === "customerTransportId") {
      Axios.get(
        process.env.REACT_APP_BACKEND_URL +
          "/transport/print/" +
          id +
          "?token=" +
          token
      )
        .then((res) => {
          setShowLoader(false);
          if (res.data.result?._id) {
            setResults([res.data.result]);
            setTimeout(() => {
              window.print();
            }, 500);
          }
        })
        .catch((error) => {
          errorHandler(error);
          setShowLoader(false);
        });
    }
    if (status === "facility") {
      Axios.get(
        process.env.REACT_APP_BACKEND_URL +
          "/facility/find/category/" +
          id +
          "?token=" +
          token
      )
        .then((res) => {
          setShowLoader(false);
          setResults(res.data.result);
          setTimeout(() => {
            window.print();
          }, 500);
        })
        .catch((error) => {
          errorHandler(error);
          setShowLoader(false);
        });
    }

    if (
      status === "orders" ||
      status === "bookings" ||
      status === "transport"
    ) {
      if (status === "orders") {
        fetchOrders();
      }
      if (status === "bookings") {
        fetcBookings();
      }
      if (status === "transport") {
        fetcTransport();
      }
    }
    if (status === "paymentreport3") {
      Axios.get(
        process.env.REACT_APP_BACKEND_URL + "/transport/manager/?token=" + token
      )
        .then((res) => {
          setResults(res.data.result);
          setShowLoader(false);
          setTimeout(() => {
            window.print();
          }, 500);
        })
        .catch((error) => {
          setShowLoader(false);
          errorHandler(error);
        });
    }
    if (status === "paymentreport") {
      setShowLoader(true);
      Axios.get(
        process.env.REACT_APP_BACKEND_URL + "/booking/manager/?token=" + token
      )
        .then((res) => {
          setResults(res.data.result);
          setShowLoader(false);
          setTimeout(() => {
            window.print();
          }, 500);
        })
        .catch((error) => {
          setShowLoader(false);
          errorHandler(error);
        });
    }

    if (status === "paymentreport2") {
      setShowLoader(true);
      Axios.get(
        process.env.REACT_APP_BACKEND_URL + "/orders/manager/?token=" + token
      )
        .then((res) => {
          setResults(res.data.result);
          setShowLoader(false);
          setTimeout(() => {
            window.print();
          }, 500);
        })
        .catch((error) => {
          setShowLoader(false);
          errorHandler(error);
        });
    }
  }, []);
  const paymentReportHotelcalculateIncome = () => {
    let sum = 0;
    for (let i = 0; i < results.length; i++) {
      sum += (results[i].totalAmount * 7) / 100;
    }
    return sum.toFixed(1);
  };
  const paymentReportHotelcalculateTotal = () => {
    let sum = 0;
    for (let i = 0; i < results.length; i++) {
      sum += (results[i].totalAmount * 93) / 100;
    }
    return sum.toFixed(1);
  };

  const paymentReportHotelcalculateIncome2 = () => {
    let sum = 0;
    for (let i = 0; i < results.length; i++) {
      sum += (results[i].amountPaid * 7) / 100;
    }
    return sum.toFixed(1);
  };
  const paymentReportHotelcalculateTotal2 = () => {
    let sum = 0;
    for (let i = 0; i < results.length; i++) {
      sum += (results[i].amountPaid * 93) / 100;
    }
    return sum.toFixed(1);
  };
  return (
    <div>
      <img src={require("../../assets/logo.png")} />
      {status === "facility" && (
        <>
          <h4 style={{ textTransform: "uppercase" }}>{id} Reports</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Name</th>
                <th>Stars</th>
                <th>Average price</th>
                <th>Lat</th>
                <th>Long</th>
                <th>Address</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.stars}</td>
                  <td>{item.averagePrice}sadasd</td>
                  <td>{item.lat}</td>
                  <td>{item.long}</td>
                  <td>{item.address}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {status === "customerTransportId" && (
        <div>
          <h3>DRIVER PAYMENT ID</h3>
          {results.length > 0 && (
            <>
              <p>
                <b>departureDate:</b> {results[0].departureDate}
              </p>
              <p>
                <b>departureTime:</b> {results[0].departureTime}
              </p>
              <p>
                <b>transactionId:</b> {results[0].transactionId}
              </p>
              <p>
                <b>driverLanguage:</b> {results[0].driverLanguage}
              </p>
              <p>
                <b>Payment ID:</b> {results[0].paymentId}
              </p>
              <p>
                <b>Amount to be paid:</b> {results[0].amountPaid}
              </p>
              <p>
                <b>Amount paid:</b> {results[0].amountPaid}
              </p>
              <p>
                <b>status:</b> {results[0].status}
              </p>
              <p>
                <b>Customer Name:</b> {fullName}
              </p>
              <p>
                <b>Customer Email:</b> {email}
              </p>
            </>
          )}
        </div>
      )}

      {(status === "orders" ||
        status === "bookings" ||
        status === "transport") && (
        <>
          <h3 style={{ textTransform: "uppercase" }}>
            {status} payment report ({id})
          </h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="">#ID</th>
                <th className="">Transaction ID</th>
                <th className="">Amount Paid</th>
                <th className="">income(7%)</th>
                <th className="">Amount to transfer(93%)</th>
                <th className="">Customer Name</th>
                <th className="">Facility Name</th>
                <th className="">Facility Type</th>
                <th className="">Date</th>
                <th className="">Transfared</th>
                <th className="">Status</th>
              </tr>
            </thead>
            <tbody>
              {results
                .filter((item) => {
                  if (id === "failed") {
                    return (
                      item?.status === "failed" ||
                      item?.paymentStatus === "failed"
                    );
                  } else if (id === "paid") {
                    return (
                      item?.status === "paid" || item?.paymentStatus === "paid"
                    );
                  } else {
                    return item._id !== "";
                  }
                })
                .map((item, i) => (
                  <tr
                    key={i}
                    style={{ borderTopColor: "#CCC", borderTopWidth: 1 }}
                  >
                    <td className="">{i + 1}</td>
                    <td className="">{item.transactionId}</td>
                    <td className="">
                      {status === "orders" && <>{item.totalAmount}</>}
                      {status === "bookings" && (
                        <>
                          {item.paymentStatus === "paid" ? (
                            <>{item.totalAmount}</>
                          ) : (
                            <>{item.totalDays * item.pricePerDay}</>
                          )}
                        </>
                      )}
                      {status === "transport" && <>{item.amountPaid}</>}
                      RWF
                    </td>
                    <td className="">
                      {status === "orders" && (
                        <>
                          {item.status === "paid" ? (
                            <>{(item.totalAmount * 7) / 100} RWF</>
                          ) : (
                            <>-</>
                          )}
                        </>
                      )}
                      {status === "bookings" && (
                        <>
                          {item.paymentStatus === "paid" ? (
                            <>{(item.totalAmount * 7) / 100} RWF</>
                          ) : (
                            <>-</>
                          )}
                        </>
                      )}
                      {status === "transport" && (
                        <>
                          {item.status === "paid" ? (
                            <>{(item.amountPaid * 7) / 100} RWF</>
                          ) : (
                            <>-</>
                          )}
                        </>
                      )}
                    </td>
                    <td className="">
                      {status === "orders" && (
                        <>
                          {item.status === "paid" ? (
                            <>{(item.totalAmount * 93) / 100} RWF</>
                          ) : (
                            <>-</>
                          )}
                        </>
                      )}
                      {status === "bookings" && (
                        <>
                          {item.paymentStatus === "paid" ? (
                            <>{(item.totalAmount * 93) / 100} RWF</>
                          ) : (
                            <>-</>
                          )}
                        </>
                      )}
                      {status === "transport" && (
                        <>
                          {item.status === "paid" ? (
                            <>{(item.amountPaid * 93) / 100} RWF</>
                          ) : (
                            <>-</>
                          )}
                        </>
                      )}
                    </td>
                    <td>{item.customer[0].fullName}</td>
                    <td className="">{item.facility[0].name}</td>
                    <td className="" style={{ textTransform: "capitalize" }}>
                      {item.facility[0].type}
                    </td>
                    <td className="">
                      {status === "orders" || status === "transport" ? (
                        <>
                          {new Date(item.date).getDate()}-
                          {new Date(item.date).getMonth() + 1}-
                          {new Date(item.date).getFullYear() + 1}
                        </>
                      ) : (
                        <>
                          {new Date(item.transactionDate).getDate()}-
                          {new Date(item.transactionDate).getMonth() + 1}-
                          {new Date(item.transactionDate).getFullYear() + 1}
                        </>
                      )}
                    </td>
                    <td className="" style={{ textTransform: "capitalize" }}>
                      {item?.status === "paid" ||
                      item?.paymentStatus === "paid" ? (
                        <>
                          {item.transfered ? (
                            // <FaCheckCircle size={30} />
                            <>YES</>
                          ) : (
                            "NO"
                          )}
                        </>
                      ) : (
                        <>NO</>
                      )}
                    </td>
                    {(status === "orders" || status === "transport") && (
                      <>
                        {item.status === "failed" && (
                          <td
                            className=" text-danger"
                            style={{ textTransform: "capitalize" }}
                          >
                            {item.status}
                          </td>
                        )}
                        {item.status === "pending" && (
                          <td
                            className=" text-info"
                            style={{ textTransform: "capitalize" }}
                          >
                            {item.status}
                          </td>
                        )}
                        {item.status === "paid" && (
                          <td
                            className=" text-success"
                            style={{ textTransform: "capitalize" }}
                          >
                            {item.status}
                          </td>
                        )}
                      </>
                    )}
                    {status === "bookings" && (
                      <>
                        {item.paymentStatus === "failed" && (
                          <td
                            className=" text-danger"
                            style={{ textTransform: "capitalize" }}
                          >
                            {item.paymentStatus}
                          </td>
                        )}
                        {item.paymentStatus === "pending" && (
                          <td
                            className=" text-info"
                            style={{ textTransform: "capitalize" }}
                          >
                            {item.paymentStatus}
                          </td>
                        )}
                        {item.paymentStatus === "paid" && (
                          <td
                            className=" text-success"
                            style={{ textTransform: "capitalize" }}
                          >
                            {item.paymentStatus}
                          </td>
                        )}
                      </>
                    )}
                    {status === "transport" && (
                      <>
                        {item.status === "failed" && (
                          <td
                            className={
                              item.status === "paid"
                                ? "p-2 text-danger text-success"
                                : "p-2 text-danger text-danger"
                            }
                            style={{ textTransform: "capitalize" }}
                          >
                            {item.status}
                          </td>
                        )}
                      </>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
      {status === "paymentreport" && (
        <>
          <h4>PAYMENT REPORT {id !== "all" ? "(" + id + ")" : ""}</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Transaction ID</th>
                <th>Amount Paid</th>
                <th>Charges(7%)</th>
                <th>Amount to receive(93%)</th>
                <th>Customer name</th>
                <th>Facility Name</th>
                <th>Facility Type</th>
                <th>Date</th>
                <th>Received</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody style={{ border: "none" }}>
              {results
                .filter((item) => {
                  const dt = id.split("-");
                  if (id !== "all") {
                    return (
                      new Date(item.transactionDate).getMonth() + 1 == dt[1] &&
                      new Date(item.transactionDate).getFullYear() == dt[0]
                    );
                  }
                  return true;
                })
                .map((item, i) => (
                  <tr
                    key={i}
                    style={{ borderTopColor: "#CCC", borderTopWidth: 1 }}
                  >
                    <td>{i + 1}</td>
                    <td>{item.transactionId}</td>
                    <td>
                      {item.paymentStatus === "paid" ? (
                        <>{item.totalAmount}</>
                      ) : (
                        <>{item.totalDays * item.pricePerDay}</>
                      )}
                      RWF
                    </td>
                    <td>
                      {item.paymentStatus === "paid" ? (
                        <>{(item.totalAmount * 7) / 100} RWF</>
                      ) : (
                        <>-</>
                      )}
                    </td>
                    <td>
                      {item.paymentStatus === "paid" ? (
                        <>{(item.totalAmount * 93) / 100} RWF</>
                      ) : (
                        <>-</>
                      )}
                    </td>
                    <td>{item.customer[0].fullName}</td>
                    <td>{item.facility[0].name}</td>
                    <td style={{ textTransform: "capitalize" }}>
                      {item.facility[0].type}
                    </td>
                    <td>
                      {new Date(item.transactionDate).getDate()}-
                      {new Date(item.transactionDate).getMonth() + 1}-
                      {new Date(item.transactionDate).getFullYear()}
                    </td>
                    <td style={{ textTransform: "capitalize" }}>
                      {item?.status === "paid" ||
                      item?.paymentStatus === "paid" ? (
                        <>{item.transfered ? <>YES</> : <>NO</>}</>
                      ) : (
                        <>NO</>
                      )}
                    </td>
                    {item.paymentStatus === "failed" && (
                      <td
                        className="p-2 text-danger"
                        style={{ textTransform: "capitalize" }}
                      >
                        {item.paymentStatus}
                      </td>
                    )}
                    {item.paymentStatus === "pending" && (
                      <td
                        className="p-2 text-info"
                        style={{ textTransform: "capitalize" }}
                      >
                        {item.paymentStatus}
                      </td>
                    )}
                    {item.paymentStatus === "paid" && (
                      <td
                        className="p-2 text-success"
                        style={{ textTransform: "capitalize" }}
                      >
                        {item.paymentStatus}
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
          <br />
          <p className="h5 m-0 p-0">
            TOTAL CHARGES: {paymentReportHotelcalculateIncome()} RWF
          </p>
          <p className="h5 m-0 p-0">
            TOTAL EARNINGS: {paymentReportHotelcalculateTotal()} RWF
          </p>
        </>
      )}

      {status === "paymentreport2" && (
        <>
          <h4>PAYMENT REPORT {id !== "all" ? "(" + id + ")" : ""}</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Transaction ID</th>
                <th>Amount Paid</th>
                <th>Charges(7%)</th>
                <th>Amount to receive(93%)</th>
                <th>Customer name</th>
                <th>Facility Name</th>
                <th>Facility Type</th>
                <th>Date</th>
                <th>Received</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody style={{ border: "none" }}>
              {results
                .filter((item) => {
                  const dt = id.split("-");
                  if (id !== "all") {
                    return (
                      new Date(item.date).getMonth() + 1 == dt[1] &&
                      new Date(item.date).getFullYear() == dt[0]
                    );
                  }
                  return true;
                })
                .map((item, i) => (
                  <tr
                    key={i}
                    style={{ borderTopColor: "#CCC", borderTopWidth: 1 }}
                  >
                    <td>{i + 1}</td>
                    <td>{item.transactionId}</td>
                    <td>
                      {item.totalAmount}
                      RWF
                    </td>
                    <td>
                      {item.status === "paid" ? (
                        <>{(item.totalAmount * 7) / 100} RWF</>
                      ) : (
                        <>-</>
                      )}
                    </td>
                    <td>
                      {item.status === "paid" ? (
                        <>{(item.totalAmount * 93) / 100} RWF</>
                      ) : (
                        <>-</>
                      )}
                    </td>
                    <td>{item.customer[0].fullName}</td>
                    <td>{item.facility[0].name}</td>
                    <td style={{ textTransform: "capitalize" }}>
                      {item.facility[0].type}
                    </td>
                    <td>
                      {new Date(item.date).getDate()}-
                      {new Date(item.date).getMonth() + 1}-
                      {new Date(item.date).getFullYear()}
                    </td>
                    <td style={{ textTransform: "capitalize" }}>
                      {item?.status === "paid" ||
                      item?.paymentStatus === "paid" ? (
                        <>{item.transfered ? <>YES</> : <>NO</>}</>
                      ) : (
                        <>NO</>
                      )}
                    </td>
                    {item.status === "failed" && (
                      <td
                        className="p-2 text-danger"
                        style={{ textTransform: "capitalize" }}
                      >
                        {item.status}
                      </td>
                    )}
                    {item.status === "pending" && (
                      <td
                        className="p-2 text-info"
                        style={{ textTransform: "capitalize" }}
                      >
                        {item.status}
                      </td>
                    )}
                    {item.status === "paid" && (
                      <td
                        className="p-2 text-success"
                        style={{ textTransform: "capitalize" }}
                      >
                        {item.status}
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
          <br />
          <p className="h5 m-0 p-0">
            TOTAL CHARGES: {paymentReportHotelcalculateIncome()} RWF
          </p>
          <p className="h5 m-0 p-0">
            TOTAL EARNINGS: {paymentReportHotelcalculateTotal()} RWF
          </p>
        </>
      )}

      {status === "paymentreport3" && (
        <>
          <h4>PAYMENT REPORT {id !== "all" ? "(" + id + ")" : ""}</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Transaction ID</th>
                <th>Amount Paid</th>
                <th>Charges(7%)</th>
                <th>Amount to receive(93%)</th>
                <th>Customer name</th>
                <th>Facility Name</th>
                <th>Facility Type</th>
                <th>Date</th>
                <th>Received</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody style={{ border: "none" }}>
              {results
                .filter((item) => {
                  const dt = id.split("-");
                  if (id !== "all") {
                    return (
                      new Date(item.date).getMonth() + 1 == dt[1] &&
                      new Date(item.date).getFullYear() == dt[0]
                    );
                  }
                  return true;
                })
                .map((item, i) => (
                  <tr
                    key={i}
                    style={{ borderTopColor: "#CCC", borderTopWidth: 1 }}
                  >
                    <td>{i + 1}</td>
                    <td>{item.transactionId}</td>
                    <td>
                      {item.amountPaid}
                      RWF
                    </td>
                    <td>
                      {item.status === "paid" ? (
                        <>{(item.amountPaid * 7) / 100} RWF</>
                      ) : (
                        <>-</>
                      )}
                    </td>
                    <td>
                      {item.status === "paid" ? (
                        <>{(item.amountPaid * 93) / 100} RWF</>
                      ) : (
                        <>-</>
                      )}
                    </td>
                    <td>{item.customer[0].fullName}</td>
                    <td>{item.facility[0].name}</td>
                    <td style={{ textTransform: "capitalize" }}>
                      {item.facility[0].type}
                    </td>
                    <td>
                      {new Date(item.date).getDate()}-
                      {new Date(item.date).getMonth() + 1}-
                      {new Date(item.date).getFullYear()}
                    </td>
                    <td style={{ textTransform: "capitalize" }}>
                      {item?.status === "paid" ||
                      item?.paymentStatus === "paid" ? (
                        <>{item.transfered ? <>YES</> : <>NO</>}</>
                      ) : (
                        <>NO</>
                      )}
                    </td>
                    {item.status === "failed" && (
                      <td
                        className="p-2 text-danger"
                        style={{ textTransform: "capitalize" }}
                      >
                        {item.status}
                      </td>
                    )}
                    {item.status === "pending" && (
                      <td
                        className="p-2 text-info"
                        style={{ textTransform: "capitalize" }}
                      >
                        {item.status}
                      </td>
                    )}
                    {item.status === "paid" && (
                      <td
                        className="p-2 text-success"
                        style={{ textTransform: "capitalize" }}
                      >
                        {item.status}
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
          <br />
          <p className="h5 m-0 p-0">
            TOTAL CHARGES: {paymentReportHotelcalculateIncome2()} RWF
          </p>
          <p className="h5 m-0 p-0">
            TOTAL EARNINGS: {paymentReportHotelcalculateTotal2()} RWF
          </p>
        </>
      )}
      <Loader showLoader={showLoader} />
    </div>
  );
}

export default Print;
