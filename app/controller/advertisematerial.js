const Controller = require('egg').Controller;


class advertisematerialController extends Controller{
  async insert(){
      let advertises_id = this.ctx.request.body.advertises_id;
      let material_id = this.ctx.request.body.material_id;
      let sort = this.ctx.request.body.sort;
      if(!advertises_id || !material_id || !sort){
        this.ctx.body ={
          code:0,
          message:'缺少参数'
        }
      }
      try{
        await this.ctx.model.Advertisematerial.create({
          advertises_id,material_id,sort
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
  async single(){
    let id = this.ctx.params.id
    try{
      let advertiseData = await this.ctx.model.Advertise.findByPk(id).then( res=>{
         return  JSON.parse(JSON.stringify(res, null, 4))
      })
      let material = await this.ctx.model.Advertisematerial.findAll({
        where:{
          advertises_id: advertiseData.id
        },
          order: [['sort','ASC']]
      }).then( res=>{
        return  JSON.parse(JSON.stringify(res, null, 4))
      })
      await Promise.all( material.map(async data=>{
        data.name = await this.ctx.model.Material.findAll({
          where:{
            id: data.id
          }
        }).then( res=>{
          return  JSON.parse(JSON.stringify(res, null, 4))
        })
      })
      )
      
      

      this.ctx.body={
        code: 200,
        data:  material
      }
     }catch(e){
       console.log(e)
       this.ctx.body ={
         code: 0,
         message: '服务器错误'
       }
     }
  };
  //   try{
  //     let Data = await this.ctx.model.Advertisematerial.findAll().then(res => {
  //       return JSON.parse(JSON.stringify(res, null, 4))
  //     })
  //     this.ctx.body ={
  //       code: 200,
  //       data: Data
  //     }
  //   }catch(e){
  //     console.log(e)
  //     this.ctx.body ={
  //       code: 0,
  //       message: '服务器错误'
  //     }
  //   }
  // };
}
module.exports = advertisematerialController;




