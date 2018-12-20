export class OAuthUser {
  user: User;
  credential: Credential;
  additionalUserInfo: AdditionalUserInfo;
  operationType: string;
}

export interface ProviderData {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  phoneNumber?: any;
  providerId: string;
}

export interface StsTokenManager {
  apiKey: string;
  refreshToken: string;
  accessToken: string;
  expirationTime: number;
}

export interface User {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  emailVerified: boolean;
  phoneNumber?: any;
  isAnonymous: boolean;
  providerData: ProviderData[];
  apiKey: string;
  appName: string;
  authDomain: string;
  stsTokenManager: StsTokenManager;
  redirectEventId?: any;
  lastLoginAt: string;
  createdAt: string;
}

export interface Credential {
  a?: any;
  idToken: string;
  accessToken: string;
  providerId: string;
  signInMethod: string;
}

export interface Profile {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  link: string;
  picture: string;
  gender: string;
  locale: string;
}

export interface AdditionalUserInfo {
  providerId: string;
  isNewUser: boolean;
  profile: Profile;
}
