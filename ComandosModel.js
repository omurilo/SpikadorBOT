class ComandosModel {
  client = null;
  constructor(_client) {
    this.client = _client;
  }

  static titles = {
    moderator: "mod",
    subscriber: "sub",
    vip: "vip",
    broadcaster: "streamer",
  };

  podeExecutar(user, titulos) {
    let userTitles = [];
    if (user.badges?.moderator) {
      userTitles.push(ComandosModel.titles.moderator);
    }
    if (user.badges?.broadcaster) {
      userTitles.push(ComandosModel.titles.broadcaster);
    }
    if (user.badges?.subscriber) {
      userTitles.push(ComandosModel.titles.subscriber);
    }
    if (user.badges?.vip) {
      userTitles.push(ComandosModel.titles.vip);
    }

    let interseccao = userTitles.some((element) => titulos.includes(element));
    return interseccao;
  }
}
module.exports = ComandosModel;
