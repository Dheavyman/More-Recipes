export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username already exist',
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Username required',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password required!',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already exist',
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email required!',
        },
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Firstname required!',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Lastname required!',
        },
      },
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Gender required!',
        },
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    getterMethods: {
      fullName() { return `${this.firstName} ${this.lastName}`; },
    },
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Recipe, {
          foreignKey: 'userId',
        });
        User.hasMany(models.Favorite, {
          foreignKey: 'userId',
        });
        User.hasMany(models.Vote, {
          foreignKey: 'userId',
        });
      }
    }
  });
  return User;
};
