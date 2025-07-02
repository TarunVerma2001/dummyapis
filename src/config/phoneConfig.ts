import { PhoneConfig } from '../types';

// Phone configurations for different response types
export const phoneConfigs: PhoneConfig[] = [
  {
    phone: '9618902852',
    country: '+91',
    responseType: 'success',
    verification_id: 'gvid_1243f',
    user_id: 'uid_1243f',
    payment_link: 'pay_hjj'
  },
  {
    phone: '9876543210',
    country: '+91',
    responseType: 'client_error',
    verification_id: 'gvid_error_400',
    user_id: 'uid_error_400'
  },
  {
    phone: '5555555555',
    country: '+1',
    responseType: 'server_error',
    verification_id: 'gvid_error_500',
    user_id: 'uid_error_500'
  }
];

// Error configurations
export const errorConfigs = {
  client_error: {
    msg: 'Invalid phone number or country code',
    code: 'INVALID_PHONE'
  },
  server_error: {
    msg: 'Internal server error occurred',
    code: 'INTERNAL_ERROR'
  },
  invalid_verification_id: {
    msg: 'Invalid verification ID',
    code: 'INVALID_VERIFICATION_ID'
  },
  invalid_otp: {
    msg: 'Invalid OTP provided',
    code: 'INVALID_OTP'
  },
  expired_otp: {
    msg: 'OTP has expired',
    code: 'OTP_EXPIRED'
  }
}; 