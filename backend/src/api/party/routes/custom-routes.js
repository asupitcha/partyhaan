"use strict";

module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/parties/:id/join",
      handler: "party.join",
    },
    {
      method: "GET",
      path: "/my_parties",
      handler: "party.my_parties",
    }
  ]
}