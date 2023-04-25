<!DOCTYPE html>
<html lang="es">

<head>
@include('head')

<body>

  <!-- ======= Header ======= -->
  @include('header')

  <!-- ======= Hero Section ======= -->
  @include('hero')

  <main id="main">

    <!-- ======= Clients Section ======= -->
    @include('clients')

    <!-- ======= About Us Section ======= -->
    @include('about_us')

    <!-- ======= Why Us Section ======= -->
    @include('why_us')

    <!-- ======= Skills Section ======= -->
    @include('skills')

    <!-- ======= Services Section ======= -->
    @include('services')

    <!-- ======= Cta Section ======= -->
    @include('cta')

    <!-- ======= Portfolio Section ======= -->
    @include('portfolio')

    <!-- ======= Team Section ======= -->
    @include('team')

    <!-- ======= Pricing Section ======= -->
    @include('pricing')

    <!-- ======= Frequently Asked Questions Section ======= -->
    @include('faq')

    <!-- ======= Contact Section ======= -->
    @include('contact')

  </main><!-- End #main -->

  <!-- ======= Footer ======= -->
  @include('footer')

  <div id="preloader"></div>
  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <!-- Vendor JS Files -->
  @include('js_files')

</body>

</html>