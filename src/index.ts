import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import otpRoutes from './routes/otpRoutes';
import fs from 'fs';
import https from 'https';

const app = express();
const PORT = process.env.PORT || 80;

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://api-gateway.stg.infra.servicegtd.com/', 'https://api-gateway.stg.infra.servicegtd.com/'], // Allow localhost:5173
  credentials: true, // Allow credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth/otp', otpRoutes);

// Health check endpoint
app.get('/auth/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Dummy OTP API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handle
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      msg: 'Endpoint not found',
      code: 'NOT_FOUND'
    }
  });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: {
      msg: 'Internal server error',
      code: 'INTERNAL_ERROR'
    }
  });
});

// HTTPS options using Certbot certificates

// Start HTTPS server
app.listen(PORT, () => {
  console.log(`🚀 Dummy OTP API HTTPS server running on port ${PORT}`);
  console.log(`📱 Available endpoints:`);
  console.log(`   POST /auth/otp/send - Generate OTP`);
  console.log(`   POST /auth/otp/resend - Resend OTP`);
  console.log(`   POST /auth/otp/verify - Verify OTP`);
  console.log(`   GET  /auth/health - Health check`);
  console.log(`\n📋 Test phone numbers:`);
  console.log(`   Success (200): 9618902852 (+91)`);
  console.log(`   Client Error (400): 9876543210 (+91)`);
  console.log(`   Server Error (500): 5555555555 (+1)`);
});

export default app; 