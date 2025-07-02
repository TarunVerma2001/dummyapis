import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import otpRoutes from './routes/otpRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/otp', otpRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Dummy OTP API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
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

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Dummy OTP API server running on port ${PORT}`);
  console.log(`📱 Available endpoints:`);
  console.log(`   POST /otp/generate - Generate OTP`);
  console.log(`   POST /otp/resend - Resend OTP`);
  console.log(`   POST /otp/verify - Verify OTP`);
  console.log(`   GET  /health - Health check`);
  console.log(`\n📋 Test phone numbers:`);
  console.log(`   Success (200): 9618902852 (+91)`);
  console.log(`   Client Error (400): 9876543210 (+91)`);
  console.log(`   Server Error (500): 5555555555 (+1)`);
});

export default app; 