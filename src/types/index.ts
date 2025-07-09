// Request types
export interface GenerateOtpRequest {
  number: string;
  country_code: string;
}

export interface ResendOtpRequest {
  verification_id: string;
}

export interface VerifyOtpRequest {
  otp: string;
  verification_id: string;
  referral_code?: string;
}

// Response types
export interface GenerateOtpResponse {
  verification_id: string;
}

export interface ResendOtpResponse {
  success: boolean;
}

export interface VerifyOtpResponse {
  user_id: string;
  payment_link?: string;
}

export interface ErrorResponse {
  success: false;
  error: {
    msg: string;
    code: string;
  };  
}

// Phone number configurations for different responses
export interface PhoneConfig {
  number: string;
  country_code: string;
  responseType: 'success' | 'client_error' | 'server_error';
  verification_id?: string;
  user_id?: string;
  payment_link?: string;
} 