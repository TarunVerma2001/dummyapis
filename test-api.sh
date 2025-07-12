#!/bin/bash

echo "🚀 Testing Dummy OTP API"
echo "=========================="

BASE_URL="http://localhost:3000"

echo ""
echo "1. Testing Generate OTP - Success Case (200)"
echo "---------------------------------------------"
curl -X POST $BASE_URL/otp/generate \
  -H "Content-Type: application/json" \
  -d '{"phone": "9618902852", "country": "+91"}' \
  -w "\nHTTP Status: %{http_code}\n"

echo ""
echo "2. Testing Generate OTP - Client Error Case (400)"
echo "--------------------------------------------------"
curl -X POST $BASE_URL/otp/generate \
  -H "Content-Type: application/json" \
  -d '{"phone": "9876543210", "country": "+91"}' \
  -w "\nHTTP Status: %{http_code}\n"

echo ""
echo "3. Testing Generate OTP - Server Error Case (500)"
echo "--------------------------------------------------"
curl -X POST $BASE_URL/otp/generate \
  -H "Content-Type: application/json" \
  -d '{"phone": "5555555555", "country": "+1"}' \
  -w "\nHTTP Status: %{http_code}\n"

echo ""
echo "4. Testing Resend OTP - Success Case (200)"
echo "-------------------------------------------"
curl -X POST $BASE_URL/otp/resend \
  -H "Content-Type: application/json" \
  -d '{"verification_id": "gvid_1243f"}' \
  -w "\nHTTP Status: %{http_code}\n"

echo ""
echo "5. Testing Resend OTP - Client Error Case (400)"
echo "------------------------------------------------"
curl -X POST $BASE_URL/otp/resend \
  -H "Content-Type: application/json" \
  -d '{"verification_id": "gvid_error_400"}' \
  -w "\nHTTP Status: %{http_code}\n"

echo ""
echo "6. Testing Verify OTP - Success Case (200)"
echo "-------------------------------------------"
curl -X POST $BASE_URL/otp/verify \
  -H "Content-Type: application/json" \
  -d '{"otp": "1234", "verification_id": "gvid_1243f", "referral_code": "test123"}' \
  -w "\nHTTP Status: %{http_code}\n" \
  -s | head -1

echo ""
echo "7. Testing Verify OTP - Invalid OTP Case (400)"
echo "-----------------------------------------------"
curl -X POST $BASE_URL/otp/verify \
  -H "Content-Type: application/json" \
  -d '{"otp": "abcd", "verification_id": "gvid_1243f"}' \
  -w "\nHTTP Status: %{http_code}\n"

echo ""
echo "8. Testing Health Check (200)"
echo "-----------------------------"
curl $BASE_URL/auth/health \
  -w "\nHTTP Status: %{http_code}\n"

echo ""
echo "9. Testing Invalid Endpoint (404)"
echo "----------------------------------"
curl $BASE_URL/invalid \
  -w "\nHTTP Status: %{http_code}\n"

echo ""
echo "✅ All tests completed!" 