'use strict';

/**
 *  party controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { parseMultipartData } = require('strapi-utils');

const model = 'api::party.party';
const populate = {
  'image': true
}

module.exports = createCoreController(model, ({ strapi }) => ({
  async join(ctx) {
    const { id } = ctx.params;

    const party = await strapi.query(model).findOne({
      where: { 'id': id },
    });

    if (++party.total_member > party.max_member) {
      return ctx.badRequest(`You can't join this party because it has reached its maximum number of members`);
    }

    const data = {
      "data": {
        "total_member": party.total_member
      }
    }

    const response = await strapi.service(model).update(id, data);
    return response;
  },

  async my_parties(ctx) {
    const parties = await strapi.query(model).findMany({
      where: { 'created_id': ctx.state.user.id },
      populate: populate
    });
    return parties;
  },

  async find(ctx) {
    const parties = await strapi.query(model).findMany({
      where: {
        created_id: {
          $not: ctx.state.user.id
        }
      },
      populate: populate
    });
    return parties;
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const party = await strapi.service(model).findOne(id, {
      populate: populate
    });
    return party;
  },

  async create(ctx) {
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      data.created_id = ctx.state.user.id;
      const party = await strapi.service(model).create(data, { files });
      return party;
    }
    ctx.request.body.data.created_id = ctx.state.user.id;
    const party = await strapi.service(model).create(ctx.request.body);
    return party;
  },

  async update(ctx) {
    const { id } = ctx.params;

    const party = await strapi.query(model).findOne({
      where: { 'created_id': ctx.state.user.id }
    });

    if (!party) {
      return ctx.unauthorized(`You don't have permission to edit this party.`);
    }

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      const response = await strapi.service(model).update(id, data, { files });
      return response;
    }
    const response = await strapi.service(model).update(id, ctx.request.body);
    return response;
  },

  async delete(ctx) {
    const party = await strapi.query(model).findOne({
      where: { 'created_id': ctx.state.user.id }
    });

    if (!party) {
      return ctx.unauthorized(`You don't have permission to delete this party.`);
    }

    const response = await super.delete(ctx);
    return response;
  }
}));
