import { OtpService } from '../services/otpService';

describe('OtpService', () => {
  let otpService: OtpService;

  beforeEach(() => {
    otpService = new OtpService();
  });

  describe('generateOtp', () => {
    it('should return success response for valid phone number', () => {
      const request = {
        phone: '9618902852',
        country: '+91'
      };

      const result = otpService.generateOtp(request);

      expect(result).toEqual({
        verification_id: 'gvid_1243f'
      });
    });

    it('should return client error for specific phone number', () => {
      const request = {
        phone: '9876543210',
        country: '+91'
      };

      const result = otpService.generateOtp(request);

      expect(result).toEqual({
        success: false,
        error: {
          msg: 'Invalid phone number or country code',
          code: 'INVALID_PHONE'
        }
      });
    });

    it('should return server error for specific phone number', () => {
      const request = {
        phone: '5555555555',
        country: '+1'
      };

      const result = otpService.generateOtp(request);

      expect(result).toEqual({
        success: false,
        error: {
          msg: 'Internal server error occurred',
          code: 'INTERNAL_ERROR'
        }
      });
    });

    it('should return client error for unknown phone number', () => {
      const request = {
        phone: '1234567890',
        country: '+91'
      };

      const result = otpService.generateOtp(request);

      expect(result).toEqual({
        success: false,
        error: {
          msg: 'Invalid phone number or country code',
          code: 'INVALID_PHONE'
        }
      });
    });
  });

  describe('resendOtp', () => {
    it('should return success response for valid verification ID', () => {
      const request = {
        verification_id: 'gvid_1243f'
      };

      const result = otpService.resendOtp(request);

      expect(result).toEqual({
        success: true
      });
    });

    it('should return client error for specific verification ID', () => {
      const request = {
        verification_id: 'gvid_error_400'
      };

      const result = otpService.resendOtp(request);

      expect(result).toEqual({
        success: false,
        error: {
          msg: 'Invalid verification ID',
          code: 'INVALID_VERIFICATION_ID'
        }
      });
    });

    it('should return server error for specific verification ID', () => {
      const request = {
        verification_id: 'gvid_error_500'
      };

      const result = otpService.resendOtp(request);

      expect(result).toEqual({
        success: false,
        error: {
          msg: 'Internal server error occurred',
          code: 'INTERNAL_ERROR'
        }
      });
    });

    it('should return client error for unknown verification ID', () => {
      const request = {
        verification_id: 'unknown_id'
      };

      const result = otpService.resendOtp(request);

      expect(result).toEqual({
        success: false,
        error: {
          msg: 'Invalid verification ID',
          code: 'INVALID_VERIFICATION_ID'
        }
      });
    });
  });

  describe('verifyOtp', () => {
    it('should return success response for valid OTP and verification ID', () => {
      const request = {
        otp: '1234',
        verification_id: 'gvid_1243f',
        referral_code: 'test_code'
      };

      const result = otpService.verifyOtp(request);

      expect(result).toEqual({
        user_id: 'uid_1243f',
        payment_link: 'pay_hjj'
      });
    });

    it('should return success response without referral code', () => {
      const request = {
        otp: '1234',
        verification_id: 'gvid_1243f'
      };

      const result = otpService.verifyOtp(request);

      expect(result).toEqual({
        user_id: 'uid_1243f',
        payment_link: 'pay_hjj'
      });
    });

    it('should return client error for invalid OTP format', () => {
      const request = {
        otp: '12',
        verification_id: 'gvid_1243f'
      };

      const result = otpService.verifyOtp(request);

      expect(result).toEqual({
        success: false,
        error: {
          msg: 'Invalid OTP provided',
          code: 'INVALID_OTP'
        }
      });
    });

    it('should return client error for non-numeric OTP', () => {
      const request = {
        otp: 'abcd',
        verification_id: 'gvid_1243f'
      };

      const result = otpService.verifyOtp(request);

      expect(result).toEqual({
        success: false,
        error: {
          msg: 'Invalid OTP provided',
          code: 'INVALID_OTP'
        }
      });
    });

    it('should return client error for specific verification ID', () => {
      const request = {
        otp: '1234',
        verification_id: 'gvid_error_400'
      };

      const result = otpService.verifyOtp(request);

      expect(result).toEqual({
        success: false,
        error: {
          msg: 'Invalid OTP provided',
          code: 'INVALID_OTP'
        }
      });
    });

    it('should return server error for specific verification ID', () => {
      const request = {
        otp: '1234',
        verification_id: 'gvid_error_500'
      };

      const result = otpService.verifyOtp(request);

      expect(result).toEqual({
        success: false,
        error: {
          msg: 'Internal server error occurred',
          code: 'INTERNAL_ERROR'
        }
      });
    });

    it('should return client error for unknown verification ID', () => {
      const request = {
        otp: '1234',
        verification_id: 'unknown_id'
      };

      const result = otpService.verifyOtp(request);

      expect(result).toEqual({
        success: false,
        error: {
          msg: 'Invalid verification ID',
          code: 'INVALID_VERIFICATION_ID'
        }
      });
    });
  });
}); 