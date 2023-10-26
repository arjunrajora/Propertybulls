
const {
  Article,
  sequelize,
} = require('../db');

const { generateJWT, verifyJWT } = require('../utils/jwt');

const { NotFoundError, BadRequestError } = require('../utils/api-errors');


const doArticle = async ({ title, filename, content }) => {
  var image = filename;
  const combinedString = title + "-" + content;
  const article = await Article.create({
    image,
    title,
    content,
    url: combinedString,

  });
  return {
    Articleid: article.id,
  };
};


//View Article
const doGetArticle = async ({
  BadRequestError,
  Article,
}) => {
  const article = await Article.findAll({

    order: [["createdAt", "DESC"]],
  });
  if (article[0] == 0) throw new BadRequestError('Please try again later');
  return article;
};

// Update Article
const doUpdateArticle = async ({
  id,
  Article,
  BadRequestError,
  ArticleUpdateData,
  filename
}) => {

  var image = filename;
  const { title, content } = ArticleUpdateData;

  if (image != null) {
    const data = await Article.update({ ArticleUpdateData, title, content, image },
      {
        where: {
          id: id,
        },
      },
    );
    if (data[0] == 0) throw new BadRequestError('Id Not Match');
    return data[0];
  } else {
    const data = await Article.update({ ArticleUpdateData, title, content },
      {
        where: {
          id: id,
        },
      },
    );
    if (data[0] == 0) throw new BadRequestError('Id Not Match');
    return data[0];
  }

};

// Delete Article
const doDeleteArticle = async ({
  id,
  BadRequestError,
}) => {
  const data = await Article.destroy({
    where: {
      id: id,
    },
  });
  if (data == 0) throw new BadRequestError('Id Not Match');
  return data[0];
};

// Article View By Id
const doGetArticleById = async ({
  id,
}) => {
  const data = await Article.findOne({
    where: {
      id,
    },
  });
  return data;
};

// Update Article Status
const doUpdateArticleStatus = async ({
  id,
  Article,
  BadRequestError,
  status
}) => {
  const data = await Article.update({ status },
    {
      where: {
        id: id,
      },
    },
  );
  if (data[0] == 0) throw new BadRequestError('Please try again later');
  return data[0];
};

module.exports = {
  doArticle,
  doGetArticle,
  doUpdateArticle,
  doDeleteArticle,
  doGetArticleById,
  doUpdateArticleStatus
};

