import IUsuario from '../../Interfaces/IUsuario';

class UserSingleton {
  private static instance: UserSingleton;
  private user: IUsuario | null;

  private constructor() {
    this.user = null; 
  }

  static getInstance(): UserSingleton {
    if (!UserSingleton.instance) {
      UserSingleton.instance = new UserSingleton();
    }
    return UserSingleton.instance;
  }

  setUser(user: IUsuario | null) {
    this.user = user;
  }

  getUser(): IUsuario | null {
    return this.user;
  }
}

const userSingleton = UserSingleton.getInstance();
export default userSingleton;
