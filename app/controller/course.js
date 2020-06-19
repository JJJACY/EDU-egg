const Controller = require('egg').Controller;

class CourseController extends Controller{
  async all(){
    try{
      let lesson = await this.ctx.model.Course.findAll().then(res => {
        return JSON.parse(JSON.stringify(res, null, 4))
      })
      this.ctx.body ={
        code: 200,
        data: lesson
      }
    }catch(e){
      console.log(e)
      this.ctx.body ={
        code: 0,
        message: '服务器错误'
      }
    }
  };
  async single(){
    let id = this.ctx.params.id;
    try{
      let data = await this.ctx.model.Course.findByPk(id).then( res=>{
        return JSON.parse(JSON.stringify(res, null, 4)) 
      })
      this.ctx.body={
        code: 200,
        data: data 
      }
    }catch(e){
      console.log(e)
      this.ctx.body ={
        code: 0,
        message: '服务器错误'
      }
    }
  };
  async insert(){
    // let id = this.ctx.request.body.id;
    let name = this.ctx.request.body.name;
    let short_name = this.ctx.request.body.short_name;
    let tips = this.ctx.request.body.tips;
    let description = this.ctx.request.body.description;
    let image_url = this.ctx.request.body.image_url;
    let created_at = this.ctx.request.body.created_at;
    if(!name || !short_name || !tips || !description || !image_url){
      this.ctx.body ={
        code:0,
        message:'缺少参数'
      }
    }
    try{
      await this.ctx.model.Course.create({
        name,short_name,tips,description,image_url,created_at,status:0
      })
      this.ctx.body ={
        code:200,
        message:'创建成功'
      }
    }catch(e){
      console.log(e)
      this.ctx.body ={
        code: 0,
        message: '服务器错误'
      }
    }
  };
  async update(){
    console.log(123)
  };
  async delete(){
    console.log(12313123123)
    let id = this.ctx.params.id
    console.log(id)
    try{
      await this.ctx.model.Course.destroy({ where:{id}}).then(res=>{
        console.log(res,123)
      })
      this.ctx.body ={
        code: 200,
        message: '删除成功!'
      }
    }catch(e){
      console.log(e)
      this.ctx.body ={
        code: 0,
        message: '服务器错误'
      }
    }
  };
  async index(){
    let id = this.ctx.params.id;
    try{
      let Course= await this.ctx.model.Course.findByPk(id).then(res=>{
        return JSON.parse(JSON.stringify(res,null,4))
      })
      if(!Course){
        this.ctx.body={
          code:0,
          message:'请先添加课程！'
        }
      }
      let chapterAll = await this.ctx.model.Chapter.findAll({
        where:{course_id:Course.id},
        order: [['sort','ASC']]
      }).then(res=>{
        return JSON.parse(JSON.stringify(res,null,4))
      })
      await Promise.all(chapterAll.map(async data=>{
        data.sectionAll = await this.ctx.model.Section.findAll({
          where:{chapter_id: data.id},
          order: [['sort','ASC']]
        }).then(res=>{
          return JSON.parse(JSON.stringify(res,null,4))
        })
      }) )
      this.ctx.body={
        code: 200,
        data: chapterAll
      }
    }catch(e){
      console.log(e)
      this.ctx.body ={
        code: 0,
        message: '服务器错误'
      }
    }
  };
  async newclass(){
    try{
      let course = await this.ctx.model.Course.findAll({ order: [['created_at', 'DESC']] }).
      then( res=>{
        return JSON.parse(JSON.stringify(res, null, 4)) 
      })
      // console.log(course)
      let newclass = course.splice(0,4)
      this.ctx.body ={
        code:200,
        data: newclass
      }
    }catch(e){
      this.ctx.body={
        code:0,
        message:'服务器错误'
      }
    }
  };
  // async sort(){
  //   console.log(123)
  //   let params = this.ctx.request.body.params;
  //   console.log(params)
  //   try{
  //     await Promise.all(params.map(async (data,index)=>{
  //       console.log(data)
  //       await this.ctx.model.Chapter.update(
  //         {sort: index},
  //         { where:{id: data.id} });
  //       await Promise.all(data.sectionAll.map( async( arr,idx)=>{
  //         // console.log(arr)
  //         await this.ctx.model.Section.update(
  //           {sort: idx,chapter_id:data.id},
  //           { where:
  //             {
  //               id: arr.id
  //             } 
  //           }
  //         )
  //       }))
        
  //     }))
  //     this.ctx.body={
  //       code: 200,
  //       message:'成功了'
  //     }
  //   }catch(e){
  //     console.log(1123,e)
  //     this.ctx.body={
  //       code:0,
  //       message:'服务器错误'
  //     }
  //   }
  // }
}
module.exports = CourseController