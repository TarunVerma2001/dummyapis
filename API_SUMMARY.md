# Dummy OTP API - Project Summary

## 🎯 Project Overview

This is a complete TypeScript-based dummy API server that provides OTP generation, resending, and verification endpoints. The API is designed to return different HTTP status codes (2xx, 4xx, 5xx) based on specific phone numbers for testing purposes.

## 📁 Project Structure

```
dummyapis/
├── src/
│   ├── config/
│   │   └── phoneConfig.ts      # Phone number configurations
│   ├── controllers/
│   │   └── otpController.ts    # HTTP request handlers
│   ├── routes/
│   │   └── otpRoutes.ts        # API route definitions
│   ├── services/
│   │   └── otpService.ts       # Business logic
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces
│   ├── __tests__/
│   │   └── otp.test.ts        # Unit tests
│   └── index.ts               # Main application file
├── dist/                      # Compiled JavaScript files
├── package.json               # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── jest.config.js            # Jest test configuration
├── README.md                 # Comprehensive documentation
├── test-api.sh               # API testing script
└── .gitignore                # Git ignore rules
```

## 🚀 Quick Start

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
   npm run dev
   ```

4. **Test the APIs:**
   ```bash
   ./test-api.sh
   ```

## 📱 API Endpoints

### 1. Generate OTP
- **URL:** `POST /otp/generate`
- **Purpose:** Generate OTP for a phone number
- **Request:** `{ "phone": "9618902852", "country": "+91" }`
- **Response:** `{ "verification_id": "gvid_1243f" }`

### 2. Resend OTP
- **URL:** `POST /otp/resend`
- **Purpose:** Resend OTP using verification ID
- **Request:** `{ "verification_id": "gvid_1243f" }`
- **Response:** `{ "success": true }`

### 3. Verify OTP
- **URL:** `POST /otp/verify`
- **Purpose:** Verify OTP and get user details
- **Request:** `{ "otp": "1234", "verification_id": "gvid_1243f" }`
- **Response:** `{ "user_id": "uid_1243f", "payment_link": "pay_hjj" }`
- **Headers:** `Set-Cookie: session_token=sid_123`

## 🧪 Test Phone Numbers

| Phone Number | Country | Response Type | Status Code | Description |
|--------------|---------|---------------|-------------|-------------|
| 9618902852   | +91     | Success       | 200         | Returns verification_id |
| 9876543210   | +91     | Client Error  | 400         | Invalid phone error |
| 5555555555   | +1      | Server Error  | 500         | Internal server error |

## ✅ Features Implemented

- ✅ **TypeScript** with strict type checking
- ✅ **Express.js** with middleware (CORS, Helmet, Morgan)
- ✅ **Three OTP endpoints** as specified
- ✅ **Different response types** (2xx, 4xx, 5xx) based on phone numbers
- ✅ **Session cookie** setting on successful verification
- ✅ **Comprehensive error handling**
- ✅ **Unit tests** with Jest
- ✅ **API testing script**
- ✅ **Health check endpoint**
- ✅ **404 handler** for invalid endpoints
- ✅ **Request validation**
- ✅ **Proper HTTP status codes**

## 🔧 Development Commands

- `npm run build` - Build TypeScript to JavaScript
- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm test` - Run unit tests
- `./test-api.sh` - Test all API endpoints

## 📊 Test Results

All tests are passing:
- ✅ 15 unit tests passed
- ✅ All API endpoints working correctly
- ✅ Proper HTTP status codes returned
- ✅ Session cookies set correctly
- ✅ Error handling working as expected

## 🎉 Ready to Use

The project is fully functional and ready for use. The server runs on port 3000 and provides all the requested OTP functionality with proper error handling and different response types based on the phone numbers provided.

## 📝 Notes

- The API uses dummy data and doesn't actually send SMS
- OTP validation accepts any 4-digit number for success cases
- Session tokens are set as HttpOnly cookies
- All endpoints return proper JSON responses
- Error responses follow the specified format 