const errors = require("../const/errors");
const successMessages = require("../const/successMessages");
const models = require("../database/models/index");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const clients = await models.clients.findAll();

      res.json({
        success: true,
        data: clients,
      });
    } catch (err) {
      next(err);
    }
  },
  getUser: async (req, res, next) => {
    try { 
      const clients = await models.clients.findOne({
        where: {
          id: req.params.userId,
        },
      });

      if (!clients) return next(errors.ClientNotFound);

      res.json({
        success: true,
        data: clients,
      });
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    const { name, email } = req.body;

    try {
      const isRegistered = await models.clients.findOne({
        where: {
          email: email,
        },
        paranoid: false,
      });

      if (isRegistered) {
        if (isRegistered.deletedAt) {
          await isRegistered.update({
            name: name,
          });
          await isRegistered.restore();

          return res.json({
            success: true,
            message: successMessages.USER_RESTORED_SUCCESSFULLY,
            data: isRegistered,
          });
        }
        return next(errors.EmailAlreadyRegistered);
      }

      const user = await models.clients.create({
        name: name,
        email: email,
      });

      res.json({
        success: true,
        message: successMessages.USER_CREATED_SUCCESSFULLY,
        data: user,
      });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const clients = await models.clients.findOne({
        where: {
          id: req.params.userId,
        },
      });
      if (!clients) return next(errors.ClientNotFound);

      await clients.update({
        name: req.body.name || clients.name,
        email: req.body.email || clients.email,
      });

      res.json({
        success: true,
        message: successMessages.USER_UPDATED_SUCCESSFULLY,
        data: clients,
      });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const clients = await models.clients.findOne({
        where: {
          id: req.params.userId,
        },
      });

      if (!clients) return next(errors.ClientNotFound);

      clients.destroy();

      res.json({
        success: true,
        message: successMessages.USER_DELETED_SUCCESSFULLY,
      });
    } catch (err) {
      next(err);
    }
  },
};
