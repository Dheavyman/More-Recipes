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
        isAlphanumeric: {
          args: true,
          msg: 'Username can only contain alphabets and numbers'
        }
      },
      set(val) {
        this.setDataValue('username', val.toLowerCase().trim());
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password required!',
        },
        len: {
          args: [6],
          msg: 'Password must be at least six characters'
        }
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
        isEmail: {
          args: true,
          msg: 'Invalid email address format'
        }
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
      set(val) {
        this.setDataValue('username', val.trim());
      }
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
      set(val) {
        this.setDataValue('username', val.trim());
      }
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: {
        args: true,
        msg: 'Phone number already exist',
      },
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
      fullName() {
        return `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`;
      },
    }
  });
  User.associate = (models) => {

  };
  return User;
};
