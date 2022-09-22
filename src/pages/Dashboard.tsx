import { useState } from "react";
import MainLayout from "../components/Layout/MainLayout";

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState();
  const onClickCalender = () => {};

  return (
    <MainLayout>
      <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
        <div>
          <h4 className="mb-3 mb-md-0">Welcome to Dashboard</h4>
        </div>
        <div className="d-flex align-items-center flex-wrap text-nowrap">
          <div className="input-group wd-200 me-2 mb-2 mb-md-0">
            <button className="btn btn-outline-primary btn-icon calendar" type="button" onClick={onClickCalender}>
              <i data-feather="calendar" /*appFeatherIcon*/></i>
            </button>
            <input
              className="form-control border-primary bg-transparent"
              placeholder="yyyy-mm-dd"
              name="dp"
              value={currentDate}
              // ngbDatepicker
              // d="ngbDatepicker"
            />
          </div>
          <button type="button" className="btn btn-outline-primary btn-icon-text me-2 mb-2 mb-md-0">
            <i className="btn-icon-prepend" data-feather="printer" /*appFeatherIcon*/></i>
            Print
          </button>
          <button type="button" className="btn btn-primary btn-icon-text mb-2 mb-md-0">
            <i className="btn-icon-prepend" data-feather="download-cloud" /*appFeatherIcon*/></i>
            Download Report
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-xl-12 stretch-card">
          <div className="row flex-grow-1">
            <div className="col-md-4 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-baseline">
                    <h6 className="card-title mb-0">New Customers</h6>
                    <div /*ngbDropdown*/ className="mb-2">
                      <button
                        /*ngbDropdownToggle*/
                        className="btn p-0 no-dropdown-toggle-icon"
                        type="button"
                        id="dropdownMenuButton"
                      >
                        <i className="icon-lg text-muted pb-3px" data-feather="more-horizontal" /*appFeatherIcon*/></i>
                      </button>
                      <div /*ngbDropdownMenu*/ aria-labelledby="dropdownMenuButton">
                        <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                          <i data-feather="eye" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                          <span className="">View</span>
                        </a>
                        <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                          <i data-feather="edit-2" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                          <span className="">Edit</span>
                        </a>
                        <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                          <i data-feather="trash" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                          <span className="">Delete</span>
                        </a>
                        <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                          <i data-feather="printer" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                          <span className="">Print</span>
                        </a>
                        <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                          <i data-feather="download" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                          <span className="">Download</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 col-md-12 col-xl-5">
                      <h3 className="mb-2">3,897</h3>
                      <div className="d-flex align-items-baseline">
                        <p className="text-success">
                          <span>+3.3%</span>
                          <i data-feather="arrow-up" /*appFeatherIcon*/ className="icon-sm mb-1"></i>
                        </p>
                      </div>
                    </div>
                    <div className="col-6 col-md-12 col-xl-7">
                      <div className="mt-md-3 mt-xl-0">
                        {/* <apx-chart
                          series="customersChartOptions.series"
                          chart="customersChartOptions.chart"
                          colors="customersChartOptions.colors"
                          xaxis="customersChartOptions.xaxis"
                          stroke="customersChartOptions.stroke"
                          markers="customersChartOptions.markers"
                        ></apx-chart> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-baseline">
                    <h6 className="card-title mb-0">New Orders</h6>
                    <div /*ngbDropdown*/ className="mb-2">
                      <button
                        /*ngbDropdownToggle*/
                        className="btn p-0 no-dropdown-toggle-icon"
                        type="button"
                        id="dropdownMenuButton1"
                      >
                        <i className="icon-lg text-muted pb-3px" data-feather="more-horizontal" /*appFeatherIcon*/></i>
                      </button>
                      <div /*ngbDropdownMenu*/ aria-labelledby="dropdownMenuButton1">
                        <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                          <i data-feather="eye" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                          <span className="">View</span>
                        </a>
                        <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                          <i data-feather="edit-2" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                          <span className="">Edit</span>
                        </a>
                        <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                          <i data-feather="trash" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                          <span className="">Delete</span>
                        </a>
                        <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                          <i data-feather="printer" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                          <span className="">Print</span>
                        </a>
                        <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                          <i data-feather="download" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                          <span className="">Download</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 col-md-12 col-xl-5">
                      <h3 className="mb-2">35,084</h3>
                      <div className="d-flex align-items-baseline">
                        <p className="text-danger">
                          <span>-2.8%</span>
                          <i data-feather="arrow-down" /*appFeatherIcon*/ className="icon-sm mb-1"></i>
                        </p>
                      </div>
                    </div>
                    <div className="col-6 col-md-12 col-xl-7">
                      <div className="mt-md-3 mt-xl-0">
                        {/* <apx-chart
                          series="ordersChartOptions.series"
                          chart="ordersChartOptions.chart"
                          colors="ordersChartOptions.colors"
                          plotOptions="ordersChartOptions.plotOptions"
                          xaxis="ordersChartOptions.xaxis"
                        ></apx-chart> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-baseline">
                    <h6 className="card-title mb-0">Growth</h6>
                    <div /*ngbDropdown*/ className="mb-2">
                      <button
                        /*ngbDropdownToggle*/
                        className="btn p-0 no-dropdown-toggle-icon"
                        type="button"
                        id="dropdownMenuButton2"
                      >
                        <i className="icon-lg text-muted pb-3px" data-feather="more-horizontal" /*appFeatherIcon*/></i>
                      </button>
                      <div /*ngbDropdownMenu*/ aria-labelledby="dropdownMenuButton2">
                        <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                          <i data-feather="eye" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                          <span className="">View</span>
                        </a>
                        <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                          <i data-feather="edit-2" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                          <span className="">Edit</span>
                        </a>
                        <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                          <i data-feather="trash" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                          <span className="">Delete</span>
                        </a>
                        <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                          <i data-feather="printer" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                          <span className="">Print</span>
                        </a>
                        <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                          <i data-feather="download" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                          <span className="">Download</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 col-md-12 col-xl-5">
                      <h3 className="mb-2">89.87%</h3>
                      <div className="d-flex align-items-baseline">
                        <p className="text-success">
                          <span>+2.8%</span>
                          <i data-feather="arrow-up" /*appFeatherIcon*/ className="icon-sm mb-1"></i>
                        </p>
                      </div>
                    </div>
                    <div className="col-6 col-md-12 col-xl-7">
                      <div className="mt-md-3 mt-xl-0">
                        {/* <apx-chart
                          series="growthChartOptions.series"
                          chart="growthChartOptions.chart"
                          colors="growthChartOptions.colors"
                          xaxis="growthChartOptions.xaxis"
                          stroke="growthChartOptions.stroke"
                          markers="growthChartOptions.markers"
                        ></apx-chart> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-xl-12 grid-margin stretch-card">
          <div className="card overflow-hidden">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-baseline mb-4 mb-md-3">
                <h6 className="card-title mb-0">Revenue</h6>
                <div /*ngbDropdown*/>
                  <button
                    /*ngbDropdownToggle*/
                    className="btn p-0 no-dropdown-toggle-icon"
                    type="button"
                    id="dropdownMenuButton3"
                  >
                    <i className="icon-lg text-muted pb-3px" data-feather="more-horizontal" /*appFeatherIcon*/></i>
                  </button>
                  <div /*ngbDropdownMenu*/ aria-labelledby="dropdownMenuButton3">
                    <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                      <i data-feather="eye" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                      <span className="">View</span>
                    </a>
                    <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                      <i data-feather="edit-2" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                      <span className="">Edit</span>
                    </a>
                    <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                      <i data-feather="trash" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                      <span className="">Delete</span>
                    </a>
                    <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                      <i data-feather="printer" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                      <span className="">Print</span>
                    </a>
                    <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                      <i data-feather="download" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                      <span className="">Download</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="row align-items-start">
                <div className="col-md-7">
                  <p className="text-muted tx-13 mb-3 mb-md-0">
                    Revenue is the income that a business has from its normal business activities, usually from the sale
                    of goods and services to customers.
                  </p>
                </div>
                <div className="col-md-5 d-flex justify-content-md-end">
                  <div className="btn-group mb-3 mb-md-0" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-outline-primary">
                      Today
                    </button>
                    <button type="button" className="btn btn-outline-primary d-none d-md-block">
                      Week
                    </button>
                    <button type="button" className="btn btn-primary">
                      Month
                    </button>
                    <button type="button" className="btn btn-outline-primary">
                      Year
                    </button>
                  </div>
                </div>
              </div>
              <div className="flot-wrapper">
                {/* <apx-chart
                  series="revenueChartOptions.series"
                  chart="revenueChartOptions.chart"
                  colors="revenueChartOptions.colors"
                  grid="revenueChartOptions.grid"
                  xaxis="revenueChartOptions.xaxis"
                  yaxis="revenueChartOptions.yaxis"
                  markers="revenueChartOptions.markers"
                  stroke="revenueChartOptions.stroke"
                ></apx-chart> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-7 col-xl-8 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-baseline mb-2">
                <h6 className="card-title mb-0">Monthly sales</h6>
                <div /*ngbDropdown*/ className="mb-2">
                  <button
                    /*ngbDropdownToggle*/
                    className="btn p-0 no-dropdown-toggle-icon"
                    type="button"
                    id="dropdownMenuButton4"
                  >
                    <i className="icon-lg text-muted pb-3px" data-feather="more-horizontal" /*appFeatherIcon*/></i>
                  </button>
                  <div /*ngbDropdownMenu*/ aria-labelledby="dropdownMenuButton4">
                    <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                      <i data-feather="eye" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                      <span className="">View</span>
                    </a>
                    <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                      <i data-feather="edit-2" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                      <span className="">Edit</span>
                    </a>
                    <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                      <i data-feather="trash" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                      <span className="">Delete</span>
                    </a>
                    <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                      <i data-feather="printer" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                      <span className="">Print</span>
                    </a>
                    <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                      <i data-feather="download" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                      <span className="">Download</span>
                    </a>
                  </div>
                </div>
              </div>
              <p className="text-muted">
                Sales are activities related to selling or the number of goods or services sold in a given time period.
              </p>
              {/* <apx-chart
                series="monthlySalesChartOptions.series"
                chart="monthlySalesChartOptions.chart"
                colors="monthlySalesChartOptions.colors"
                fill="monthlySalesChartOptions.fill"
                grid="monthlySalesChartOptions.grid"
                xaxis="monthlySalesChartOptions.xaxis"
                yaxis="monthlySalesChartOptions.yaxis"
                legend="monthlySalesChartOptions.legend"
                stroke="monthlySalesChartOptions.stroke"
                dataLabels="monthlySalesChartOptions.dataLabels"
                plotOptions="monthlySalesChartOptions.plotOptions"
              ></apx-chart> */}
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-xl-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-baseline mb-2">
                <h6 className="card-title mb-0">Cloud storage</h6>
                <div /*ngbDropdown*/ className="mb-2">
                  <button
                    /*ngbDropdownToggle*/
                    className="btn p-0 no-dropdown-toggle-icon"
                    type="button"
                    id="dropdownMenuButton5"
                  >
                    <i className="icon-lg text-muted pb-3px" data-feather="more-horizontal" /*appFeatherIcon*/></i>
                  </button>
                  <div /*ngbDropdownMenu*/ aria-labelledby="dropdownMenuButton5">
                    <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                      <i data-feather="eye" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                      <span className="">View</span>
                    </a>
                    <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                      <i data-feather="edit-2" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                      <span className="">Edit</span>
                    </a>
                    <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                      <i data-feather="trash" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                      <span className="">Delete</span>
                    </a>
                    <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                      <i data-feather="printer" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                      <span className="">Print</span>
                    </a>
                    <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                      <i data-feather="download" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                      <span className="">Download</span>
                    </a>
                  </div>
                </div>
              </div>
              {/* <apx-chart
                series="cloudStorageChartOptions.series"
                chart="cloudStorageChartOptions.chart"
                colors="cloudStorageChartOptions.colors"
                plotOptions="cloudStorageChartOptions.plotOptions"
                fill="cloudStorageChartOptions.fill"
                stroke="cloudStorageChartOptions.stroke"
                labels="cloudStorageChartOptions.labels"
              ></apx-chart> */}
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-end">
                  <div>
                    <label className="d-flex align-items-center justify-content-end tx-10 text-uppercase fw-bold">
                      Total storage <span className="p-1 ms-1 rounded-circle bg-secondary"></span>
                    </label>
                    <h5 className="fw-bolder mb-0 text-end">8TB</h5>
                  </div>
                </div>
                <div className="col-6">
                  <div>
                    <label className="d-flex align-items-center tx-10 text-uppercase fw-bold">
                      <span className="p-1 me-1 rounded-circle bg-primary"></span> Used storage
                    </label>
                    <h5 className="fw-bolder mb-0">~5TB</h5>
                  </div>
                </div>
              </div>
              <div className="d-grid">
                <button className="btn btn-primary">Upgrade storage</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-5 col-xl-4 grid-margin grid-margin-xl-0 stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-baseline mb-2">
                <h6 className="card-title mb-0">Inbox</h6>
                <div /*ngbDropdown*/ className="mb-2">
                  <button
                    /*ngbDropdownToggle*/
                    className="btn p-0 no-dropdown-toggle-icon"
                    type="button"
                    id="dropdownMenuButton6"
                  >
                    <i className="icon-lg text-muted pb-3px" data-feather="more-horizontal" /*appFeatherIcon*/></i>
                  </button>
                  <div /*ngbDropdownMenu*/ aria-labelledby="dropdownMenuButton6">
                    <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                      <i data-feather="eye" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                      <span className="">View</span>
                    </a>
                    <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                      <i data-feather="edit-2" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                      <span className="">Edit</span>
                    </a>
                    <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                      <i data-feather="trash" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                      <span className="">Delete</span>
                    </a>
                    <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                      <i data-feather="printer" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                      <span className="">Print</span>
                    </a>
                    <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                      <i data-feather="download" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                      <span className="">Download</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column">
                <a href="" className="d-flex align-items-center border-bottom pb-3">
                  <div className="me-3">
                    <img src="https://via.placeholder.com/35x35" className="rounded-circle wd-35" alt="user" />
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between">
                      <h6 className="text-body mb-2">Leonardo Payne</h6>
                      <p className="text-muted tx-12">12.30 PM</p>
                    </div>
                    <p className="text-muted tx-13">Hey! there I'm available...</p>
                  </div>
                </a>
                <a href="" className="d-flex align-items-center border-bottom py-3">
                  <div className="me-3">
                    <img src="https://via.placeholder.com/35x35" className="rounded-circle wd-35" alt="user" />
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between">
                      <h6 className="text-body mb-2">Carl Henson</h6>
                      <p className="text-muted tx-12">02.14 AM</p>
                    </div>
                    <p className="text-muted tx-13">I've finished it! See you so..</p>
                  </div>
                </a>
                <a href="" className="d-flex align-items-center border-bottom py-3">
                  <div className="me-3">
                    <img src="https://via.placeholder.com/35x35" className="rounded-circle wd-35" alt="user" />
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between">
                      <h6 className="text-body mb-2">Jensen Combs</h6>
                      <p className="text-muted tx-12">08.22 PM</p>
                    </div>
                    <p className="text-muted tx-13">This template is awesome!</p>
                  </div>
                </a>
                <a href="" className="d-flex align-items-center border-bottom py-3">
                  <div className="me-3">
                    <img src="https://via.placeholder.com/35x35" className="rounded-circle wd-35" alt="user" />
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between">
                      <h6 className="text-body mb-2">Amiah Burton</h6>
                      <p className="text-muted tx-12">05.49 AM</p>
                    </div>
                    <p className="text-muted tx-13">Nice to meet you</p>
                  </div>
                </a>
                <a href="" className="d-flex align-items-center border-bottom py-3">
                  <div className="me-3">
                    <img src="https://via.placeholder.com/35x35" className="rounded-circle wd-35" alt="user" />
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between">
                      <h6 className="text-body mb-2">Yaretzi Mayo</h6>
                      <p className="text-muted tx-12">01.19 AM</p>
                    </div>
                    <p className="text-muted tx-13">Hey! there I'm available...</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-7 col-xl-8 stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-baseline mb-2">
                <h6 className="card-title mb-0">Projects</h6>
                <div /*ngbDropdown*/ className="mb-2">
                  <button
                    /*ngbDropdownToggle*/
                    className="btn p-0 no-dropdown-toggle-icon"
                    type="button"
                    id="dropdownMenuButton7"
                  >
                    <i className="icon-lg text-muted pb-3px" data-feather="more-horizontal" /*appFeatherIcon*/></i>
                  </button>
                  <div /*ngbDropdownMenu*/ aria-labelledby="dropdownMenuButton7">
                    <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                      <i data-feather="eye" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                      <span className="">View</span>
                    </a>
                    <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                      <i data-feather="edit-2" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                      <span className="">Edit</span>
                    </a>
                    <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                      <i data-feather="trash" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                      <span className="">Delete</span>
                    </a>
                    <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                      <i data-feather="printer" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                      <span className="">Print</span>
                    </a>
                    <a /*ngbDropdownItem*/ className="d-flex align-items-center" href="">
                      <i data-feather="download" /*appFeatherIcon*/ className="icon-sm me-2"></i>{" "}
                      <span className="">Download</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th className="pt-0">#</th>
                      <th className="pt-0">Project Name</th>
                      <th className="pt-0">Start Date</th>
                      <th className="pt-0">Due Date</th>
                      <th className="pt-0">Status</th>
                      <th className="pt-0">Assign</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>NobleUI jQuery</td>
                      <td>01/01/2022</td>
                      <td>26/04/2022</td>
                      <td>
                        <span className="badge bg-danger">Released</span>
                      </td>
                      <td>Leonardo Payne</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>NobleUI Angular</td>
                      <td>01/01/2022</td>
                      <td>26/04/2022</td>
                      <td>
                        <span className="badge bg-success">Review</span>
                      </td>
                      <td>Carl Henson</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>NobleUI ReactJs</td>
                      <td>01/05/2022</td>
                      <td>10/09/2022</td>
                      <td>
                        <span className="badge bg-info">Pending</span>
                      </td>
                      <td>Jensen Combs</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>NobleUI VueJs</td>
                      <td>01/01/2022</td>
                      <td>31/11/2022</td>
                      <td>
                        <span className="badge bg-warning">Work in Progress</span>
                      </td>
                      <td>Amiah Burton</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>NobleUI Laravel</td>
                      <td>01/01/2022</td>
                      <td>31/12/2022</td>
                      <td>
                        <span className="badge bg-danger text-white">Coming soon</span>
                      </td>
                      <td>Yaretzi Mayo</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>NobleUI NodeJs</td>
                      <td>01/01/2022</td>
                      <td>31/12/2022</td>
                      <td>
                        <span className="badge bg-primary">Coming soon</span>
                      </td>
                      <td>Carl Henson</td>
                    </tr>
                    <tr>
                      <td className="border-bottom">3</td>
                      <td className="border-bottom">NobleUI EmberJs</td>
                      <td className="border-bottom">01/05/2022</td>
                      <td className="border-bottom">10/11/2022</td>
                      <td className="border-bottom">
                        <span className="badge bg-info">Pending</span>
                      </td>
                      <td className="border-bottom">Jensen Combs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
