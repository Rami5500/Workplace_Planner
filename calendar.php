<!DOCTYPE html>
<html lang="en">

<?php
session_start();

?>

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="My Final Year Project">
    <meta name="author" content="Rami Hassan">


    <title>Workplace Planner - Calendar</title>

    <!-- Custom fonts for this template-->
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link
        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">

    <!-- Custom styles for this template-->
    <link href="css/website.css" rel="stylesheet">
    <link href="css/sb-admin-2.min.css" rel="stylesheet">
    

</head>

<body id="page-top">

    <!-- Page Wrapper -->
    <div id="wrapper">

        <!-- Sidebar -->
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <!-- Sidebar - Brand -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="<?php echo ($_SESSION['role'] == 'manager') ? 'manager_dashboard.php' : 'dashboard.php'; ?>">
                <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-laugh-wink"></i>
                </div>
                <div class="sidebar-brand-text mx-3">Workplace Planner </div>
            </a>

            <!-- Divider -->
            <hr class="sidebar-divider my-0">

            <!-- Nav Item - Dashboard -->
            <li class="nav-item">
                <a class="nav-link" href="<?php echo ($_SESSION['role'] == 'manager') ? 'manager_dashboard.php' : 'dashboard.php'; ?>">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </a>
            </li>


            <!-- Divider -->
            <hr class="sidebar-divider">

            <li class="nav-item active">
                <a class="nav-link" href="calendar.php" aria-expanded="true">
                    <i class="fas fa-fw fa-chart-area"></i>
                    <span>Calendar</span></a>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider">

            <li class="nav-item">
                <a class="nav-link" href="timesheets.php">
                    <i class="fas fa-fw fa-chart-area"></i>
                    <span>Timesheets</span></a>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider">

            <li class="nav-item">
                <a class="nav-link" href="task_management.php">
                    <i class="fas fa-fw fa-chart-area"></i>
                    <span>Task Management</span></a>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider">
            
            <li class="nav-item">
                <a class="nav-link" href="#" data-toggle="modal" data-target="#logoutModal">
                    <i class="fas fa-fw fa-chart-area"></i>
                    <span>Logout</span></a>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider d-none d-md-block">

            <!-- Sidebar Toggler (Sidebar) -->
            <div class="text-center d-none d-md-inline">
                <button class="rounded-circle border-0" id="sidebarToggle"></button>
            </div>

        </ul>
        <!-- End of Sidebar -->
        

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">

                <!-- Topbar -->
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    <!-- Sidebar Toggle (Topbar) -->
                    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                        <i class="fa fa-bars"></i>
                    </button>

                    <!-- Page Heading -->
                    <h1 class="h3 mb-4 text-gray-800">Calendar</h1>

                    <!-- Topbar Navbar -->
                    <ul class="navbar-nav ml-auto">

                        <div class="topbar-divider d-none d-sm-block"></div>
                        <!--
                        https://www.geeksforgeeks.org/how-to-display-logged-in-user-information-in-php/
                        Used the above link to display the users name when they are logged in
                        -->

                        <!-- Nav Item - User Information -->
                        <li class="nav-item dropdown no-arrow">
                            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="mr-2 d-none d-lg-inline text-gray-600 small"><?php echo $_SESSION['first_name']; ?></span>
                                <img class="img-profile rounded-circle"
                                    src="img/undraw_profile.svg">
                            </a>
                            <!-- Dropdown - User Information -->
                            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="userDropdown">
                                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Logout
                                </a>
                            </div>
                        </li>

                    </ul>

                </nav>
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <div class="container-fluid">

                </div>
                <!-- /.container-fluid -->

                <!-- https://www.geeksforgeeks.org/how-to-create-a-dynamic-calendar-in-html-css-javascript/ -->

                <div class="wrapper">
                    <div class="centered-content">
                        <div class="calendar-header">
                            <h3 id="monthAndYear"></h3>
                            <div class="button-container-calendar">
                                <button id="previous" onclick="previous()">‹</button>
                                <button id="next" onclick="next()">›</button>
                            </div>
                        </div>
                        <div class="container-calendar" id="Center">
                            
                            <table class="table-calendar" id="calendar" data-lang="en">
                                <thead id="thead-month"></thead>
                                <!-- Table body for displaying the calendar -->
                                <tbody id="calendar-body"></tbody>
                            </table>
                            
                        </div>
                        <div class="footer-container-calendar">
                            <label for="month">Jump To: </label>
                            <!-- Dropdowns to select a specific month and year -->
                            <select id="month" onchange="jump()">
                                <option value=0>Jan</option>
                                <option value=1>Feb</option>
                                <option value=2>Mar</option>
                                <option value=3>Apr</option>
                                <option value=4>May</option>
                                <option value=5>Jun</option>
                                <option value=6>Jul</option>
                                <option value=7>Aug</option>
                                <option value=8>Sep</option>
                                <option value=9>Oct</option>
                                <option value=10>Nov</option>
                                <option value=11>Dec</option>
                            </select>
                            <!-- Dropdown to select a specific year -->
                            <select id="year" onchange="jump()"></select>
                            <button id="openAddEventPopup" onclick="openAddEventPopup()">Add Event</button>
                        </div>
                    </div>
                </div>
                

                <!-- Add Event Modal -->
                <div id="addEventModal" class="modal">
                    <div class="modal-content">
                        <span class="close" onclick="closeAddEventPopup()">&times;</span>
                            <h1>Add Event</h1>
                            <div id="event-section">
                                <form id="addEventForm" method="post" action="php/events.php">
                                    <input type="date" name="eventDate" id="eventDate">
                                    <input type="text" name="eventTitle" id="eventTitle" placeholder="Event Title">
                                    <input type="text" name="eventDescription" id="eventDescription" placeholder="Event Description">
                                    <button type="submit" name="addEvent" id="addEventButton" onclick="addEvent()">Add</button>
                                </form> 
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <footer class="sticky-footer bg-white">
                    <div class="container my-auto">
                        <div class="copyright text-center my-auto">
                            <span>Copyright &copy; Workplace planner 2024</span>
                        </div>
                    </div>
                </footer>
                <!-- End of Footer -->

            </div>
            <!-- End of Main Content -->

            


        </div>
        <!-- End of Content Wrapper -->

        

    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>

    <!-- Logout Modal-->
    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a class="btn btn-primary" href="user_login.php">Logout</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap core JavaScript-->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Core plugin JavaScript-->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom scripts for all pages-->
    <script src="js/sb-admin-2.min.js"></script>
    <script src="js/calendar.js"></script>


</body>

</html>