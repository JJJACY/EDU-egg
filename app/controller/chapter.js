'use strict';

const Controller = require('egg').Controller;

class ChapterController extends Controller {
  async insert() {
    let course_id = this.ctx.request.body.course_id;
    
  }
}

module.exports = ChapterController;