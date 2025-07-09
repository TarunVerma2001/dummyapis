import { Router } from 'express';
import { OtpController } from '../controllers/otpController';

const router = Router();
const otpController = new OtpController();

// OTP routes
router.post('/send', otpController.generateOtp);
router.post('/resend', otpController.resendOtp);
router.post('/verify', otpController.verifyOtp);

export default router; 