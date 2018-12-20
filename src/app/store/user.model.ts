import { OAuthUser } from './oauth-user.model';

export class User {
  id?: string;
  email?: string;
  name?: string;
  surname?: string;
  cellphone?: string;
  photoUrl?: string;
  androidToken?: string;

  public static fromOAuthResponse(oauthUser: OAuthUser): User {
    const user: User = new User();
    user.id = oauthUser.user.uid;
    user.email = oauthUser.user.email;
    user.name = oauthUser.additionalUserInfo.profile.name;
    user.surname = oauthUser.additionalUserInfo.profile.family_name;
    user.cellphone = oauthUser.user.phoneNumber;
    user.photoUrl = oauthUser.user.photoURL;
    user.androidToken = oauthUser.credential.accessToken;
    return user;
  }
}
export class Driver extends User {
  carMake: string;
  carModel: string;
  carYear: number;
  carRegistration: string;
}
