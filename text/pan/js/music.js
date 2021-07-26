/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search        五月天  温柔386538
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果
  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/
var app = new Vue({
    el: "#player",
    data:{
        query: "",              // 查询关键字
        musicList:[],           //查询结果数组// 歌曲数组       
        musicUrl:"",            // 歌曲地址
        musicCover: "",         // 歌曲封面
        hotComments: [],        // 歌曲评论
        isPlaying: false,       // 动画播放状态
        mvUrl:"",               // mv地址
        isShow: false,          // 遮罩层的显示状态
    },
    methods :{ 
        // 获取搜索歌单
        searchMusic : function(){
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.query)
               .then(function(response){
                   //console.log(response);
                   that.musicList = response.data.result.songs;
                   //console.log(response.data.result.songs);
                   //console.log(that.musicList);
                },function(err){})
        },

        //    获取歌曲地址 
        playMusic : function(musicId){
            //console.log(musicId);
            var that = this;
            axios.get("https://autumnfish.cn/song/url?id="+ musicId )
                .then(function(response){
                   that.musicUrl = response.data.data[0].url;
                //console.log(response.data.data[0].url);
            },function(err){})
        //获取歌曲详情
            axios.get("https://autumnfish.cn/song/detail?ids="+ musicId )
                .then(function(response){
                    that.musicCover = response.data.songs[0].al.picUrl;
                //console.log(response.data.songs[0].al.picUrl);
            },function(err){})
        //获取热门评论
        axios.get("https://autumnfish.cn/comment/hot?type=0&id="+ musicId)
                .then(function(response){
                    that.hotComments = response.data.hotComments;
                //console.log(response.data.hotComments);
                },function(err){})

        },

        //监听开始播放 
        play : function(){
            this.isPlaying = true;
            //console.log("play");
        },
        pause : function(){
            this.isPlaying = false;
            //console.log("pause");
        },

        // 获取MV地址
        playMv : function(videoId){
            console.log(videoId);
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id="+ videoId )
                .then(function(response){
                    that.isShow = true;
                    that.mvUrl = response.data.data.url;
                    //console.log(response.data.data.url);
            },function(err){})
        },

        // 关闭遮罩层
        hide : function(){
            this.isShow = false;
            this.mvUrl = "";
        }

    }
})

