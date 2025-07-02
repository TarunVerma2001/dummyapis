import { 
  GenerateOtpRequest, 
  GenerateOtpResponse, 
  ResendOtpRequest, 
  ResendOtpResponse, 
  VerifyOtpRequest, 
  VerifyOtpResponse,
  ErrorResponse 
} from '../types';
import { phoneConfigs, errorConfigs } from '../config/phoneConfig';

export class OtpService {
  
  /**
   * Generate OTP for a phone number
   */
  generateOtp(request: GenerateOtpRequest): GenerateOtpResponse | ErrorResponse {
    const { phone, country } = request;
    
    // Find phone configuration
    const phoneConfig = phoneConfigs.find(
      config => config.phone === phone && config.country === country
    );
    
    if (!phoneConfig) {
      return {
        success: false,
        error: errorConfigs.client_error
      };
    }
    
    // Return different responses based on phone configuration
    switch (phoneConfig.responseType) {
      case 'success':
        return {
          verification_id: phoneConfig.verification_id!
        };
      case 'client_error':
        return {
          success: false,
          error: errorConfigs.client_error
        };
      case 'server_error':
        return {
          success: false,
          error: errorConfigs.server_error
        };
      default:
        return {
          success: false,
          error: errorConfigs.server_error
        };
    }
  }
  
  /**
   * Resend OTP for a verification ID
   */
  resendOtp(request: ResendOtpRequest): ResendOtpResponse | ErrorResponse {
    const { verification_id } = request;
    
    // Find phone configuration by verification ID
    const phoneConfig = phoneConfigs.find(
      config => config.verification_id === verification_id
    );
    
    if (!phoneConfig) {
      return {
        success: false,
        error: errorConfigs.invalid_verification_id
      };
    }
    
    // Return different responses based on phone configuration
    switch (phoneConfig.responseType) {
      case 'success':
        return {
          success: true
        };
      case 'client_error':
        return {
          success: false,
          error: errorConfigs.invalid_verification_id
        };
      case 'server_error':
        return {
          success: false,
          error: errorConfigs.server_error
        };
      default:
        return {
          success: false,
          error: errorConfigs.server_error
        };
    }
  }
  
  /**
   * Verify OTP
   */
  verifyOtp(request: VerifyOtpRequest): VerifyOtpResponse | ErrorResponse {
    const { otp, verification_id, referral_code } = request;
    
    // Find phone configuration by verification ID
    const phoneConfig = phoneConfigs.find(
      config => config.verification_id === verification_id
    );
    
    if (!phoneConfig) {
      return {
        success: false,
        error: errorConfigs.invalid_verification_id
      };
    }
    
    // Validate OTP (dummy validation - any 4 digit number is valid for success cases)
    if (otp.length !== 4 || !/^\d{4}$/.test(otp)) {
      return {
        success: false,
        error: errorConfigs.invalid_otp
      };
    }
    
    // Return different responses based on phone configuration
    switch (phoneConfig.responseType) {
      case 'success':
        return {
          user_id: phoneConfig.user_id!,
          payment_link: phoneConfig.payment_link
        };
      case 'client_error':
        return {
          success: false,
          error: errorConfigs.invalid_otp
        };
      case 'server_error':
        return {
          success: false,
          error: errorConfigs.server_error
        };
      default:
        return {
          success: false,
          error: errorConfigs.server_error
        };
    }
  }
} 