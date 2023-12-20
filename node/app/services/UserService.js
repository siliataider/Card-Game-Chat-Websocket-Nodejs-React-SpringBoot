class UserService {
    constructor() {
        console.log("user service");
    }

    getAllUsers = async () => {
        try {
          const response = await fetch('http://localhost:80/users');
          if (!response.ok) {
            throw new Error('Failed to fetch all users');
          }
          const users = await response.json();
          console.log(users);
        } catch (error) {
          console.error('Erreur lors de la récupération des données GET:', error);
        }
      };
}

module.exports = UserService;