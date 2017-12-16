export default (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val) {
        this.setDataValue('title', val.trim());
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val) {
        this.setDataValue('description', val.trim());
      }
    },
    preparationTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    directions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipeImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    upvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    downvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    }
  });
  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    Recipe.hasMany(models.Review, {
      foreignKey: 'recipeId',
    });
    Recipe.hasMany(models.Favorite, {
      foreignKey: 'recipeId',
    });
  };
  return Recipe;
};
