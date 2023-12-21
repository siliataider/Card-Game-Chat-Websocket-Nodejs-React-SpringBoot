class UserService {
    constructor() {
    }

    getAllUsers = async () => {
        try {
          const response = await fetch('http://localhost:80/users');
          if (!response.ok) {
            throw new Error('Failed to fetch all users');
          }
          const users = await response.json();
        } catch (error) {
          console.error('Erreur lors de la récupération des données GET:', error);
        }
      };

    getUser = async (userId) => {
      try {
        const response = await fetch(`http://localhost:80/user/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }
        const user = await response.json();
        return user
      } catch (error) {
        console.error('Erreur lors de la récupération des données GET:', error);
      }
    };

    updateUser = async (user) => {
      try {
          const response = await fetch(`http://localhost:80/user/${user.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(user),
            });
      
          if (!response.ok) {
              throw new Error(`Failed to update user ${user.login}`);
          }
          const users = await response.json();
      } catch (error) {
          console.error("Erreur lors de l'update de l'utilisateur:", error);
      }
    }
}

class SingletonUser {

  constructor() {
      if (!SingletonUser.instance) {
        SingletonUser.instance = new UserService();
      }
  }

  getInstance() {
      return SingletonUser.instance;
  }

}

module.exports = SingletonUser;