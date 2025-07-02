import { Request, Response } from 'express';
import { OtpService } from '../services/otpService';
import { 
  GenerateOtpRequest, 
  ResendOtpRequest, 
  VerifyOtpRequest 
} from '../types';
import { phoneConfigs } from '../config/phoneConfig';

export class OtpController {
  private otpService: OtpService;
  
  constructor() {
    this.otpService = new OtpService();
  }
  
  /**
   * Generate OTP endpoint
   * POST /otp/generate
   */
  generateOtp = (req: Request, res: Response): void => {
    try {
      const request: GenerateOtpRequest = req.body;
      
      // Validate request
      if (!request.phone || !request.country) {
        res.status(400).json({
          success: false,
          error: {
            msg: 'Phone and country are required',
            code: 'MISSING_FIELDS'
          }
        });
        return;
      }
      
      const result = this.otpService.generateOtp(request);
      
      // Determine status code based on response
      if ('success' in result && !result.success) {
        // Check if it's a client error or server error based on phone number
        const phoneConfig = this.getPhoneConfig(request.phone, request.country);
        const statusCode = phoneConfig?.responseType === 'server_error' ? 500 : 400;
        res.status(statusCode).json(result);
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          msg: 'Internal server error',
          code: 'INTERNAL_ERROR'
        }
      });
    }
  };
  
  /**
   * Resend OTP endpoint
   * POST /otp/resend
   */
  resendOtp = (req: Request, res: Response): void => {
    try {
      const request: ResendOtpRequest = req.body;
      
      // Validate request
      if (!request.verification_id) {
        res.status(400).json({
          success: false,
          error: {
            msg: 'Verification ID is required',
            code: 'MISSING_VERIFICATION_ID'
          }
        });
        return;
      }
      
      const result = this.otpService.resendOtp(request);
      
      // Determine status code based on response
      if ('success' in result && !result.success) {
        // Check if it's a client error or server error based on verification ID
        const phoneConfig = this.getPhoneConfigByVerificationId(request.verification_id);
        const statusCode = phoneConfig?.responseType === 'server_error' ? 500 : 400;
        res.status(statusCode).json(result);
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          msg: 'Internal server error',
          code: 'INTERNAL_ERROR'
        }
      });
    }
  };
  
  /**
   * Verify OTP endpoint
   * POST /otp/verify
   */
  verifyOtp = (req: Request, res: Response): void => {
    try {
      const request: VerifyOtpRequest = req.body;
      
      // Validate request
      if (!request.otp || !request.verification_id) {
        res.status(400).json({
          success: false,
          error: {
            msg: 'OTP and verification ID are required',
            code: 'MISSING_FIELDS'
          }
        });
        return;
      }
      
      const result = this.otpService.verifyOtp(request);
      
      // Determine status code based on response
      if ('success' in result && !result.success) {
        // Check if it's a client error or server error based on verification ID
        const phoneConfig = this.getPhoneConfigByVerificationId(request.verification_id);
        const statusCode = phoneConfig?.responseType === 'server_error' ? 500 : 400;
        res.status(statusCode).json(result);
      } else {
        // Set session cookie for successful verification
        res.setHeader('Set-Cookie', `session_token=sid_123; HttpOnly; Path=/`);
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          msg: 'Internal server error',
          code: 'INTERNAL_ERROR'
        }
      });
    }
  };
  
  /**
   * Helper method to get phone configuration
   */
  private getPhoneConfig(phone: string, country: string) {
    return phoneConfigs.find(
      (config: any) => config.phone === phone && config.country === country
    );
  }
  
  /**
   * Helper method to get phone configuration by verification ID
   */
  private getPhoneConfigByVerificationId(verification_id: string) {
    return phoneConfigs.find(
      (config: any) => config.verification_id === verification_id
    );
  }
} 