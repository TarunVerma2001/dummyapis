# Dummy OTP APIs

A TypeScript-based dummy API server that provides OTP generation, resending, and verification endpoints for testing purposes.

## Features

- ✅ Generate OTP for phone numbers
- ✅ Resend OTP using verification ID
- ✅ Verify OTP with session token
- ✅ Different response types (2xx, 4xx, 5xx) based on phone numbers
- ✅ TypeScript with proper type safety
- ✅ Express.js with middleware (CORS, Helmet, Morgan)
- ✅ Comprehensive error handling

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Start the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on port 3000 (or the PORT environment variable).

## API Endpoints

### 1. Generate OTP
**POST** `/otp/generate`

**Request Body:**
```json
{
  "phone": "9618902852",
  "country": "+91"
}
```

**Response 200:**
```json
{
  "verification_id": "gvid_1243f"
}
```

**Response 4XX/5XX:**
```json
{
  "success": false,
  "error": {
    "msg": "Invalid phone number or country code",
    "code": "INVALID_PHONE"
  }
}
```

### 2. Resend OTP
**POST** `/otp/resend`

**Request Body:**
```json
{
  "verification_id": "gvid_1243f"
}
```

**Response 200:**
```json
{
  "success": true
}
```

**Response 4XX/5XX:**
```json
{
  "success": false,
  "error": {
    "msg": "Invalid verification ID",
    "code": "INVALID_VERIFICATION_ID"
  }
}
```

### 3. Verify OTP
**POST** `/otp/verify`

**Request Body:**
```json
{
  "otp": "1234",
  "verification_id": "gvid_1243f",
  "referral_code": "code" // optional
}
```

**Response 200:**
```json
{
  "user_id": "uid_1243f",
  "payment_link": "pay_hjj" // optional
}
```

**Response Headers:**
```
Set-Cookie: session_token=sid_123
```

**Response 4XX/5XX:**
```json
{
  "success": false,
  "error": {
    "msg": "Invalid OTP provided",
    "code": "INVALID_OTP"
  }
}
```

## Test Phone Numbers

The API is configured to return different response types based on the phone number:

| Phone Number | Country | Response Type | Status Code |
|--------------|---------|---------------|-------------|
| 9618902852   | +91     | Success       | 200         |
| 9876543210   | +91     | Client Error  | 400         |
| 5555555555   | +1      | Server Error  | 500         |

## Testing

### Using curl

1. **Generate OTP (Success):**
   ```bash
   curl -X POST http://localhost:3000/otp/generate \
     -H "Content-Type: application/json" \
     -d '{"phone": "9618902852", "country": "+91"}'
   ```

2. **Generate OTP (Client Error):**
   ```bash
   curl -X POST http://localhost:3000/otp/generate \
     -H "Content-Type: application/json" \
     -d '{"phone": "9876543210", "country": "+91"}'
   ```

3. **Generate OTP (Server Error):**
   ```bash
   curl -X POST http://localhost:3000/otp/generate \
     -H "Content-Type: application/json" \
     -d '{"phone": "5555555555", "country": "+1"}'
   ```

4. **Resend OTP:**
   ```bash
   curl -X POST http://localhost:3000/otp/resend \
     -H "Content-Type: application/json" \
     -d '{"verification_id": "gvid_1243f"}'
   ```

5. **Verify OTP:**
   ```bash
   curl -X POST http://localhost:3000/otp/verify \
     -H "Content-Type: application/json" \
     -d '{"otp": "1234", "verification_id": "gvid_1243f"}'
   ```

### Using Postman

Import the following collection:

```json
{
  "info": {
    "name": "Dummy OTP API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Generate OTP - Success",
      "request": {
        "method": "POST",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\"phone\": \"9618902852\", \"country\": \"+91\"}"
        },
        "url": "http://localhost:3000/otp/generate"
      }
    },
    {
      "name": "Generate OTP - Client Error",
      "request": {
        "method": "POST",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\"phone\": \"9876543210\", \"country\": \"+91\"}"
        },
        "url": "http://localhost:3000/otp/generate"
      }
    },
    {
      "name": "Generate OTP - Server Error",
      "request": {
        "method": "POST",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\"phone\": \"5555555555\", \"country\": \"+1\"}"
        },
        "url": "http://localhost:3000/otp/generate"
      }
    }
  ]
}
```

## Project Structure

```
src/
├── config/
│   └── phoneConfig.ts      # Phone number configurations
├── controllers/
│   └── otpController.ts    # HTTP request handlers
├── routes/
│   └── otpRoutes.ts        # API route definitions
├── services/
│   └── otpService.ts       # Business logic
├── types/
│   └── index.ts           # TypeScript interfaces
└── index.ts               # Main application file
```

## Development

- **Build:** `npm run build`
- **Dev mode:** `npm run dev`
- **Start:** `npm start`
- **Test:** `npm test`

## Environment Variables

- `PORT` - Server port (default: 3000)

## License

ISC # dummyapis
