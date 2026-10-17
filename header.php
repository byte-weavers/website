<?php
$fileName = basename($_SERVER['REQUEST_URI'], '?' . $_SERVER['QUERY_STRING']);
$headerClass = '';
if($fileName == 'contact-us.php') {
    $headerClass = 'header-dark';
}
?>
<!DOCTYPE html>
<html lang="eng" class="no-js">
<head>
    <meta charset="utf-8" />
    <title>Byte Weavers Web Design and Development Agency</title>
    <meta name="description" content="Creative Agency, Marketing Agency">
    <meta name="keywords" content="Creative Agency, Marketing Agency">
    <meta name="author" content="rajesh-doot">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="theme-color" content="#e8f1ff">
    <!--Website-favicon-->
    <link href="images/favicon.png" rel="icon">
    <!--Plugin-css-->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/plugin.min.css" rel="stylesheet">
    <link href="css/all.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <!-- Template-style-->
    <link href="css/style.css" rel="stylesheet">
    <link href="css/responsive.css" rel="stylesheet">
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-06EK18JEPJ"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-06EK18JEPJ');
    </script>

</head>
<body>
<!--Start Preloader -->
<div class="onloadpage" id="page-load">
    <div class="loader-div">
        <div class="on-img"><img src="images/loader.gif" alt="Logo" class="img-fluid" /><span>Loading Please Wait...</span></div>
    </div>
</div>
<!--End Preloader -->
<!--Start Header-->

