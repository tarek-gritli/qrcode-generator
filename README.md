# qrcode-generator

Simple qrcode generator from URLs

## Features

- Generate QR codes from URLs
- Save QR codes as image files (PNG file)

## Installation

To install the `qrcode-generator`, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/tarek-gritli/qrcode-generator.git
   ```
2. Navigate to the project directory:
   ```sh
   cd qrcode-generator
   ```
3. Install the required dependencies:
   ```sh
   npm install
   ```
4. Create a .env file based on the .env.example file:

   ```sh
   cp .env.example .env
   ```

5. Configure the `.env` file with your settings.

## Usage

#### Development and Production

- **Development**: In development mode, the application creates a new directory called `bucket`, uploads the generated QR codes there and returns a URL in the response to access the file on the local server.
- **Production**: In production mode, the application uploads the generated QR codes to Filebase storage and provides a URL in the response to access those files.

#### Generating QR Codes

To generate a QR code, make a POST request to `/generate-qrcode` with the URL you want to encode. You can use Postman or any other tool to make the request.
Users are limited to 20 requests per 15 minutes but you can customize that.

## Live Demo

You can test the website [here](https://quick-qr-gen.netlify.app)
