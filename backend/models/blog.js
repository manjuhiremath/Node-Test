const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const Comment = require('./comment');
const Blog = sequelize.define('blog', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

Blog.hasMany(Comment, { onDelete: 'CASCADE' });  
Comment.belongsTo(Blog);
module.exports = Blog;