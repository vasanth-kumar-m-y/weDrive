/**
 * Created by vishu on 10/09/15.
 */
evezownApp.factory('ImageUploadService', ['$http', '$q', 'PATHS' ,function ($http, $q, PATHS){

    ImageUploadService = {};


    ImageUploadService.cropImage = function ($image, $coords) {
        var deferred = $q.defer();

        var base64Image = getBase64Image($image);

        console.log($coords);

        var requestData = { image : base64Image, width: $coords.w, height: $coords.h, x: $coords.x, y: $coords.y};

        $http.post(PATHS.api_url +  'image/crop', requestData)
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                console.log('Error on saving');
                deferred.reject(err);
            });
        return deferred.promise;
    }

    function getBase64Image(dataURL) {
        // imgElem must be on the same server otherwise a cross-origin error will be
        //  thrown "SECURITY_ERR: DOM Exception 18"
        return dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
    }

    return ImageUploadService;

}]);