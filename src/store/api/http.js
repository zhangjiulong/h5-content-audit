import axios from 'axios'
import resource from '../../../static/config/resouse'
import $ from 'jquery'
function extend(p, c) {
  var c = c || {};
  for (var i in p) {
    if(typeof p[i] === 'object') {
      c[i] = (p[i].constructor === Array) ? [] : {};
      extend(p[i], c[i]);
    } else {
      c[i] = p[i];
    }
  }
  return c;
}
/*
 * @type : get/post ， 默认post,
 * @success : 请求成功callback
 * @error : 请求失败callback

 ajax请求使用 eq:
 var load = new api.urlApi.resource.getResourceDetail();
 load.param = {
 userName: 'normal',
 password:'b123456'
 }
 load.exec(function( success ){
 console.info("success:"+success.msg);
 },function( error ){
 console.info("error");
 })
 */
function Ajax() {}
Ajax.prototype.exec = function (success, error) {
   //util.loading();
   // if($("#loading").length == 0){
   //    var h = '<div id="loading"><div class="k_loading"><div class="loading_ico"></div>加载中...</div><div class="k_loading_bg fade in" style="z-index:10000"></div></div>';
   //    $("body").append(h);
   //  }
  var wait = this.wait || false; //是否是多个请求
  var type = (this.type || 'post').toLowerCase(); //get/post ， 默认post,
  var dataType = this.dataType || 'application/x-www-form-urlencoded';
  var url = this.url || '';
  var params = this.param || {};

  //for cas
  if ( type === 'post') {
    axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
  } else {
    axios.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
  }

  //params.token = sessionStorage.getItem('token');
  if( type === 'post' && this.dataType){
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  axios[ type ]( url , params )
    .then(function ( ret ) {
      if( ret.statusText === 'OK' || ret.status == 200 ){
        // vm.$store.state.stateObject.fullscreenLoading = false;

        //for cas
        if (ret.data.error === '00000100') {
          location.href = ret.data.redirectUrl;
          return;
        }

        success && success( ret.data );
      }

    }).catch(function ( ret ) {
    // vm.$store.state.stateObject.fullscreenLoading = false;
    error && error( ret.message );
  });
};
var Inherit = {};
Inherit.Class = function( obj ){
  obj.prototype = extend( obj.prototype , Ajax.prototype );
  return obj;
}

// function AjaxAll( ...params ){
// 	var aaa = params;
// 	axios.all([aaa])
// 	//axios.all([getUserAccount(), getUserPermissions()])
// 	  .then(axios.spread(function (account, permission) {
// 	  	callback && callback( account );
// 	    //all 会等到所有请求都完成,
// 	  }));
// }

// var baseUrl = "";
// if(process.env === 'dev'){
// 	baseUrl = url_dev;
// }else if(process.env === 'sat'){
// 	baseUrl = url_sat;
// }else if(process.env === 'prod'){
// 	baseUrl = url_prod;
// }

var baseUrl = window.baseUrl;
//所有请求路径参数配置入口
const urlApi = {
  baseUrl : baseUrl,
  contentaudit:{
    getDataForAudit:Inherit.Class(function(){
      this.url = urlApi.baseUrl + "getDataForAudit";
    }),
    updateDataForAudit:Inherit.Class(function(){
      this.url = urlApi.baseUrl + "updateDataForAudit";
    })
  }
}

export default {urlApi}