<header class="ree-header fixed-top">
    <div class="container-fluid m-p-l-r-0">
        <div class="menu-header">
            <div class="menu-logo">
                <div class="dskt-logo"><a class="nav-brand" href="./">	<img src="images/logo.png" alt="Logo" class="ree-logo" /> </a> </div>
            </div>
            <div class="ree-nav" role="navigation">
                <ul class="nav-list">
                    <li class="megamenu">
                        <a href="./" class="menu-links">Home</a>
                    </li>
                    <li class="megamenu">
                        <a href="about.php" class="menu-links">About Us</a>
                    </li>
                    <li class="megamenu">
                        <a href="services.php" class="menu-links">Services</a>
                    </li>
                    <li class="megamenu">
                        <a href="training.php" class="menu-links">Training</a>
                    </li>
                    <li class="megamenu mega-small">
                        <a href="portfolio.php"  class="menu-links">Portfolio</a>
                    </li>
                    <li class="megamenu mega-small">
                        <a href="blogs.php"  class="menu-links">Blogs</a>
                    </li>
                    <li class="megamenu mega-small">
                        <a href="contact-us.php"  class="menu-links">Contact Us</a>
                    </li>
                </ul>
            </div>
            <div class="ree-nav-cta">
                <ul>
                    <li><a href="contact-us.php" class="ree-btn ree-btn0 ree-btn-grdt2"> Request Quote</a> </li>
                </ul>
            </div>
            <div class="mobile-menu2">
                <ul class="mob-nav2">
                    <li><a href="contact-us.php" class="ree-btn2 ree-btn-grdt1"><i class="fas fa-envelope-open-text"></i></a></li>
                    <li class="navm-"><a class="toggle" href="#"> <span></span> </a> </li>
                </ul>
            </div>
            <!-- mobile Nav -->
            <nav id="main-nav">
                <ul>
                    <li><a href="./">Home</a></li>
                    <li><a href="about.php">About Us</a></li>
                    <li><a href="services.php">Services</a></li>
                    <li><a href="portfolio.php">Portfolio</a></li>
                    <li><a href="blogs.php">Blogs</a> </li>
                    <li><a href="contact-us.php">Contact Page</a></li>
                </ul>
                <ul class="bottom-nav">
                    <li class="ree-hc">
                        <a href="tel:+919924880997" rel="noreferrer" target="_blank">
                            <svg version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 25.625 25.625" style="enable-background:new 0 0 25.625 25.625;" xml:space="preserve">
                    <g>
                        <path d="M22.079,17.835c-1.548-1.324-3.119-2.126-4.648-0.804l-0.913,0.799 c-0.668,0.58-1.91,3.29-6.712-2.234C5.005,10.079,7.862,9.22,8.531,8.645l0.918-0.8c1.521-1.325,0.947-2.993-0.15-4.71l-0.662-1.04  C7.535,0.382,6.335-0.743,4.81,0.58L3.986,1.3C3.312,1.791,1.428,3.387,0.971,6.419c-0.55,3.638,1.185,7.804,5.16,12.375
                        c3.97,4.573,7.857,6.87,11.539,6.83c3.06-0.033,4.908-1.675,5.486-2.272l0.827-0.721c1.521-1.322,0.576-2.668-0.973-3.995 L22.079,17.835z" />
                    </g>
                  </svg>
                        </a>
                    </li>
                    <li class="ree-hc">
                        <a href="mailto:sales@byte-weavers.com" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                <path d="M0 0h24v24H0z" fill="none" />
                            </svg>
                        </a>
                    </li>
                    <li class="ree-hc">
                        <a href="skype:live:.cid.935503ab957072c9?chat" rel="noreferrer" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M424.7 299.8c2.9-14 4.7-28.9 4.7-43.8 0-113.5-91.9-205.3-205.3-205.3-14.9 0-29.7 1.7-43.8 4.7C161.3 40.7 137.7 32 112 32 50.2 32 0 82.2 0 144c0 25.7 8.7 49.3 23.3 68.2-2.9 14-4.7 28.9-4.7 43.8 0 113.5 91.9 205.3 205.3 205.3 14.9 0 29.7-1.7 43.8-4.7 19 14.6 42.6 23.3 68.2 23.3 61.8 0 112-50.2 112-112 .1-25.6-8.6-49.2-23.2-68.1zm-194.6 91.5c-65.6 0-120.5-29.2-120.5-65 0-16 9-30.6 29.5-30.6 31.2 0 34.1 44.9 88.1 44.9 25.7 0 42.3-11.4 42.3-26.3 0-18.7-16-21.6-42-28-62.5-15.4-117.8-22-117.8-87.2 0-59.2 58.6-81.1 109.1-81.1 55.1 0 110.8 21.9 110.8 55.4 0 16.9-11.4 31.8-30.3 31.8-28.3 0-29.2-33.5-75-33.5-25.7 0-42 7-42 22.5 0 19.8 20.8 21.8 69.1 33 41.4 9.3 90.7 26.8 90.7 77.6 0 59.1-57.1 86.5-112 86.5z" />
                            </svg>
                        </a>
                    </li>
                    <li class="ree-hc">
                        <a href="https://wa.me/+919924880997" rel="noreferrer" target="_blank">
                            <svg version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"	style="enable-background:new 0 0 512 512;" xml:space="preserve">
                    <g>
                        <path d="M256.064,0h-0.128C114.784,0,0,114.816,0,256c0,56,18.048,107.904,48.736,150.048l-31.904,95.104l98.4-31.456 C155.712,496.512,204,512,256.064,512C397.216,512,512,397.152,512,256S397.216,0,256.064,0z M405.024,361.504 c-6.176,17.44-30.688,31.904-50.24,36.128c-13.376,2.848-30.848,5.12-89.664-19.264C189.888,347.2,141.44,270.752,137.664,265.792
                        c-3.616-4.96-30.4-40.48-30.4-77.216s18.656-54.624,26.176-62.304c6.176-6.304,16.384-9.184,26.176-9.184 c3.168,0,6.016,0.16,8.576,0.288c7.52,0.32,11.296,0.768,16.256,12.64c6.176,14.88,21.216,51.616,23.008,55.392 c1.824,3.776,3.648,8.896,1.088,13.856c-2.4,5.12-4.512,7.392-8.288,11.744c-3.776,4.352-7.36,7.68-11.136,12.352 c-3.456,4.064-7.36,8.416-3.008,15.936c4.352,7.36,19.392,31.904,41.536,51.616c28.576,25.44,51.744,33.568,60.032,37.024 c6.176,2.56,13.536,1.952,18.048-2.848c5.728-6.176,12.8-16.416,20-26.496c5.12-7.232,11.584-8.128,18.368-5.568 c6.912,2.4,43.488,20.48,51.008,24.224c7.52,3.776,12.48,5.568,14.304,8.736C411.2,329.152,411.2,344.032,405.024,361.504z"/>
                    </g>
                  </svg>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</header>
<!-- Header End -->
