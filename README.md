<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/agungksidik/laravel9-inertiajs-reactjs-starter">
    <img src="https://raw.githubusercontent.com/agungksidik/public-assets/master/logo/laravel-logo.png" alt="Logo" width="90" height="90">
  </a>
  <a href="https://github.com/agungksidik/laravel9-inertiajs-reactjs-starter">
    <img src="https://raw.githubusercontent.com/agungksidik/public-assets/master/logo/inertiajs-logo.png" alt="Logo" width="90" height="90">
  </a>
  <a href="https://github.com/agungksidik/laravel9-inertiajs-reactjs-starter">
    <img src="https://raw.githubusercontent.com/agungksidik/public-assets/master/logo/reactjs-logo.png" alt="Logo" width="90" height="90">
  </a>

<h3 align="center">Laravel Inertia ReactJs Starter</h3>

  <p align="center">
    This is a starter code to start the project, which already includes multiple layout admin templates with login for authentication
    <br />
    <a href="https://github.com/agungksidik/laravel9-inertiajs-reactjs-starter"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/agungksidik/laravel9-inertiajs-reactjs-starter">View Demo</a>
    ·
    <a href="https://github.com/agungksidik/laravel9-inertiajs-reactjs-starter/issues">Report Bug</a>
    ·
    <a href="https://github.com/agungksidik/laravel9-inertiajs-reactjs-starter/issues">Request Feature</a>
  </p>
</div>


### Installation

1. Clone the repo
   ```sh
   git clone 
   ```
2. Install dependency Laravel
   ```sh
   composer install
   ```
3. Install NPM packages
   ```sh
   npm install
   npm run dev
   ```
4. Create table corresponds to .env
    ```js    
    DB_DATABASE=yourdatabase_name
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
   ```
5. Run migration & Seeder
   ```sh
   php artisan migrate --seed
   ```
6. Google Sign In (Insert to your .env)
   ```sh
    GOOGLE_CLIENT_ID='your_client_id'
    GOOGLE_CLIENT_SECRET='your_client_secret'
    GOOGLE_REDIRECT='your_callback_url'
   ```
<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

1. run server-side (Laravel)
   ```sh
   php artisan serve
   ```
2. See webpack.min js 
   ```sh
   mix.browserSync('your_url.test'); //if using Laravel Valet
   mix.browserSync('127.0.0.1:8000'); //if using artisan serve
   ```
3. run client-side (ReactJs)
   ```sh
   npm run hot
   ```
4. Default password
   ```sh
   setup in UserFactory
   default '123456'
   ```
## LIB DE PDF 
composer require barryvdh/laravel-dompdf
php artisan vendor:publish --provider="Barryvdh\DomPDF\ServiceProvider"
