;(function($) {
    "use strict";

    $.fn.youtubeSearch = function(){

       return this.each(function() {
          var items_per_page = 10,
          yt_url = 'http://gdata.youtube.com/feeds/api/videos',
          maxResults = 50,
          videoData = [],
          ytTemplate = $("#videoTemplate").html();
          initYtSearch();
          getRefineSearchCategory();
          $("#pageView").change(function(){
                reloadYtView();
          });

          function initYtSearch(){
            var keyword = encodeURIComponent($("#searchText").val());
            if(keyword ===""){
                return;
            }
            var YouTubeURL = yt_url + '?q='+keyword+ getOrderKey();
            YouTubeURL = YouTubeURL + '&max-results='+ maxResults+'&format=5&v=2&alt=jsonc';

            if($("#refineSearchKeys").text() !== ""){
                YouTubeURL = YouTubeURL + "&category="+ $("#refineSearchKeys").text().replace('"',"");
            }
            var jsonResponse = getYtJsonData(YouTubeURL, "json");
            if(jsonResponse !== undefined &&  jsonResponse != null ){
                videoData = prepareYtDataArray(jsonResponse.items);
                /** init pagination of you tube videos on
                 * the page after formating data
                 */
                initPagination(videoData.length);
            }
        }

           /**
            *
            * @param list
            * @return {Array}
            */
        function prepareYtDataArray(list){
            var data = [];
            list.map(function(item, index){
                   var duration = item.duration;
                   var time = Math.floor(duration/60) +":"+(duration%60 < 10 ? 0+""+duration%60 : duration%60);
                   data[index] = {
                       'title': item.title.substring(0, 45)+'..',
                       'id' : item.id, 'thumbnail' : item.thumbnail.hqDefault,
                       'duration': time
                   };
             });
            return data;
        }

        /**
         *
         * @param yt_url
         * @param dataType
        */
        function getYtJsonData(yt_url, dataType){
            var data = null;
            $.ajax({
                type: "GET",
                async : false, // should be required to return data
                url: yt_url,
                dataType: dataType,
                success: function(response){
                    if(response.data.totalItems !== 0){
                        data = response.data;
                    }
                },
                error : function(jqXHR, textStatus, e) {
                    return;
                }
            });
            return data;
        }

         /**
          *
          * @param length
         */
        function initPagination(length){
            $("#noOfPages").text(length);
            $("#mnoOfPages").text(length);
            var pageViewCounter = getPageView();
            items_per_page = pageViewCounter === 'Show All' ? length : pageViewCounter;
            ytPagination(length);
        }

        /**
         *  This method is to invoke
         *  pagination plugin.
         * @param size
        */
        function ytPagination(size){
            var optInit = {
                items_per_page: items_per_page,
                num_display_entries : items_per_page,
                prev_text: $("#previous").val(),
                next_text: $("#next").val(),
                callback: pageSelectCallback
            };
            $("#Pagination").pagination(size, optInit);
        }

        /**
          *
          * @param content
         */
        function ytRenderContent (content) {
            $('#searchResult').html(content);
        }
        function getPageView(){
            return $("#pageView").val()=== 'Show All' ? maxResults : $("#pageView").val();
        }

        function reloadYtView(){
            if(videoData.length !== 0){
                items_per_page = getPageView();
                ytPagination(videoData.length);
            }
        }

           /**
            *
            * @param dataJson
            * @return {null}
            */
        function ytLoadTemplate (dataJson){
            try{
                var content = null;
                dust.loadSource(dust.compile(ytTemplate,'profileInfo'));
                dust.render('profileInfo', dataJson, function(err, out) {
                    content = out;
                });
                return content;
            }catch(ex){}
        }

        function  pageSelectCallback(page_index, jq){
            var ytContent = '';
            var max_elem = Math.min((page_index+1) * items_per_page, videoData.length);
            // Iterate through a selection of the content and build an HTML string
            pagingCount(page_index, max_elem);
            for(var i = page_index*items_per_page; i < max_elem; i++){
                ytContent =  ytContent + ytLoadTemplate(videoData[i]);
            }
            ytRenderContent(ytContent);
            return false;
        }
        function pagingCount(page_index, max_elem){
            var resultCountMsg = page_index == 0 ? page_index+1 +" - "+max_elem : items_per_page*page_index + 1 +" - "+ max_elem;
            $("#count").text(resultCountMsg);
            $("#mcount").text(resultCountMsg);
        }
        function getOrderKey(){
                switch($("#sorting").val().replace(new RegExp(' ', 'g'),"").toLowerCase()){
                    case "latestupdates":
                        return "&orderby=relevance";
                    case "mostviewed":
                        return "&orderby=viewCount";
                    case "newesttooldest":
                        return "&orderby=published";
                }
        }
    });
  }
})(jQuery);
function setRefineSearchKeys(labelText){
    $("#refineSearchKeys").text(labelText);
    $("#mrefineSearchKeys").text(labelText);
}
function resetRefineSearchKeys(){
    setRefineSearchKeys("");
}
function getRefineSearchCategory(){
    var keys = '';
    $('.refineSearch input[type=checkbox]').each(function(){
        if (!$(this).is(':checked')) {
            var labelText =  $(this).next("label").text();
            keys = keys + ($('input:checkbox').index($(this)) === 0 ? labelText:", "+labelText);
        }
    });
    if(keys!=='') setRefineSearchKeys('"'+keys+'"');
}
function ytLoadVideo(id){
    $("#ytIFrame").attr("src", "http://www.YouTube.com/embed/"+id.trim());
}

