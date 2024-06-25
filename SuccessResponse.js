class SuccessHandler {
    static sendResponse(res, data, message) {
      let responseData = {
        success: true,
        message: message,
      };
  
      if (data !== undefined) {
        responseData.data = data;
      }
  
      return res.status(200).json(responseData);
    }
  }

  module.exports = SuccessHandler;
  