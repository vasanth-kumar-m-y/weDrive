/**
 * Created by vishu on 28/08/15.
 */

evezownApp.factory('ConstantsService', function(){
    var constants = { whatsAppDescription:'c' };

    ConstantsService = {};

    ConstantsService.getConstants = function(){
        return constants;
    };

    return ConstantsService.getConstants();
});